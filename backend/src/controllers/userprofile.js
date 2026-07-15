import express from "express";
import db from "../config/db.js";

export const getUserProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const response = await db.query(
            `
            SELECT
                id,
                name,
                email,
                target_role,
                skills,
                created_at
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            profile: response.rows[0]
        });

    } catch (error) {

        console.error("Error fetching profile:", error);

        return res.status(500).json({
            message: "Failed to fetch profile"
        });

    }
};

export const updateUserProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const {
            name,
            target_role,
            skills
        } = req.body;

        const response = await db.query(
            `
            UPDATE users
            SET
                name = $1,
                target_role = $2,
                skills = $3
            WHERE id = $4
            RETURNING
                id,
                name,
                email,
                target_role,
                skills
            `,
            [
                name,
                target_role,
                skills,
                userId
            ]
        );

        return res.status(200).json({
            message: "Profile updated successfully",
            profile: response.rows[0]
        });

    } catch (error) {

        console.error("Error updating profile:", error);

        return res.status(500).json({
            message: "Failed to update profile"
        });

    }
};