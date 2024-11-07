import { useMutation } from 'react-query';

async function uploadFileToS3(file: File, fileName: string): Promise<string> {
  const url = `https://aws-website-bmcandrews-uploads.s3.us-east-2.amazonaws.com/${encodeURIComponent(
    fileName
  )}`;

  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
  }

  console.log('File uploaded successfully:', url);

  return fileName;
}

interface UploadToS3Variables {
  file: File;
  fileName: string;
}
// React Query mutation hook for uploading a file to the S3 bucket
export function useUploadToS3() {
  return useMutation<string, Error, UploadToS3Variables>(({ file, fileName }) =>
    uploadFileToS3(file, fileName)
  );
}
