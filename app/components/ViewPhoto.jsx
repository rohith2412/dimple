'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ViewPhoto() {
  const { data: session } = useSession();
  const [profilePicUrl, setProfilePicUrl] = useState(null);

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
    <div className="pt-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center gap-10">
        <div className="w-full h-auto object-cover rounded-t-lg pt-5">
      {profilePicUrl ? (
        <Image
          src={profilePicUrl}
          alt="Profile photo"
          width={70}
          height={70}
          className="w-full h-auto object-cover rounded-t-lg"
          unoptimized
        />
      ) : (
        <span className="text-gray-700 text-sm p-20">No photo yet</span>
      )}
    </div>
      </div>
    </div>
  );
}
