"use client";

import { useState, useEffect } from "react";

type User = {
  _id: string;
  name: string;
  image: string;
  email?: string;
};

async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PORT_URL}/api/user`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data: User[] = await res.json();
  return data;
}

export function Alluser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allUsers = await fetchAllUsers();
        setUsers(allUsers);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center text-white text-lg">Loading...</div>
    );
  }

  return (
    <div className="text-white grid justify-center gap-10">
      {users.map((item) => (
        <div className="lg:w-70" key={item._id}>
          <div className="">
            <div className="flex gap-3 items-center">
              <div><img src={item.image} height={40} width={40} alt="xx" className="rounded-full object-cover"/></div>
              <div className="">
                <h1 className="text-sm">{item.name}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
