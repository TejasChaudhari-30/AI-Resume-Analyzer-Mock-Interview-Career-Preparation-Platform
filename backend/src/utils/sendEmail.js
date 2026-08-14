import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendEmail = async (to, subject, html) => {

    try {

        const info = await transporter.sendMail({
            from: `"AI Resume Analyzer" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("EMAIL SENT:", info.messageId);
        console.log("EMAIL RESPONSE:", info.response);

        return info;

    } catch (error) {

        console.error("EMAIL ERROR:", error);

        throw error;

    }
};