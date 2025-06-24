'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Photo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setError('');
  };

  const handleUpload = async () => {
    if (!file || !session?.user?.email) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', session.user.email);

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/photo', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      router.push('/client/myProfile');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 text-white flex flex-col items-center">
      {!session?.user ? (
        <p className="text-red-400 text-sm">Please log in first.</p>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-200 transition mb-4 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              className="text-black"
            >
              <path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z" />
            </svg>
            
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {fileName && (
            <>
              <p className="text-sm text-gray-400 mb-4 text-center break-all">
                Selected: {fileName}
              </p>
              <button
                onClick={handleUpload}
                className="bg-blue-500 w-24 py-2 rounded text-white text-sm hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </>
          )}

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </>
      )}
    </div>
  );
}
