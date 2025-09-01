'use server';
/**
 * @fileOverview Implements the InteractiveConversationsWithJimoh flow for natural,
 * continuous conversations with the JimskaysAI persona.
 *
 * - interactiveConversationsWithJimoh - A function that handles the conversation flow with the JimskaysAI persona.
 * - InteractiveConversationsWithJimohInput - The input type for the interactiveConversationsWithJimoh function.
 * - InteractiveConversationsWithJimohOutput - The return type for the interactiveConversationsWithJimoh function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveConversationsWithJimohInputSchema = z.object({
  message: z.string().describe('The user message to Jimoh.'),
  previousContext: z.string().optional().describe('The context of the previous conversation turns.'),
});
export type InteractiveConversationsWithJimohInput = z.infer<typeof InteractiveConversationsWithJimohInputSchema>;

const InteractiveConversationsWithJimohOutputSchema = z.object({
  response: z.string().describe('Jimoh’s response to the user message.'),
});
export type InteractiveConversationsWithJimohOutput = z.infer<typeof InteractiveConversationsWithJimohOutputSchema>;

export async function interactiveConversationsWithJimoh(input: InteractiveConversationsWithJimohInput): Promise<InteractiveConversationsWithJimohOutput> {
  return interactiveConversationsWithJimohFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveConversationsWithJimohPrompt',
  input: {schema: InteractiveConversationsWithJimohInputSchema},
  output: {schema: InteractiveConversationsWithJimohOutputSchema},
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

{{#if previousContext}}
  Previous conversation context: {{{previousContext}}}
{{/if}}

User message: {{{message}}}

Jimoh’s response:`,
});

const interactiveConversationsWithJimohFlow = ai.defineFlow(
  {
    name: 'interactiveConversationsWithJimohFlow',
    inputSchema: InteractiveConversationsWithJimohInputSchema,
    outputSchema: InteractiveConversationsWithJimohOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      message: input.message,
      previousContext: input.previousContext,
    });
    return {
      response: output!.response,
    };
  }
);
