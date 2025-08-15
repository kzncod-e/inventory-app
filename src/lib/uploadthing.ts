import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { genUploader } from "uploadthing/client";

import type { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { uploadFiles } = genUploader<OurFileRouter>();
