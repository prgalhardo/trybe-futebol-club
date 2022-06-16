import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs';

class Token {
  private static secret: string = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  static create(info: object) {
    return Jwt.sign(info, this.secret, { expiresIn: '7d' });
  }

  static decode(token: string) {
    return Jwt.verify(token, this.secret);
  }
}

export default Token;
