import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection = ({ onContactClick }: HeroSectionProps) => {
  const benefits = [
    "Desenvolvimento personalizado",
    "Suporte técnico dedicado",
    "Entrega no prazo garantida"
  ];

  return (
    <section className="relative min-h-screen flex items-center hero-gradient pt-16 text-foreground">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Software Development" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full" data-animation="slide-left-smooth">
                <span className="text-sm font-medium text-primary">🚀 Transforme sua ideia em realidade</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight hero-text" data-animation="fade-in-smooth">
                Criamos{" "}
                <span className="text-primary-highlight">
                  Software Sob Medida
                </span>{" "}
                para Seu Negócio
              </h1>
              
              <p className="text-xl hero-text-secondary leading-relaxed" data-animation="fade-in-smooth">
                Desenvolvimento de aplicações web, mobile e sistemas personalizados 
                com tecnologia de ponta e foco total na sua necessidade.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3" data-animation="fade-in-smooth">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3" data-animation="fade-in-smooth">
                  <CheckCircle className="w-5 h-5 text-primary-glow flex-shrink-0" />
                  <span className="hero-text font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4" data-animation="fade-in-smooth">
              <Button 
                variant="hero" 
                size="xl"
                onClick={onContactClick}
                className="group"
              >
                Fale com Nosso Especialista
                <ArrowRight className="w-5 h-5 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20" data-animation="fade-in-smooth">
              <div className="text-center lg:text-left" data-animation="scale-in-smooth">
                <div className="text-2xl lg:text-3xl font-bold text-primary-stats">50+</div>
                <div className="text-sm hero-text-muted">Projetos Entregues</div>
              </div>
              <div className="text-center lg:text-left" data-animation="scale-in-smooth">
                <div className="text-2xl lg:text-3xl font-bold text-primary-stats">100%</div>
                <div className="text-sm hero-text-muted">Clientes Satisfeitos</div>
              </div>
              <div className="text-center lg:text-left" data-animation="scale-in-smooth">
                <div className="text-2xl lg:text-3xl font-bold text-primary-stats">5+</div>
                <div className="text-sm hero-text-muted">Anos de Experiência</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="lg:order-2" data-animation="slide-right-smooth">
            <Card className="card-gradient card-hover p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center" data-animation="fade-in-smooth">
                  <h3 className="text-2xl font-bold mb-2">Orçamento Instantâneo</h3>
                  <p className="text-muted-foreground">
                    Resposta em até 24 horas
                  </p>
                </div>
                
                <div className="space-y-4" data-animation="fade-in-smooth">
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg" data-animation="fade-in-smooth">
                    <span className="font-medium">Landing Page</span>
                    <span className="text-primary font-bold">1 semana</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg" data-animation="fade-in-smooth">
                    <span className="font-medium">E-commerce</span>
                    <span className="text-primary font-bold">3 semanas</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg" data-animation="fade-in-smooth">
                    <span className="font-medium">Sistema Web</span>
                    <span className="text-primary font-bold">4-6 semanas</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg" data-animation="fade-in-smooth">
                    <span className="font-medium">App Mobile</span>
                    <span className="text-primary font-bold">6-8 semanas</span>
                  </div>
                </div>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={onContactClick}
                >
                  Conversar Agora
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
      
      {/* Background Animation Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
    </section>
  );
};