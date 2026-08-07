import { Queue } from "bullmq";
import bullRedis from "../config/bullRedis.js";
export const reviewQueue = new Queue(
    "generate-review",
    {
        connection: bullRedis
    }
);