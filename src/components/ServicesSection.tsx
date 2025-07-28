import { Globe, Smartphone, ShoppingCart, Settings, Code, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  onContactClick: () => void;
}

export const ServicesSection = ({ onContactClick }: ServicesSectionProps) => {
  const services = [
    {
      icon: Globe,
      title: "Landing Pages",
      description: "Páginas otimizadas para conversão com design responsivo e carregamento ultra-rápido.",
      features: ["Design Responsivo", "SEO Otimizado", "Integração com Analytics"],
      timeframe: "1 semana",
      popular: false
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Lojas virtuais completas com pagamento integrado e gestão de produtos.",
      features: ["Gateway de Pagamento", "Gestão de Estoque", "Painel Administrativo"],
      timeframe: "3 semanas",
      popular: true
    },
    {
      icon: Code,
      title: "Sistemas Web",
      description: "Aplicações web personalizadas para gestão e automação de processos.",
      features: ["Banco de Dados", "API Restful", "Relatórios Avançados"],
      timeframe: "4-6 semanas",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Apps Mobile",
      description: "Aplicativos nativos para iOS e Android com performance otimizada.",
      features: ["Design Nativo", "Push Notifications", "Integração com APIs"],
      timeframe: "6-8 semanas",
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Entrega Ágil",
      description: "Metodologia ágil para entregas rápidas e iterativas"
    },
    {
      icon: Settings,
      title: "Personalização Total",
      description: "Cada projeto é único e desenvolvido sob medida"
    },
    {
      icon: Code,
      title: "Código Limpo",
      description: "Desenvolvimento com as melhores práticas e padrões"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full mb-4 hover-smooth" data-animation="slide-left-smooth">
            <span className="text-sm font-medium text-primary">💻 Nossos Serviços</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" data-animation="fade-in-smooth">
            Soluções Completas em{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent gradient-shift">
              Desenvolvimento
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-animation="fade-in-smooth">
            Oferecemos uma gama completa de serviços de desenvolvimento, 
            desde landing pages até sistemas complexos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 stagger-children">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className={`card-gradient card-hover p-6 relative hover-smooth ${
                  service.popular ? 'ring-2 ring-accent' : ''
                }`}
                data-animation="fade-in-smooth"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2" data-animation="scale-in-smooth">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover-scale-smooth">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Prazo:</span>
                      <span className="font-bold text-primary">{service.timeframe}</span>
                    </div>
                    <Button 
                      variant={service.popular ? "hero" : "outline"} 
                      size="sm" 
                      className="w-full hover-smooth"
                      onClick={onContactClick}
                    >
                      Conversar sobre Projeto
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div data-animation="slide-in-bottom">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4" data-animation="fade-in-up">
              Por que nos escolher?
            </h3>
            <p className="text-muted-foreground" data-animation="fade-in-up">
              Diferenciais que nos tornam a melhor escolha para seu projeto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center space-y-4" data-animation="fade-in-up">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto hover-scale">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};