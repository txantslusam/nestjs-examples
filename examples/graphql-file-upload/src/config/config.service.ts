import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
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
}
