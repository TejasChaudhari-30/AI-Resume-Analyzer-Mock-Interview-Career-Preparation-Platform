import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(
    process.env.RESEND_API_KEY
);


export const sendEmail = async (
    to,
    subject,
    html
) => {

    try {

        const { data, error } =
            await resend.emails.send({

                from:
                    "AI Resume Analyzer <onboarding@resend.dev>",

                to: [to],

                subject: subject,

                html: html
            });


        if (error) {

            console.error(
                "RESEND EMAIL ERROR:",
                error
            );

            throw new Error(
                error.message ||
                "Failed to send email"
            );
        }


        console.log(
            "EMAIL SENT:",
            data
        );


        return data;

    }
    catch (error) {

        console.error(
            "EMAIL ERROR:",
            error
        );

        throw error;

    }

};