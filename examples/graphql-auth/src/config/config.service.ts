import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService implements JwtOptionsFactory {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(`.env`));
  }

  get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  get isStaging() {
    return process.env.NODE_ENV === 'staging';
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getString(key: string): string {
    return this.envConfig[key];
  }

  getBoolean(key: string): boolean {
    return Boolean(this.envConfig[key]);
  }

  getNumber(key: string): number {
    return Number(this.envConfig[key]);
  }

  getFile(path: string): Buffer {
    return fs.readFileSync(path);
  }

  createJwtOptions(): JwtModuleOptions {
    const privateKey = this.getFile(this.getString('PRIVATE_JWT_PATH'));
    const publicKey = this.getFile(this.getString('PUBLIC_JWT_PATH'));

    return {
      privateKey,
      publicKey,
      signOptions: {
        expiresIn: '15 days',
      },
    };
  }
}
