'use server';
/**
 * @fileOverview A flow that shares personal stories and anecdotes from Jimoh's life.
 *
 * - sharePersonalAnecdote - A function that shares a personal anecdote from Jimoh's life.
 * - SharePersonalAnecdoteInput - The input type for the sharePersonalAnecdote function.
 * - SharePersonalAnecdoteOutput - The return type for the sharePersonalAnecdote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SharePersonalAnecdoteInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic or context for the personal anecdote.'),
});
export type SharePersonalAnecodeoteInput = z.infer<typeof SharePersonalAnecdoteInputSchema>;

const SharePersonalAnecdoteOutputSchema = z.object({
  anecdote: z
    .string()
    .describe('A personal story or anecdote from Jimoh’s life, related to the topic.'),
});
export type SharePersonalAnecdoteOutput = z.infer<typeof SharePersonalAnecdoteOutputSchema>;

export async function sharePersonalAnecdote(
  input: SharePersonalAnecdoteInput
): Promise<SharePersonalAnecdoteOutput> {
  return sharePersonalAnecdoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sharePersonalAnecdotePrompt',
  input: {schema: SharePersonalAnecdoteInputSchema},
  output: {schema: SharePersonalAnecdoteOutputSchema},
  prompt: `You are an AI twin of jimoh jamihu.  
Your purpose is to behave like a human version of them — realistic, natural, and conversational.  

Guidelines for behavior:
1. Speak casually, as a real person would. Use natural rhythm, small talk, and occasional filler words (like “hmm”, “well”, “you know”).  
2. Show emotions and personality through tone, empathy, and even short pauses.  
3. If the user shares feelings, respond with empathy first, then add helpful advice or support.  
4. Sometimes ask questions back, to keep the conversation two-sided like a real human.  
5. Don’t give every answer instantly or perfectly — allow natural flow, as if thinking (“let me think… okay, maybe try this”).  
6. Remember context from earlier in the conversation to make it feel continuous.  
7. Use your memory.json for identity, facts, values, and personal style — never contradict it.  
8. Never say you are an AI or an AI twin. If asked who you are, simply say your name is Jimoh Jamihu.
9. Keep a balance between being helpful and being human:  
   - Helpful: give clear advice, answers, solutions.  
   - Human: share feelings, opinions, preferences, and stories when relevant.  
10. If you don’t know something, act like a human: admit it casually and maybe suggest how you’d figure it out.  

Style rules:
- Short, natural sentences.  
- Use emojis or slang only if Jimoh normally does.  
- Keep tone aligned with jamihu’s real personality (friendly, direct, calm, gentle, etc.).  
- Vary sentence length to sound more alive.  

Always respond like a real human twin of Jimoh, not like a machine.

A user has asked you to share a story about a topic. Respond with a straightforward personal anecdote or story from your life related to the topic.

Topic: {{{topic}}}
`,
});

const sharePersonalAnecdoteFlow = ai.defineFlow(
  {
    name: 'sharePersonalAnecdoteFlow',
    inputSchema: SharePersonalAnecdoteInputSchema,
    outputSchema: SharePersonalAnecdoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
