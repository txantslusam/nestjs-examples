import { UUIDScalar } from './scalars/UUID.scalar';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    UUIDScalar,
  ],
})
export class SharedModule {}
