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
      } catch {
        setProfilePicUrl(null); 
      }
    };

    fetchProfilePic();
  }, [session]);

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div>
        <Image
          src={profilePicUrl || "/default_img.png"}
          alt="Profile photo"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border border-white shadow-sm"
          unoptimized
        />
      </div>
    </div>
  );
}
