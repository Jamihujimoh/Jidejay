'use client';

import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant';
  return (
    <div className={cn('flex items-start gap-4', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant && (
        <Avatar className="w-10 h-10 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">J</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xl rounded-lg px-4 py-3 text-base shadow-md',
          isAssistant
            ? 'bg-card text-card-foreground rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        <p className="whitespace-pre-wrap font-body">{message.content}</p>
      </div>
       {!isAssistant && (
        <Avatar className="w-10 h-10 border-2 border-accent">
          <AvatarFallback className="bg-accent text-accent-foreground"><User /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
