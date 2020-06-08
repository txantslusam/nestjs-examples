import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.getString('DATABASE_HOST'),
        port: configService.getNumber('DATABASE_PORT'),
        username: configService.getString('DATABASE_USERNAME'),
        password: configService.getString('DATABASE_PASSWORD'),
        database: configService.getString('DATABASE_DATABASE'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/**/*.view{.ts,.js}',
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    SharedModule,
    UserModule,
  ],
})
export class AppModule {}
