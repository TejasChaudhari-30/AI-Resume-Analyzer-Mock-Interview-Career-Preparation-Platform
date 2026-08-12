import express from "express";
import db from "../config/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const register = async (req, res) => {
    try {

        const {name,email,password,target_role,skills}=req.body;
         const password_hash = await bcrypt.hash(password, 10);
          await db.query("insert into users (name,email,password_hash,target_role,skills) values ($1,$2,$3,$4,$5)",
            [name, email, password_hash,target_role,skills]
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

    const token = jwt.sign(
      { id: user.id ,
        name:user.name
      },
      process.env.JWT_secret,
      { expiresIn: "7d" }
    );

    // console.log(token);
    res.status(200).json({
      message: "Login successful",
      token,
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

export const changePassword =async (req,res)=>{
try{
  const userId=req.user.id;
  const {currentPassword,newPassword}=req.body;
   if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required"
            });
        }
      const result= await db.query("select password_hash from users where id =$1", [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const hashedPassword=result.rows[0].password_hash;
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