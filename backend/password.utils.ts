
// PASSWORD UTILITY CODE

import * as bcrypt from 'https://esm.sh/bcryptjs';

const SALT_ROUNDS = 12;

// Hash plain password
export async function hashPassword(password: string): Promise<string> {
    if (password.length < 8) throw new Error('Password too short');
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compare plain password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
