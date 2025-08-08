import { Sparkles, Mail, Phone, MapPin, Instagram, Linkedin, Github, Send, ArrowRight } from "lucide-react";
import { openChat } from "@/lib/chat-utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const quickLinks = [
    { name: "Início", href: "#hero", action: () => scrollToSection('hero') },
    { name: "Serviços", href: "#services", action: () => scrollToSection('services') },
    { name: "Contato", href: "#contact", action: () => scrollToSection('contact') }
  ];

  const supportLinks = [
    { name: "Chat de Atendimento", href: "#", action: () => openChat() },
    { name: "WhatsApp", href: "#", action: () => window.open('https://wa.me/5591996014545?text=Olá! Gostaria de saber mais sobre os serviços da DigitalCraft.', '_blank') },
    { name: "FAQ", href: "#", action: () => alert('FAQ em desenvolvimento. Entre em contato via WhatsApp ou email.') },
    { name: "Orçamento", href: "#", action: () => scrollToSection('contact') },
  ];

  const newsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    if (!email) {
      alert("Por favor, insira seu email.");
      return;
    }

    const adminEmail = "antoniolucas9014@gmail.com";
    const subject = "Consulta - DigitalCraft";
    const body = `Olá!

Gostaria de saber mais sobre os serviços de desenvolvimento da DigitalCraft.

Meu email: ${email}

Tipo de projeto: [Descreva seu projeto]
Orçamento: [Faixa de investimento]
Prazo: [Quando precisa]
Descrição: [Detalhes do projeto]

Aguardo seu retorno!

Atenciosamente,
[Seu nome]`;

    try {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
      
      setTimeout(() => {
        alert("Gmail foi aberto! Se não funcionou, envie manualmente para: antoniolucas9014@gmail.com");
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao abrir email:', error);
      alert("Erro ao abrir Gmail. Por favor, envie um email manualmente para: antoniolucas9014@gmail.com");
    }

    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-white relative overflow-hidden">
      {/* Overlay com toque sutil de azul e roxo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-900/15 dark:via-transparent dark:to-purple-900/15"></div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.06),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="space-y-6" data-animation="fade-in-smooth">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  DigitalCraft
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Design & Development
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              Desenvolvedor Full Stack apaixonado por tecnologia, sempre explorando novas possibilidades e criando soluções inovadoras para o futuro da tecnologia.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ALucas314"
                aria-label="GitHub"
                className="w-10 h-10 bg-slate-200/80 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group shadow-lg hover:bg-slate-300/80 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-slate-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/antonio-lucas-costa-araujo-5462a52b0"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-slate-200/80 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group shadow-lg hover:bg-slate-300/80 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-slate-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/a.lucas1920/"
                aria-label="Instagram"
                className="w-10 h-10 bg-slate-200/80 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group shadow-lg hover:bg-slate-300/80 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-slate-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-animation="fade-in-smooth">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Links úteis</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index} data-animation="fade-in-smooth">
                  <button 
                    onClick={link.action}
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-all duration-300 group flex items-center w-full text-left"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div data-animation="fade-in-smooth">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Suporte</h3>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <li key={index} data-animation="fade-in-smooth">
                  <button 
                    onClick={link.action}
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-all duration-300 group flex items-center w-full text-left"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1" data-animation="fade-in-smooth">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Contato Direto</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
              Digite seu email e clique em "Entrar em Contato" para abrir seu Gmail com uma mensagem preenchida.
            </p>
            <form onSubmit={newsletterSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Seu e-mail"
                className="w-full rounded-xl px-4 py-3 text-sm bg-white/80 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-white/60 border border-slate-300/50 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Entrar em Contato
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-300/30 dark:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © {currentYear} Antônio Lucas Costa Araújo. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => alert('Política de Privacidade em desenvolvimento. Entre em contato via email: antoniolucas9014@gmail.com')}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors duration-300"
              >
                Política de Privacidade
              </button>
              <button 
                onClick={() => alert('Termos de Uso em desenvolvimento. Entre em contato via email: antoniolucas9014@gmail.com')}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors duration-300"
              >
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};