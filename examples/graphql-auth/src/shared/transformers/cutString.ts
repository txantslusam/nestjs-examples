import {ValueTransformer} from 'typeorm';

export default class CutString implements ValueTransformer {
  constructor(
    private readonly length: number,
  ) {}

  to(value: string): string {
    if (value && value.substr) {
      return value.substr(0, this.length);
    }

    return value;
  }

  from(value: any): any {
    return value;
  }
}
