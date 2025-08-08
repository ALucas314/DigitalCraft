import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
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
  title = "Pronto para transformar sua ideia em realidade?",
  description = "Nosso especialista está pronto para ajudar você. Receba um orçamento personalizado em minutos.",
  variant = "primary"
}: UnifiedCTAProps) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 text-center" data-animation="fade-in-smooth">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <div data-animation="fade-in-smooth">
          <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
        </div>
        
        <Button 
          size="lg"
          onClick={onContactClick}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-3 text-lg font-semibold"
        >
          <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Fale com o Chat
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
        </Button>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Resposta em até 24 horas</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Consultoria gratuita</span>
          </div>
        </div>
      </div>
    </Card>
  );
}; 