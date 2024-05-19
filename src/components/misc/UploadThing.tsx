import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { uploadThingCore } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<uploadThingCore>();
export const UploadDropzone = generateUploadDropzone<uploadThingCore>();
