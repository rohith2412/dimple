'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleUpload = async () => {
    if (!file || !session?.user?.email) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', session.user.email);

    setLoading(true);
    try {
      const res = await fetch('/api/profilePicture', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      // Redirect after successful upload
      router.push('/client/profile');
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white p-10">
      <h1 className="text-xl font-bold mb-4 flex justify-center">Upload Profile Picture</h1>

      {!session?.user && <p>Please log in first.</p>}

      {session?.user && (
        <>
          <div className="flex justify-center mb-4 pt-15">
            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition">
              Choose File
              <input type="file" onChange={handleChange} className="hidden" />
            </label>
          </div>

          {fileName && (
            <p className="text-center text-sm text-gray-400 mb-4">Selected: {fileName}</p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
