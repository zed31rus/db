import crypto from 'crypto';

class RefreshToken {
    static create() {
        return crypto.randomBytes(64).toString("hex");
    }

    static getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        return { time, atTime }
    }
    
    private static getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private static getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}

const refreshToken = RefreshToken;

export default refreshToken;