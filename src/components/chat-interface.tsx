'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { getAiResponse } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { SendHorizonal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Message } from '@/lib/types';
import { ChatMessage } from '@/components/chat-message';
import { LoadingIndicator } from '@/components/loading-indicator';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

const CHAT_STORAGE_KEY = 'jimskays-chat-history';

export default function ChatInterface() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  // Load messages from local storage on initial render
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            id: '0',
            role: 'assistant',
            content: "Hey! Jimskays is in the house. What's on your mind? You can ask me anything or we can just vibe.",
          },
        ]);
      }
    } catch (error) {
        console.error("Failed to parse messages from local storage", error);
        setMessages([
            {
              id: '0',
              role: 'assistant',
              content: "Hey! Jimskays is in the house. What's on your mind? You can ask me anything or we can just vibe.",
            },
          ]);
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save messages to local storage", error);
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, isLoading]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userInput = values.message.trim();
    if (!userInput) return;
    
    form.reset();
    
    const newId = String(Date.now());
    const newUserMessage: Message = {
      id: newId,
      role: 'user',
      content: userInput,
    };
    
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const result = await getAiResponse(updatedMessages);

    setIsLoading(false);

    if (result.success && result.response) {
      const newAssistantMessage: Message = {
        id: String(Date.now() + 1),
        role: 'assistant',
        content: result.response,
      };
      setMessages(prev => [...prev, newAssistantMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.error || 'There was a problem with the request.',
      });
      // Revert to previous messages on error
      const revertedMessages = updatedMessages.slice(0, -1);
      setMessages(revertedMessages);
    }
  };

  return (
    <Card className="w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl bg-card/60 backdrop-blur-lg border border-primary/10">
      <div className="flex items-center p-4 border-b border-primary/10">
        <Avatar className="w-12 h-12 border-2 border-accent">
          <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">J</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="font-headline text-2xl font-bold text-primary">JimskaysAI</h2>
          <p className="text-sm text-muted-foreground flex items-center">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-primary/10 bg-card/70">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Type your message to Jimskays..."
                      className="resize-none bg-transparent"
                      rows={1}
                      {...field}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              form.handleSubmit(onSubmit)();
                          }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading || !form.watch('message')}>
              <SendHorizonal className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
