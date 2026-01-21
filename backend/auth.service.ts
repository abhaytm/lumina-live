
// AUTH SERVICE CODE

import { comparePassword } from './password.utils';
import { AuthResponse } from './dto';

export class AuthService {
  // Common JWT sign logic
  private generateJwt(payload: { sub: string, role: string }) {
    // In real implementation: return jwt.sign(payload, SECRET, { expiresIn: '7d' })
    return `token_${payload.role}_${payload.sub}_${Date.now()}`;
  }

  async loginUser(identifier: string, pass: string): Promise<AuthResponse> {
    // 1. Find user by email or phone
    const user = { id: 'u1', password_hash: '...', status: 'ACTIVE' }; // Mock DB lookup
    
    // 2. Validate credentials
    const valid = await comparePassword(pass, user.password_hash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');
    
    // 3. Check status
    if (user.status === 'BLOCKED') throw new Error('ACCOUNT_BLOCKED');

    return {
      user: { id: user.id, name: 'Alex', role: 'USER', avatar: '...' },
      tokens: { access: this.generateJwt({ sub: user.id, role: 'USER' }), refresh: '...' }
    };
  }

  async loginCreator(identifier: string, pass: string): Promise<AuthResponse> {
    const creator = { id: 'c1', password_hash: '...', status: 'APPROVED' }; // Mock DB lookup
    
    const valid = await comparePassword(pass, creator.password_hash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');
    
    // Ensure creator is approved
    if (creator.status !== 'APPROVED') throw new Error('CREATOR_NOT_APPROVED');

    return {
      user: { id: creator.id, name: 'Brand', role: 'CREATOR', avatar: '...' },
      tokens: { access: this.generateJwt({ sub: creator.id, role: 'CREATOR' }), refresh: '...' }
    };
  }

  async loginAdmin(email: string, pass: string): Promise<AuthResponse> {
    const admin = { id: 'a1', password_hash: '...', role: 'ADMIN' }; // Mock DB lookup
    
    const valid = await comparePassword(pass, admin.password_hash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');

    return {
      user: { id: admin.id, name: 'Admin', role: 'ADMIN', avatar: '...' },
      tokens: { access: this.generateJwt({ sub: admin.id, role: 'ADMIN' }), refresh: '...' }
    };
  }
}
