'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ViewPhoto() {
  const { data: session } = useSession();
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/getPhoto?user=${session.user.email}`);
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
    <div className="flex flex-col items-center">
      {profilePicUrl ? (
        <Image
          src={profilePicUrl}
          alt="Profile photo"
          width={96}
          height={96}
          className="w-70"
          unoptimized
        />
      ) : (
        <span className="text-gray-700 text-sm p-20">No photo yet</span>
      )}
    </div>
  );
}
