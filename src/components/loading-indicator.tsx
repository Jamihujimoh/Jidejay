'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function LoadingIndicator() {
  return (
    <div className="flex items-start gap-4 justify-start">
      <Avatar className="w-10 h-10 border-2 border-primary">
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
            J
        </AvatarFallback>
      </Avatar>
      <div className="max-w-md rounded-lg px-4 py-3 bg-card text-card-foreground rounded-tl-none flex items-center gap-2 shadow-md">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
