export const cleanupRefreshTokens = async () => {
    try {
        const result = await db.query(`
            DELETE FROM refresh_tokens
            WHERE
                (
                    revoked_at IS NOT NULL
                    AND revoked_at < NOW() - INTERVAL '7 days'
                )
                OR
                expires_at < NOW()
        `);

        console.log(
            `🧹 Deleted ${result.rowCount} old refresh tokens`
        );

    } catch (error) {
        console.error(
            "Refresh token cleanup failed:",
            error
        );
    }
};