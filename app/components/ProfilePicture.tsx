'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProfilePicture() {
  const { data: session } = useSession();
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/getProfilePic?user=${session.user.email}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProfilePicUrl(data.url);
      } catch (err) {
        setProfilePicUrl(null); // fallback to default
      }
    };

    fetchProfilePic();
  }, [session]);

  return (
    <div className="flex justify-center gap-10">
      <div className="w-20 h-20 rounded-full overflow-hidden relative">
      <Image
        src={profilePicUrl || "/default_img.png"}
        alt="profile"
        width={80}
        height={80}
        className="rounded-full"
        unoptimized 
      />

      </div>
      <div className="flex items-center">
        <Link href="/client/profilePicture">
          <button className="text-white border rounded px-2 py-1 text-sm">
            Edit Photo
          </button>
        </Link>
      </div>
    </div>
  );
}
