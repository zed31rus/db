import bcrypt from 'bcrypt';
import crypto from 'crypto';
import BaseLib from '#core/base/lib.base.js';

class Hash extends BaseLib {

    public bcrypt = {
        async create(password: string, saltRounds: number) {
            return await bcrypt.hash(password, saltRounds);
        },
        async compare(password: string, hash: string) {
            return await bcrypt.compare(password, hash)
        }
    }
    public sha256 = {
        async create(password: string) {
            return crypto.createHash('sha256').update(password).digest('hex');
        }
    }
}

export default Hash