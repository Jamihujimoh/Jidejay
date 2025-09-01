'use client';

import { useState } from 'react';
import PersonaDetails from '@/components/persona-details';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="z-10 w-full">
        {chatStarted ? (
          <div className="flex justify-center">
            <ChatInterface />
          </div>
        ) : (
          <PersonaDetails onStartChat={() => setChatStarted(true)} />
        )}
      </div>
    </main>
  );
}
