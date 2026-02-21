import crypto from 'crypto';

class RefreshToken {
    static create() {
        return crypto.randomBytes(64).toString("hex");
    }
    
    static getExpiresAtTime(expiresTime: number = this.getExpiresTime()) {
        return new Date(Date.now() + expiresTime)
    }

    static getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}

const refreshToken = RefreshToken;

export default refreshToken;