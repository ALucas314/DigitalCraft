import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UnifiedCTAProps {
  onContactClick: () => void;
  title?: string;
  description?: string;
  variant?: "primary" | "secondary";
}

export const UnifiedCTA = ({ 
  onContactClick, 
  title = "Pronto para começar seu projeto?",
  description = "Fale com nosso especialista e receba um orçamento personalizado em minutos.",
  variant = "primary"
}: UnifiedCTAProps) => {
  return (
    <Card className={`p-8 text-center hover-smooth ${
      variant === "primary" 
        ? "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20" 
        : "bg-muted/50"
    }`} data-animation="fade-in-smooth">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto hover-scale-smooth">
          <MessageCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div data-animation="fade-in-smooth">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <Button 
          variant="hero" 
          size="lg"
          onClick={onContactClick}
          className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover-smooth"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Fale com o Chat
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Resposta em até 24 horas • Consultoria gratuita
        </p>
      </div>
    </Card>
  );
}; 