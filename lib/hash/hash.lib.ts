import bcrypt from 'bcrypt';
import crypto from 'crypto';

const Hash = {
    bcrypt: {
        async create(password: string, saltRounds: number) {
            return await bcrypt.hash(password, saltRounds);
        },
        async compare(password: string, hash: string) {
            return await bcrypt.compare(password, hash)
        }
    },
    sha256: {
        async create(password: string) {
            return crypto.createHash('sha256').update(password).digest('hex');
        }
    }
}

export default Hash