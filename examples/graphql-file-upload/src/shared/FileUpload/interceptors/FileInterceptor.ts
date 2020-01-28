import { NestInterceptor, Optional, ExecutionContext, mixin, CallHandler, Inject } from '@nestjs/common';
import uuid = require('uuid/v4');
import { get, set } from 'lodash';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { S3FileUploadService } from '../services/S3FileUpload.service';
import {LocalFileUploadService} from "../services/LocalFileUpload.service";

export enum FileSaveDestination {
  LOCAL,
  S3,
}

export interface GraphqlFileFieldInterceptorOptions {
  uploadField: string;
  destination: FileSaveDestination;
}

export function GraphqlFileFieldInterceptor(
  uploadField: string,
  localOptions?: GraphqlFileFieldInterceptorOptions,
) {
  class MixinInterceptor implements NestInterceptor {
    options: GraphqlFileFieldInterceptorOptions = {
      uploadField: 'file',
      destination: FileSaveDestination.LOCAL,
    };

    constructor(
      @Inject('S3FileUpload')
      private readonly s3FileUploadService: S3FileUploadService,
      @Inject('LocalFileUpload')
      private readonly LocalFileUploadService: LocalFileUploadService,
      @Optional() options: any = {},
    ) {
      this.options = { ...options, ...localOptions };
    }

    async storeFile(file: Promise<FileUpload>) {
      // options is not doing anything right now
      const stream = (await file).createReadStream();
      const fileId = uuid();
      const filename = `${fileId}.jpg`;

      switch (this.options.destination) {
        case FileSaveDestination.LOCAL:
          await this.s3FileUploadService.uploadFile(
            filename,
            stream,
          );
          break;

        case FileSaveDestination.S3:
          await this.s3FileUploadService.uploadFile(
            filename,
            stream,
          );
          break;
      }

      return fileId;
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);
      const args = ctx.getArgs();
      const file = get(args, uploadField) as Promise<FileUpload>;

      if (file) {
        const fileId = await this.storeFile(file);
        set(args, uploadField, fileId);
      }

      return next
        .handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}
