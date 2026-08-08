import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log(
    "Bull Redis URL:",
    process.env.REDIS_URL?.replace(/:[^:@]+@/, ":****@")
);

const bullRedis = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});

bullRedis.on("connect", () => {
    console.log("✅ BullMQ Redis Connected");
});

bullRedis.on("ready", () => {
    console.log("🚀 BullMQ Redis Ready");
});

bullRedis.on("error", (err) => {
    console.error("BullMQ Redis Error:", err);
});

export default bullRedis;