import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "../config/redis.js";

/*
    Redis-backed Rate Limiters

    Authenticated endpoints:
    userId is used as the key.

    Unauthenticated endpoints:
    IP address is used as the key.
*/


// ===============================
// Resume Upload
// 10 requests / hour / user
// ===============================

const resumeUploadLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:resume-upload",
    points: 5,
    duration: 60 * 60
});


// ===============================
// Resume AI Review
// 5 requests / hour / user
// ===============================

const resumeReviewLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:resume-review",
    points: 5,
    duration: 60 * 60
});


// ===============================
// Interview Generation
// 5 requests / hour / user
// ===============================

const interviewGenerateLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:interview-generate",
    points: 5,
    duration: 60 * 60
});


// ===============================
// Login
// 5 attempts / 15 minutes / IP
// ===============================

const loginLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:login",
    points: 5,
    duration: 15 * 60
});


// ===============================
// Register
// 5 requests / hour / IP
// ===============================

const registerLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rl:register",
    points: 5,
    duration: 60 * 60
});


// =====================================
// Generic middleware for authenticated
// endpoints
// =====================================

const createUserRateLimiter = (limiter) => {

    return async (req, res, next) => {

        try {

            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({
                    message: "Authentication required"
                });
            }

            await limiter.consume(String(userId));

            next();

        } catch (error) {

            if (error?.msBeforeNext) {

                const retryAfter = Math.ceil(
                    error.msBeforeNext / 1000
                );

                res.set(
                    "Retry-After",
                    String(retryAfter)
                );

                return res.status(429).json({
                    message: "Too many requests. Please try again later.",
                    retryAfter
                });
            }

            console.error(
                "Rate limiter error:",
                error
            );

            return res.status(500).json({
                message: "Rate limiter error"
            });
        }
    };
};


// =====================================
// Generic middleware for IP-based
// endpoints
// =====================================

const createIPRateLimiter = (limiter) => {

    return async (req, res, next) => {

        try {

            const ip = req.ip;

            await limiter.consume(ip);

            next();

        } catch (error) {

            if (error?.msBeforeNext) {

                const retryAfter = Math.ceil(
                    error.msBeforeNext / 1000
                );

                res.set(
                    "Retry-After",
                    String(retryAfter)
                );

                return res.status(429).json({
                    message: "Too many requests. Please try again later.",
                    retryAfter
                });
            }

            console.error(
                "Rate limiter error:",
                error
            );

            return res.status(500).json({
                message: "Rate limiter error"
            });
        }
    };
};


// Export middleware
export const limitResumeUpload =
    createUserRateLimiter(resumeUploadLimiter);

export const limitResumeReview =
    createUserRateLimiter(resumeReviewLimiter);

export const limitInterviewGenerate =
    createUserRateLimiter(interviewGenerateLimiter);

export const limitLogin =
    createIPRateLimiter(loginLimiter);

export const limitRegister =
    createIPRateLimiter(registerLimiter);