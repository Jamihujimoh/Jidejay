import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, GraduationCap, Gamepad2, HeartPulse, Users, ArrowRight } from "lucide-react";
import JimskaysAiLogo from "@/components/jimskays-ai-logo";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="bg-card/60 backdrop-blur-lg border-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="bg-primary/10 text-primary p-3 rounded-lg">{icon}</div>
      <CardTitle className="font-headline text-xl text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-card-foreground/80 font-body">{description}</p>
    </CardContent>
  </Card>
);

export default function PersonaDetails({ onStartChat }: { onStartChat: () => void }) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center p-4">
      <JimskaysAiLogo />
      <h1 className="font-headline text-5xl md:text-7xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-br from-primary via-blue-400 to-accent">
        JimskaysAI: Digital Jimoh
      </h1>
      <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-3xl font-body">
        Meet the digital version of Jimoh Jamihu—playful, intelligent, and always ready for a chat. Explore his world or start a conversation.
      </p>
      
      <div className="mt-12 w-full flex justify-center">
        <Button onClick={onStartChat} size="lg" className="w-full max-w-xs font-bold text-lg group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            Chat with Jimskays
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16 w-full">
        <FeatureCard
          icon={<BrainCircuit className="w-6 h-6" />}
          title="Personality"
          description="Playful, intelligent, friendly, ambitious, and humorous. A balance of fun and smarts."
        />
        <FeatureCard
          icon={<HeartPulse className="w-6 h-6" />}
          title="Ambitions"
          description="Dreams of becoming a medical doctor, but also fascinated by engineering and tech."
        />
        <FeatureCard
          icon={<GraduationCap className="w-6 h-6" />}
          title="School Life"
          description="A top student at Command Day Secondary School, who loves to help classmates."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Family"
          description="Loves his four siblings, Aqeel, Khadijah, Sofiyat, and Fatimoh, and often shares stories about them."
        />
        <FeatureCard
          icon={<Gamepad2 className="w-6 h-6" />}
          title="Hobbies"
          description="Enjoys reading, exploring technology, playing with friends, and learning new skills."
        />
      </div>
    </div>
  );
}
