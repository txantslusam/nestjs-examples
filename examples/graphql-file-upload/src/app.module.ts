import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModule } from './shared/shared.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      uploads: {
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 1,
      },
    }),
    SharedModule,
    ImagesModule,
  ],
})
export class AppModule {}
