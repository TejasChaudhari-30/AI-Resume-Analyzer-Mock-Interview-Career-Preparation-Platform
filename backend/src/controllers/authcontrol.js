import express from "express";
import db from "../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
dotenv.config();

export const register = async (req, res) => {
    try {

        const { name, email, password, target_role, skills } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        await db.query("insert into users (name,email,password_hash,target_role,skills) values ($1,$2,$3,$4,$5)",
            [name, email, password_hash, target_role, skills]
        );
        res.status(201).json({ message: "registered" });
        console.log("user registered");





    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "something went wrong pls ensure that email id is unique" })
    };

}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            process.env.JWT_secret,
            { expiresIn: "15m" }
        );
        //generate refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const refreshtoken_hash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        await db.query(
            `
            INSERT INTO refresh_tokens
            (
                user_id,token_hash,  expires_at
            )
            VALUES (
                $1,
                $2,
                NOW() + INTERVAL '7 days'
            )
            `,
            [
                user.id,
                refreshtoken_hash
            ]
        );

        //store  refresh token  in cookies 
         res.cookie(
            "refreshToken",
            refreshToken,   
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        // console.log(token);
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                target_role: user.target_role,
                skills: user.skills
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required"
            });
        }
        const result = await db.query("select password_hash from users where id =$1", [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const hashedPassword = result.rows[0].password_hash;
        const isMatch = await bcrypt.compare(
            currentPassword,
            hashedPassword
        );
        if (!isMatch) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }
        const samePassword = await bcrypt.compare(
            newPassword,
            hashedPassword
        );
        if (samePassword) {
            return res.status(400).json({
                message: "New password must be different"
            });
        }
        const newHashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // 5. Update password
        await db.query(
            "UPDATE users SET password_hash = $1 WHERE id = $2",
            [newHashedPassword, userId]
        );

        return res.status(200).json({
            message: "Password changed successfully"
        });

    }
    catch (error) {
        console.error("Change password error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Find user
        const result = await db.query(
            "SELECT id, email FROM users WHERE email = $1",
            [email]
        );

        // Don't reveal whether the email exists
        if (result.rows.length === 0) {
            return res.status(200).json({
                message:
                    "If an account with this email exists, a reset link has been sent."
            });
        }

        const user = result.rows[0];

        // Generate secure random token
        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Hash token before storing in DB
        const tokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Token expires in 15 minutes
        const expiresAt = new Date(
            Date.now() + 15 * 60 * 1000
        );

        // Delete previous reset tokens
        await db.query(
            `
            DELETE FROM password_reset_tokens
            WHERE user_id = $1
            `,
            [user.id]
        );

        // Store hashed token
        await db.query(
            `
            INSERT INTO password_reset_tokens
             (user_id, token_hash, expires_at)
            VALUES ($1, $2, $3)
            `,
            [user.id, tokenHash, expiresAt]
        );

        // Reset link
        const resetLink =
            `https://ai-resume-analyzer-mock-interview-c-ten.vercel.app/reset-password?token=${resetToken}`;

        // Send email
        await sendEmail(
            user.email,
            "Reset Your Password",
            `
                <h2>Password Reset</h2>

                <p>
                    You requested to reset your password.
                </p>
                <p>
                    Click the link below to reset your password:
                </p>
                <a href="${resetLink}">
                    Reset Password
                </a>
                <p>
                    This link will expire in 15 minutes.
                </p>
                <p>
                    If you did not request this, you can safely
                    ignore this email.
                </p>
            `
        );

        return res.status(200).json({
            message:
                "If an account with this email exists, a reset link has been sent."
        });

    } catch (error) {

        console.error(
            "Forgot password error:",
            error
        );

        return res.status(500).json({
            message:
                "Something went wrong. Please try again."
        });
    }
};
export const resetPassword = async (req, res) => {
    try {

        const { token, newPassword } = req.body;

        // 1. Validate input
        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required"
            });
        }


        // 2. Validate password length
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }


        // 3. Hash the token
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");


        // 4. Find valid, non-expired token
        const result = await db.query(
            `
            SELECT id, user_id
            FROM password_reset_tokens
            WHERE token_hash = $1
            AND expires_at > NOW()
            `,
            [tokenHash]
        );


        // 5. Invalid or expired token
        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset link"
            });
        }


        const resetToken = result.rows[0];


        // 6. Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );


        // 7. Update user's password
        await db.query(
            `
            UPDATE users
            SET password_hash = $1
            WHERE id = $2
            `,
            [
                hashedPassword,
                resetToken.user_id
            ]
        );


        // 8. Delete reset token
        // Makes the reset link one-time use
        await db.query(
            `
            DELETE FROM password_reset_tokens
            WHERE id = $1
            `,
            [resetToken.id]
        );


        return res.status(200).json({
            message: "Password reset successfully"
        });


    } catch (error) {

        console.error(
            "Reset password error:",
            error
        );

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });

    }
};

export const refreshAccessToken = async (req, res) => {

    try {

        const oldRefreshToken =
            req.cookies.refreshToken;
console.log(
    "Refresh token exists:",
    !!oldRefreshToken
);

        if (!oldRefreshToken) {

            return res.status(401).json({
                message: "Refresh token missing"
            });

        }


        // ==================================
        // Hash received refresh token
        // ==================================

        const oldHash =
            crypto
        .createHash("sha256")
        .update(oldRefreshToken)
        .digest("hex");;


        // ==================================
        // Find token
        // ==================================

        const result = await db.query(
            `
            SELECT
                rt.id,
                rt.user_id,
                rt.expires_at,
                rt.revoked_at,
                u.email,
                u.name

            FROM refresh_tokens rt

            JOIN users u
                ON u.id = rt.user_id

            WHERE rt.token_hash = $1
            `,
            [oldHash]
        );


        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "Invalid refresh token"
            });

        }


        const storedToken = result.rows[0];


        // ==================================
        // Check revoked
        // ==================================

        if (storedToken.revoked_at) {

            return res.status(401).json({
                message: "Refresh token revoked"
            });

        }


        // ==================================
        // Check expiration
        // ==================================

        if (
            new Date(storedToken.expires_at) <
            new Date()
        ) {

            return res.status(401).json({
                message: "Refresh token expired"
            });

        }


        // ==================================
        // Revoke old refresh token
        // ==================================

        await db.query(
            `
            UPDATE refresh_tokens
            SET revoked_at = NOW()
            WHERE id = $1
            `,
            [storedToken.id]
        );


        // ==================================
        // Generate new access token
        // ==================================

        const user = {
            id: storedToken.user_id,
            email: storedToken.email,
            name:storedToken.name  
        };


        const accessToken = jwt.sign(
        {
            id: user.id,
            name:user.name

        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );



        // ==================================
        // Generate new refresh token
        // ==================================

        const newRefreshToken =crypto.randomBytes(64).toString("hex")
            

        const newHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");


        // ==================================
        // Store new refresh token
        // ==================================

        await db.query(
            `
            INSERT INTO refresh_tokens
            (
                user_id,
                token_hash,
                expires_at
            )
            VALUES (
                $1,
                $2,
                NOW() + INTERVAL '7 days'
            )
            `,
            [
                user.id,
                newHash
            ]
        );


        // ==================================
        // Send new cookie
        // ==================================

        res.cookie(
            "refreshToken",
            newRefreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );


        return res.status(200).json({

            accessToken,
            user: {
        id: user.id,
        email: user.email,
        name: user.name
    }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to refresh token"
        });

    }

};

export const logout = async (req, res) => {

    try {

        const refreshToken =
            req.cookies.refreshToken;


        if (refreshToken) {

            const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

               


            await db.query(
                `
                UPDATE refresh_tokens
                SET revoked_at = NOW()
                WHERE token_hash = $1
                `,
                [tokenHash]
            );

        }


        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            }
        );


        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Logout failed"
        });

    }

};