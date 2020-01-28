import { ReadStream } from "fs-capacitor";

export interface FileUploadService {
  uploadFile(filename: string, file: ReadStream): Promise<void>
}
