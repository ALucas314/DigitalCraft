import { ArrowRight, Play, CheckCircle, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection = ({ onContactClick }: HeroSectionProps) => {
  const benefits = [
    { icon: Sparkles, text: "Design minimalista e moderno" },
    { icon: Zap, text: "Performance otimizada" },
    { icon: Target, text: "Foco na experiência do usuário" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,219,255,0.2),transparent_50%)]"></div>
      </div>

      {/* Floating Elements - Only on Desktop */}
      <div className="hidden lg:block absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse z-0 pointer-events-none"></div>
      <div className="hidden lg:block absolute top-40 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000 z-0 pointer-events-none"></div>
      <div className="hidden lg:block absolute bottom-40 left-20 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-16 pt-32 lg:pt-40">
          {/* Content */}
          <div className="space-y-6" data-animation="fade-in-smooth">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full" data-animation="slide-left-smooth">
                <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Design Minimalista & Moderno</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight" data-animation="fade-in-smooth">
                <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                  Criamos
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Experiências
                </span>
                <br />
                <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                  Digitais
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg" data-animation="fade-in-smooth">
                Desenvolvimento de interfaces modernas e responsivas com foco em 
                experiência do usuário e design minimalista.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3" data-animation="fade-in-smooth">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 group" data-animation="fade-in-smooth">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <benefit.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4" data-animation="fade-in-smooth">
              <Button 
                size="lg"
                onClick={onContactClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Começar Projeto
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200 dark:border-slate-700" data-animation="fade-in-smooth">
              <div className="text-center" data-animation="scale-in-smooth">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">150+</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Projetos Entregues</div>
              </div>
              <div className="text-center" data-animation="scale-in-smooth">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">98%</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Satisfação</div>
              </div>
              <div className="text-center" data-animation="scale-in-smooth">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">24h</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Resposta</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="lg:order-2" data-animation="slide-right-smooth">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-4 sm:p-6 lg:p-8">
              <div className="space-y-8">
                <div className="text-center" data-animation="fade-in-smooth">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">Processo Simplificado</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Do conceito à implementação em tempo recorde
                  </p>
                </div>
                
                <div className="space-y-4" data-animation="fade-in-smooth">
                  {[
                    { name: "Discovery", time: "1-2 dias", color: "from-purple-500 to-purple-600" },
                    { name: "Design", time: "3-5 dias", color: "from-blue-500 to-blue-600" },
                    { name: "Development", time: "1-2 semanas", color: "from-green-500 to-green-600" },
                    { name: "Launch", time: "1 dia", color: "from-orange-500 to-orange-600" }
                  ].map((phase, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300" data-animation="fade-in-smooth">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-gradient-to-r ${phase.color} rounded-full`}></div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{phase.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{phase.time}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onContactClick}
                >
                  Iniciar Conversa
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Only on Desktop */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};