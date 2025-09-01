'use server';

import { interactiveConversationsWithJimoh } from '@/ai/flows/interactive-conversations-with-jimoh';
import type { Message } from '@/lib/types';

export async function getAiResponse(history: Message[]) {
    try {
        const userMessage = history[history.length - 1].content;
        const previousContext = history.slice(0, -1)
          .map(msg => `${msg.role === 'user' ? 'User' : 'Jimoh'}: ${msg.content}`)
          .join('\n');

        const result = await interactiveConversationsWithJimoh({
            message: userMessage,
            previousContext: previousContext || undefined,
        });

        if (result.response) {
            return { success: true, response: result.response };
        } else {
            return { success: false, error: 'AI did not provide a response.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An unexpected error occurred while getting a response from the AI.' };
    }
}
