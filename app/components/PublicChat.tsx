"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Link from "next/link";

interface Message {
  text: string;
  email: string;
  name: string;
  createdAt?: {
    toDate: () => Date;
  };
}

export default function PublicChat() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (status === "loading") return <div className="flex justify-center text-white pt-20">Loading...</div>;
  if (!session) return <div className="flex justify-center text-white pt-20">Please<Link href={"/client/auth"}> &nbsp; <span className="underline">sign in</span> &nbsp;</Link>to chat.</div>;

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      email: session.user.email,
      name: session.user.name,
      createdAt: serverTimestamp(),
    });

    setText("");


  };

  return (
    <div className="flex flex-col h-screen  text-white">
      <header className="fixed top-0 left-0 right-0 z-20 shadow-md px-4 py-3  flex items-center justify-between">
        <Link href={"/client/dashboard"}>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15px"
              viewBox="0 -960 960 960"
              width="15px"
              fill="#FFFFFF"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            <h1 className="text-sm  Poppins">Back</h1>
          </div>
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15px"
            viewBox="0 -960 960 960"
            width="15px"
            fill="#FFFFFF"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
          </svg>
          <h1 className="text-xs Poppins">Public Chat</h1>
        </div>

        <div className="w-[48px]" />
      </header>

      <main className="flex-1 mt-16 mb-20 overflow-y-auto px-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {messages.map((msg, i) => {
          const isCurrentUser = msg.email === session.user.email;
          const date = msg.createdAt?.toDate();
          const timeString = date
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <div
              key={i}
              className={`max-w rounded-lg p-3 flex flex-col ${
                isCurrentUser ? "bg-gray-900 self-end text-white " : ""
              }`}
            >
              <div className="flex justify-between text-xs font-medium mb-1 select-none">
                <span className="text-gray-500 text-[10px]">
                  {msg.name?.split(" ")[0] || msg.email}
                </span>
                <span className="text-gray-500 text-[10px]">{timeString}</span>
              </div>
              <div className="whitespace-pre-wrap break-words ">{msg.text}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0  px-4 py-3 flex gap-3 items-center z-20 shadow-inner">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-grow rounded-full border   px-4 py-2 text-white focus:outline-none "
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-5 py-2 rounded-full font-semibold  transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
