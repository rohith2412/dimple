// components/ProfileUploader.tsx
'use client';
import { useState } from 'react';

export default function ProfileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const res = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { url } = await res.json();

    // Upload directly to S3
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    const imageUrl = url.split('?')[0];
    console.log('Image available at:', imageUrl);

    // Save imageUrl to DB if needed
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} className="bg-black text-white px-4 py-1">
        Upload Profile Picture
      </button>
    </div>
  );
}
