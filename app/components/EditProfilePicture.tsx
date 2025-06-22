'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export  function EditProfilePicture() {
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

      router.push('/client/profile');
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 text-white flex flex-col items-center ">
      <h1 className="text-lg font-semibold mb-6">Upload Profile Picture</h1>

      {!session?.user ? (
        <p className="text-red-400 text-sm">Please log in first.</p>
      ) : (
        <>
          <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-200 transition mb-4">
            Choose File
            <input type="file" onChange={handleChange} className="hidden" />
          </label>

          {fileName && (
            <p className="text-sm text-gray-400 mb-4 text-center break-all">
              Selected: {fileName}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-blue-500 w-full max-w-xs py-2 rounded text-white text-sm hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </>
      )}
    </div>
  );
}
