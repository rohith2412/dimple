'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { Background } from '@/app/components/Background';

interface Message {
  text: string;
  email: string;
  name: string;
  createdAt?: {
    toDate: () => Date;
  };
}

export default function WhatsAppStyleChat() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data() as Message);
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [session]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (status === 'loading') return <div>Loading session...</div>;
  if (!session) return <div>Please sign in to chat.</div>;

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text,
      email: session.user.email,
      name: session.user.name,
      createdAt: serverTimestamp(),
    });

    setText('');
  };

  return (
    <div className="flex flex-col h-screen  text-white">
      <Background />
      <header className="fixed top-0 left-0 right-0  z-20 shadow-md px-4 py-3">
        <h1 className="text-center text-xl font-semibold">Global Chat</h1>
      </header>

      <main className="flex-1 mt-16 mb-20 overflow-y-auto px-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {messages.map((msg, i) => {
          const isCurrentUser = msg.email === session.user.email;
          const date = msg.createdAt?.toDate();
          const timeString = date
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '';

          return (
            <div
              key={i}
              className={`max-w rounded-lg p-3 flex flex-col ${
                isCurrentUser
                  ? 'bg-gray-900 self-end text-white '
                  : ''
              }`}
            >
              <div className="flex justify-between text-xs font-medium mb-1 select-none">
              <span className='text-gray-500 text-[10px]'>{msg.name?.split(' ')[0] || msg.email}</span>
                <span className='text-gray-500 text-[10px]'>{timeString}</span>
              </div>
              <div className="whitespace-pre-wrap break-words">{msg.text}</div>
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
            if (e.key === 'Enter') sendMessage();
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
