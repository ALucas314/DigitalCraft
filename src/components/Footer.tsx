import { Code, Mail, Phone, MapPin, Instagram, Linkedin, Github, Facebook, Twitter, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "#hero" },
    { name: "Serviços", href: "#services" },
    { name: "Atendimento", href: "#portfolio" },
    { name: "Contato", href: "#contact" }
  ];

  const supportLinks = [
    { name: "Chat de Atendimento", href: "#portfolio" },
    { name: "WhatsApp", href: "#" },
    { name: "FAQ", href: "#portfolio" },
    { name: "Orçamento", href: "#portfolio" },
  ];

  const newsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    if (!email) {
      alert("Por favor, insira seu email.");
      return;
    }

    // Criar link do Gmail com email preenchido
    const adminEmail = "antoniolucas9014@gmail.com";
    const subject = "Consulta - SoftwarePro";
    const body = `Olá Antônio!

Gostaria de saber mais sobre os serviços de desenvolvimento da SoftwarePro.

Meu email: ${email}

Tipo de projeto: [Descreva seu projeto]
Orçamento: [Faixa de investimento]
Prazo: [Quando precisa]
Descrição: [Detalhes do projeto]

Aguardo seu retorno!

Atenciosamente,
[Seu nome]`;

    try {
      // Opção 1: Tentar abrir Gmail web diretamente
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abrir Gmail web
      window.open(gmailUrl, '_blank');
      
      // Opção 2: mailto como backup
      const mailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mostrar mensagem de sucesso
      setTimeout(() => {
        alert("Gmail foi aberto! Se não funcionou, envie manualmente para: antoniolucas9014@gmail.com");
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao abrir email:', error);
      alert("Erro ao abrir Gmail. Por favor, envie um email manualmente para: antoniolucas9014@gmail.com");
    }

    // Limpar o formulário
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer
      className="bg-secondary-dark text-foreground font-sans footer-animate border-t-4 border-primary"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 stagger-children">
          {/* Sobre nós */}
          <div className="space-y-5" data-animation="fade-in-smooth">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg hover-scale-smooth">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight footer-text">Antônio Lucas Costa Araújo</span>
            </div>
            <p className="footer-text-muted leading-relaxed text-sm">
              Desenvolvedor Full Stack apaixonado por tecnologia, sempre explorando novas possibilidades e criando soluções inovadoras para o futuro da tecnologia.
            </p>
            <div className="flex space-x-3 mt-2">
              <a
                href="https://github.com/ALucas314"
                aria-label="GitHub"
                className="w-9 h-9 bg-black/20 rounded-lg flex items-center justify-center group shadow-md footer-social hover:bg-black/30 hover-smooth"
                tabIndex={0}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-white group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
              </a>
              {/* Outros ícones podem ser adicionados aqui se desejar */}
            </div>
          </div>

          {/* Links úteis */}
          <div data-animation="fade-in-up">
            <h3 className="text-lg font-bold mb-5 footer-text">Links úteis</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index} data-animation="fade-in-up">
                  <a 
                    href={link.href} 
                    className="footer-text-muted hover:footer-text transition-colors footer-link hover-lift"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div data-animation="fade-in-up">
            <h3 className="text-lg font-bold mb-5 footer-text">Suporte</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link, index) => (
                <li key={index} data-animation="fade-in-up">
                  <a 
                    href={link.href} 
                    className="footer-text-muted hover:footer-text transition-colors footer-link hover-lift"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato Direto */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col justify-between footer-newsletter" data-animation="fade-in-up">
            <h3 className="text-lg font-bold mb-5 footer-text">Contato Direto</h3>
            <p className="footer-text-muted text-sm mb-3">Digite seu email e clique em "Entrar em Contato" para abrir seu Gmail com uma mensagem preenchida.</p>
            <form onSubmit={newsletterSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="Seu e-mail"
                className="rounded-lg px-4 py-2 text-sm bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover-scale"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold shadow-md hover:from-primary-hover hover:to-primary-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary group footer-link hover-lift hover-glow"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 pulse" />
                Entrar em Contato
              </button>
            </form>
          </div>
        </div>
        <div className="py-4 border-t border-border mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="footer-text-muted text-xs md:text-sm">
              © {currentYear} Antônio Lucas Costa Araújo. Todos os direitos reservados.
            </div>
            <div className="flex space-x-4 text-xs md:text-sm">
              <a 
                href="#" 
                className="footer-text-muted hover:footer-text transition-colors footer-link"
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className="footer-text-muted hover:footer-text transition-colors footer-link"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};