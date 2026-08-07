import {Queue} from "bullmq";
import bullRedis from "../config/bullRedis.js";

export const resumeQueue=new Queue("resume-review",{
    connection:bullRedis
});