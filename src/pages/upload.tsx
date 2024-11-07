import React, { useState } from 'react';
import { useUploadToS3 } from '../hooks/useUploadToS3';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, data, isLoading, error, isSuccess } = useUploadToS3();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      mutate({ file: selectedFile, fileName: selectedFile.name });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <input style={{ marginBottom: '20px' }} type='file' onChange={handleFileChange} />
      <button
        disabled={isLoading || !selectedFile}
        style={{ padding: '10px 20px', fontSize: '16px' }}
        onClick={handleUpload}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>Error: {error.message}</div>}
      {isSuccess && (
        <div style={{ color: 'green', marginTop: '10px' }}>File uploaded successfully: {data}</div>
      )}
    </div>
  );
}

export default function Upload() {
  return (
    <QueryClientProvider client={queryClient}>
      <UploadPage />
    </QueryClientProvider>
  );
}
