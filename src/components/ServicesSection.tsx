import { Globe, Smartphone, ShoppingCart, Settings, Code, Zap, Palette, Shield, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onContactClick: () => void;
}

export const ServicesSection = ({ onContactClick }: ServicesSectionProps) => {
  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Design de interfaces modernas e intuitivas com foco na experiência do usuário.",
      features: ["Wireframes & Protótipos", "Design System", "User Research"],
      timeframe: "1-2 semanas",
      popular: false,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Desenvolvimento de aplicações web responsivas e performáticas.",
      features: ["React/Next.js", "TypeScript", "SEO Otimizado"],
      timeframe: "2-4 semanas",
      popular: true,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Aplicativos nativos e híbridos para iOS e Android.",
      features: ["React Native", "Flutter", "App Store"],
      timeframe: "4-6 semanas",
      popular: false,
      color: "from-green-500 to-green-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Lojas virtuais completas com gestão de produtos e pagamentos.",
      features: ["Shopify/WooCommerce", "Gateway de Pagamento", "Analytics"],
      timeframe: "3-5 semanas",
      popular: false,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Metodologia ágil para entregas em tempo recorde"
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Código limpo e testes automatizados"
    },
    {
      icon: Users,
      title: "Suporte Dedicado",
      description: "Acompanhamento completo do projeto"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20" data-animation="fade-in-smooth">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6" data-animation="slide-left-smooth">
            <Palette className="w-4 h-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Nossos Serviços</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8" data-animation="fade-in-smooth">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Soluções
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digitais
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed" data-animation="fade-in-smooth">
            Desenvolvimento de interfaces modernas e aplicações web com foco em 
            experiência do usuário e design minimalista.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 relative group hover:scale-105 ${
                  service.popular ? 'ring-2 ring-purple-500/50' : ''
                }`}
                data-animation="fade-in-smooth"
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2" data-animation="scale-in-smooth">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Prazo:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{service.timeframe}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                      onClick={onContactClick}
                    >
                      Iniciar Projeto
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div data-animation="slide-in-bottom">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6" data-animation="fade-in-up">
              <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                Por que nos escolher?
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg" data-animation="fade-in-up">
              Diferenciais que nos tornam a melhor escolha para seu projeto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center space-y-6 group" data-animation="fade-in-up">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};