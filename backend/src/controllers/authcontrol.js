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