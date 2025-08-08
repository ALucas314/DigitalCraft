import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { DevelopmentChart } from "@/components/DevelopmentChart";
// PortfolioSection removed - replaced with ChatWidget
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { UnifiedCTA } from "@/components/UnifiedCTA";
import { ChatWidget } from "@/components/ChatWidget";
import { ChatToggleButton } from "@/components/ChatToggleButton";
import { setOpenChatCallback } from "@/lib/chat-utils";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  // portfolioRef removed - chat is now handled by ChatWidget
  const contactRef = useRef<HTMLDivElement>(null);
  const [showChat, setShowChat] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToSection = (section: string) => {
    const refs = {
      hero: heroRef,
      services: servicesRef,
      contact: contactRef,
    };

    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  // Registrar a função de abrir chat globalmente
  useEffect(() => {
    setOpenChatCallback(handleOpenChat);
  }, []);

  // Animações suaves de scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove estado inicial
          entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-x-10', 'scale-95');
          
          // Adiciona animação baseada no data-animation
          const animationType = entry.target.getAttribute('data-animation');
          if (animationType) {
            entry.target.classList.add(animationType);
          }
          
                      // Anima filhos com delay
            if (entry.target.classList.contains('stagger-children')) {
              const children = entry.target.children;
              Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                  child.classList.remove('opacity-0', 'translate-y-10');
                  const childAnimation = child.getAttribute('data-animation') || 'fade-in-smooth';
                  child.classList.add(childAnimation);
                }, index * 250);
              });
            }
        }
      });
    }, observerOptions);

    // Observa elementos com animações
    const animatedElements = document.querySelectorAll('[data-animation], .stagger-children');
    
    animatedElements.forEach((el) => {
      // Estado inicial
      el.classList.add('opacity-0');
      if (!el.classList.contains('stagger-children')) {
        el.classList.add('translate-y-10');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header onSectionClick={scrollToSection} onChatToggle={() => setIsChatOpen(true)} />
      
      <div ref={heroRef}>
        <HeroSection onContactClick={handleContactClick} />
      </div>
      
      <div ref={servicesRef}>
        <ServicesSection onContactClick={handleContactClick} />
      </div>
      
      <DevelopmentChart />
      
      {/* Portfolio section removed - chat is now handled by ChatWidget */}
      
      <div ref={contactRef}>
        <ContactSection />
      </div>
      
      {/* Unified CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <UnifiedCTA 
            onContactClick={() => setIsChatOpen(true)}
            title="Pronto para transformar sua ideia em realidade?"
            description="Nosso especialista está pronto para ajudar você. Receba um orçamento personalizado em minutos."
            variant="primary"
          />
        </div>
      </section>
      
      <Footer />
      <ChatToggleButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
