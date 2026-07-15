import { Pool } from "pg";
import dotenv from "dotenv"


dotenv.config();
const db = new Pool({
       connectionString:process.env.DataBase_URL,
    //   ssl:{
    //     rejectUnauthorized:false,
    //   },

  user:"postgres",
  host:"localhost",
  database:"Full Stack Major Project",
  password:process.env.data_pass,
  port:5432
});

export default db;
