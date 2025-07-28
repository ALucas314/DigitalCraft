import { useState } from "react";
import { Menu, X, Code, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onSectionClick: (section: string) => void;
  onChatToggle: () => void;
}

export const Header = ({ onSectionClick, onChatToggle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Início", section: "hero", icon: Globe },
    { name: "Serviços", section: "services", icon: Code },
    { name: "Contato", section: "contact", icon: Menu },
  ];

  const handleMenuClick = (section: string) => {
    onSectionClick(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SoftwarePro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <button
                  key={item.section}
                  onClick={() => handleMenuClick(item.section)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="hero" 
                size="sm"
                onClick={onChatToggle}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Fale com o Chat
              </Button>
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 fade-in" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-background border-b shadow-lg slide-in-top">
            <nav className="container mx-auto px-4 py-6">
              <div className="space-y-4 stagger-children">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.section}
                      onClick={() => handleMenuClick(item.section)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors hover-lift"
                    >
                      <Icon className="w-5 h-5 text-primary pulse" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
                <div className="pt-4 border-t space-y-3">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={onChatToggle}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Fale com o Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleMenuClick("contact")}
                  >
                    Orçamento Grátis
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};