import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { 
  MessageCircle, 
  Send,
  RotateCcw,
  User,
  Bot,
  Phone,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  X,
  Clock,
  Star,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Smartphone,
  Globe,
  Database,
  ShoppingCart,
  Users,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Code,
  Laptop,
  Smartphone as Mobile,
  ShoppingBag,
  Settings,
  Rocket,
  Target,
  Lightbulb,
  Heart,
  ThumbsUp,
  CheckSquare,
  AlertCircle,
  Info,
  ExternalLink,
  Download,
  Play,
  Pause,
  Volume2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  LogOut
} from "lucide-react";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      text: "Olá! 👋 Sou o assistente virtual da SoftwarePro. Posso te ajudar com:\n\n🚀 **Encomendar Projeto** - Solicitar orçamento personalizado\n📞 **Entrar em Contato** - Falar diretamente com especialista\n\nO que você gostaria de fazer?",
      isBot: true,
      type: "greeting",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState("main");
  const [selectedService, setSelectedService] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom with smooth animation
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  }, [chatMessages]);

  // Typing indicator
  const showTypingIndicator = () => {
    setIsTyping(true);
  };

  const hideTypingIndicator = () => {
    setIsTyping(false);
  };

  // Main options - simplified and intuitive
  const mainOptions = [
    { 
      text: "🚀 Encomendar Projeto", 
      action: "order_project",
      icon: Rocket,
      description: "Solicitar orçamento personalizado",
      color: "from-blue-500 to-purple-600"
    },
    { 
      text: "📞 Entrar em Contato", 
      action: "contact",
      icon: Phone,
      description: "Falar diretamente com especialista",
      color: "from-green-500 to-green-600"
    }
  ];

  const projectTypes = [
    {
      id: "landing",
      title: "🌐 Landing Page",
      description: "Site simples e focado em conversão",
      price: "A partir de R$ 800",
      timeframe: "1 semana",
      features: ["Design responsivo", "Otimização SEO", "Formulário de contato"]
    },
    {
      id: "website",
      title: "🏢 Site Institucional",
      description: "Site completo para sua empresa",
      price: "A partir de R$ 1.200",
      timeframe: "1-2 semanas",
      features: ["Múltiplas páginas", "Painel administrativo", "Blog integrado"]
    },
    {
      id: "ecommerce",
      title: "🛒 E-commerce",
      description: "Loja virtual completa",
      price: "A partir de R$ 2.500",
      timeframe: "2-3 semanas",
      features: ["Sistema de pagamentos", "Gestão de produtos", "Relatórios de vendas"]
    },
    {
      id: "app",
      title: "📱 App Mobile",
      description: "Aplicativo para iOS e Android",
      price: "A partir de R$ 4.000",
      timeframe: "4-6 semanas",
      features: ["Multiplataforma", "Push notifications", "Sincronização em nuvem"]
    },
    {
      id: "system",
      title: "⚙️ Sistema Web",
      description: "Sistema personalizado",
      price: "A partir de R$ 5.000",
      timeframe: "3-4 semanas",
      features: ["Funcionalidades customizadas", "Banco de dados", "API integrada"]
    }
  ];

  const projectTypesSimple = [
    "Landing Page",
    "Site Institucional", 
    "E-commerce",
    "App Mobile",
    "Sistema Web",
    "Blog",
    "Portal Corporativo",
    "API/Rest",
    "Dashboard",
    "CRM/ERP",
    "Outro Projeto"
  ];

  // Error handling function
  const handleError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    setErrorCount(prev => prev + 1);
    
    const errorMessage = {
      id: Date.now(),
      text: "❌ Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.",
      isBot: true,
      type: "error",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, errorMessage]);
  };

  // Intelligent response handler
  const handleIntelligentResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Detect project types
    const projectKeywords = {
      'landing': ['landing', 'página', 'site simples', 'one page'],
      'website': ['site', 'institucional', 'empresa', 'corporativo'],
      'ecommerce': ['ecommerce', 'e-commerce', 'loja', 'venda', 'shop', 'comércio'],
      'app': ['app', 'mobile', 'aplicativo', 'celular', 'smartphone'],
      'system': ['sistema', 'software', 'aplicação', 'web app'],
      'blog': ['blog', 'conteúdo', 'artigos'],
      'portal': ['portal', 'intranet'],
      'api': ['api', 'rest', 'integração'],
      'dashboard': ['dashboard', 'painel', 'controle'],
      'crm': ['crm', 'erp', 'gestão', 'cliente']
    };

    for (const [type, keywords] of Object.entries(projectKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return { type: 'project_detected', projectType: type };
      }
    }

    // Detect budget
    const budgetPattern = /r?\$?\s*(\d+)/gi;
    const budgetMatch = input.match(budgetPattern);
    if (budgetMatch) {
      return { type: 'budget_detected', budget: budgetMatch[0] };
    }

    // Detect urgency
    if (input.includes('urgente') || input.includes('rápido') || input.includes('logo')) {
      return { type: 'urgency_detected' };
    }

    return { type: 'general_inquiry' };
  };

  const handleQuickOption = (action: string) => {
    try {
      const userMessage = { 
        id: Date.now(), 
        text: action === "order_project" ? "🚀 Quero encomendar um projeto" : "📞 Quero entrar em contato", 
        isBot: false, 
        type: "option",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, userMessage]);

      showTypingIndicator();

      setTimeout(() => {
        try {
          let response = "";
          let type = "";

          switch (action) {
            case "order_project":
              response = "Perfeito! 🎯 Vou te ajudar a escolher o projeto ideal. Que tipo de projeto você tem em mente?\n\n💡 **Dica**: Se não souber exatamente, posso te ajudar a escolher baseado no seu objetivo!";
              type = "project_selection";
              setCurrentStep("project_selection");
              break;
            case "contact":
              response = "Ótimo! 📞 Vou te conectar diretamente com nosso especialista. Como prefere entrar em contato?";
              type = "contact_options";
              setCurrentStep("contact_options");
              break;
            default:
              response = "Desculpe, não entendi. Pode escolher uma das opções disponíveis?";
              type = "unknown";
          }

          const botMessage = { 
            id: Date.now() + 1, 
            text: response, 
            isBot: true, 
            type,
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, botMessage]);
          hideTypingIndicator();
        } catch (error) {
          handleError(error, "handleQuickOption response");
          hideTypingIndicator();
        }
      }, 1500);
    } catch (error) {
      handleError(error, "handleQuickOption");
    }
  };

  const handleProjectSelection = (projectId: string) => {
    try {
      const project = projectTypes.find(p => p.id === projectId);
      const userMessage = { 
        id: Date.now(), 
        text: `Interessado em: ${project?.title}`, 
        isBot: false, 
        type: "project",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, userMessage]);
      setSelectedService(projectId);

      showTypingIndicator();

      setTimeout(() => {
        try {
          const response = `Excelente escolha! 🎉\n\n**${project?.title}**\n${project?.description}\n\n💰 **${project?.price}**\n⏱️ **Prazo**: ${project?.timeframe}\n\n✨ **Inclui**:\n${project?.features?.map(f => `• ${f}`).join('\n')}\n\nComo gostaria de prosseguir?`;
          const botMessage = { 
            id: Date.now() + 1, 
            text: response, 
            isBot: true, 
            type: "project_detail",
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, botMessage]);
          setCurrentStep("project_options");
          hideTypingIndicator();
        } catch (error) {
          handleError(error, "handleProjectSelection response");
          hideTypingIndicator();
        }
      }, 2000);
    } catch (error) {
      handleError(error, "handleProjectSelection");
    }
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      try {
        const userMessage = { 
          id: Date.now(), 
          text: chatInput, 
          isBot: false, 
          type: "user",
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, userMessage]);
        const userInput = chatInput.trim();
        setChatInput("");
        
        showTypingIndicator();

        setTimeout(() => {
          try {
            const analysis = handleIntelligentResponse(userInput);
            let response = "";

            switch (analysis.type) {
              case 'project_detected':
                response = `Perfeito! Vejo que você está interessado em ${analysis.projectType}. Vou te mostrar as opções disponíveis para este tipo de projeto.`;
                setCurrentStep("project_selection");
                break;
              case 'budget_detected':
                response = `Entendi! Seu orçamento é ${analysis.budget}. Vou te mostrar opções que se encaixam neste valor.`;
                setCurrentStep("project_selection");
                break;
              case 'urgency_detected':
                response = `Entendi que é urgente! Vou te ajudar a encontrar a solução mais rápida. Que tipo de projeto você precisa?`;
                setCurrentStep("project_selection");
                break;
              default:
                response = `Entendi! Para te ajudar melhor, preciso saber que tipo de projeto você tem em mente. Aqui estão nossas principais opções:`;
                setCurrentStep("project_selection");
            }

            const botMessage = { 
              id: Date.now() + 1, 
              text: response, 
              isBot: true,
              type: "intelligent_response",
              timestamp: new Date()
            };
            setChatMessages(prev => [...prev, botMessage]);
            hideTypingIndicator();
          } catch (error) {
            handleError(error, "sendMessage analysis");
            hideTypingIndicator();
          }
        }, 1500);
      } catch (error) {
        handleError(error, "sendMessage");
      }
    }
  };

  const resetChat = () => {
    try {
      setChatMessages([{ 
        id: 1, 
        text: "Olá! 👋 Sou o assistente virtual da SoftwarePro. Posso te ajudar com:\n\n🚀 **Encomendar Projeto** - Solicitar orçamento personalizado\n📞 **Entrar em Contato** - Falar diretamente com especialista\n\nO que você gostaria de fazer?",
        isBot: true,
        type: "greeting",
        timestamp: new Date()
      }]);
      setShowForm(false);
      setCurrentStep("main");
      setSelectedService("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: ""
      });
      setErrorCount(0);
    } catch (error) {
      handleError(error, "resetChat");
    }
  };

  const endChat = () => {
    try {
      setChatMessages([
        { 
          id: 1, 
          text: "Chat encerrado. Obrigado por usar nosso atendimento! 👋\n\nSe precisar de mais alguma coisa, é só abrir o chat novamente.",
          isBot: true,
          type: "farewell",
          timestamp: new Date()
        }
      ]);
      setCurrentStep("main");
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: ""
      });
    } catch (error) {
      handleError(error, "endChat");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Usar as mesmas variáveis de ambiente do ContactSection
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
      const templateIdClient = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "antoniolucas9014@gmail.com";

      // Validação das variáveis de ambiente
      const missingVars = [];
      if (!serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
      if (!templateIdAdmin) missingVars.push('VITE_EMAILJS_TEMPLATE_ID_ADMIN');
      if (!templateIdClient) missingVars.push('VITE_EMAILJS_TEMPLATE_ID_CLIENT');
      if (!userId) missingVars.push('VITE_EMAILJS_USER_ID');
      if (!adminEmail) missingVars.push('VITE_ADMIN_EMAIL');

      if (missingVars.length > 0) {
        console.error('Variáveis de ambiente faltando:', missingVars);
        const errorMessage = {
          id: Date.now(),
          text: "❌ Erro de configuração. Por favor, entre em contato diretamente pelo WhatsApp.",
          isBot: true,
          type: "error",
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, errorMessage]);
        setIsSubmitting(false);
        return;
      }

      const templateParamsAdmin = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project: formData.project,
        message: formData.message,
      };

      const templateParamsClient = {
        name: formData.name,
        email: formData.email,
        project: formData.project,
        message: formData.message,
        to_email: formData.email,
      };

      // Envia primeiro para o admin
      await emailjs.send(serviceId, templateIdAdmin, templateParamsAdmin, userId);
      
      // Envia confirmação para o cliente com timeout para evitar conflitos
      setTimeout(async () => {
        try {
          await emailjs.send(serviceId, templateIdClient, templateParamsClient, userId);
        } catch (clientError) {
          console.error('Erro ao enviar email para cliente:', clientError);
          // Continua mesmo se falhar o email para o cliente
        }
      }, 1000);

      const successMessage = {
        id: Date.now(),
        text: "✅ Orçamento enviado com sucesso! Entraremos em contato em até 24 horas. Confira seu e-mail para a confirmação. Obrigado por escolher a SoftwarePro! 🚀",
        isBot: true,
        type: "success",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, successMessage]);
      setShowForm(false);
      setIsSubmitting(false);
      setCurrentStep("main");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = {
        id: Date.now(),
        text: "❌ Erro ao enviar orçamento. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.",
        isBot: true,
        type: "error",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
      setIsSubmitting(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleWhatsApp = () => {
    try {
      const phone = "91996014545";
      const message = "Olá! Gostaria de saber mais sobre os serviços de desenvolvimento da SoftwarePro. Pode me ajudar com um orçamento?";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } catch (error) {
      handleError(error, "handleWhatsApp");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="w-full max-w-md h-[600px] pointer-events-auto">
        <Card className="h-full flex flex-col shadow-2xl border-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Assistente Virtual</h3>
                <p className="text-xs text-muted-foreground">Online • Responde em segundos</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="h-8 w-8 p-0"
                title="Reiniciar chat"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={endChat}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                title="Encerrar chat"
              >
                <LogOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                title="Fechar chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/10">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div className={`flex items-start gap-2 max-w-xs lg:max-w-sm ${
                  message.isBot ? "flex-row" : "flex-row-reverse"
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.isBot 
                      ? "bg-gradient-to-r from-red-500 to-pink-600 text-primary-foreground" 
                      : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  }`}>
                    {message.isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`p-3 rounded-2xl whitespace-pre-line text-sm ${
                        message.isBot
                          ? "bg-card border border-border/50 shadow-sm"
                          : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                    <span className={`text-xs text-muted-foreground mt-1 ${
                      message.isBot ? "text-left" : "text-right"
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-primary-foreground">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="p-3 rounded-2xl bg-card border border-border/50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Encerrar Chat Button - Only show if there are messages and not in form */}
            {chatMessages.length > 1 && !showForm && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={endChat}
                  className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                >
                  <X className="w-3 h-3 mr-1" />
                  Encerrar Chat
                </Button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {currentStep === "main" && chatMessages.length === 1 && (
            <div className="p-4 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
              <div className="grid grid-cols-1 gap-3">
                {mainOptions.map((option) => (
                  <Button
                    key={option.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickOption(option.action)}
                    className="text-sm h-auto p-4 flex items-center gap-3 hover:scale-105 transition-all duration-200 border-border/50 hover:border-primary/50"
                  >
                    <option.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{option.text}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Project Selection Options */}
          {currentStep === "project_selection" && (
            <div className="p-3 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {projectTypes.map((project) => (
                  <Button
                    key={project.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleProjectSelection(project.id)}
                    className="w-full text-left h-auto p-3 justify-start hover:bg-primary/5 border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{project.title.split(' ')[0]}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{project.title}</div>
                        <div className="text-xs text-muted-foreground">{project.description}</div>
                        <div className="text-xs font-semibold text-primary mt-1">{project.price}</div>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Project Options */}
          {currentStep === "project_options" && (
            <div className="p-3 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentStep("form");
                    setShowForm(true);
                  }}
                  className="w-full text-left h-auto p-3 justify-start hover:bg-primary/5 border-border/50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Preencher Formulário de Orçamento
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep("contact_options")}
                  className="w-full text-left h-auto p-3 justify-start hover:bg-primary/5 border-border/50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Falar Diretamente com Especialista
                </Button>
              </div>
            </div>
          )}

          {/* Contact Options */}
          {currentStep === "contact_options" && (
            <div className="p-3 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
              <div className="space-y-3">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentStep("form");
                    setShowForm(true);
                  }}
                  className="w-full border-border/50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Preencher Formulário
                </Button>
              </div>
            </div>
          )}

          {/* Back to Main Menu */}
          {(currentStep === "project_selection" || currentStep === "project_options" || currentStep === "contact_options") && (
            <div className="p-3 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentStep("main");
                  const backMessage = { 
                    id: Date.now(), 
                    text: "Voltar ao menu principal", 
                    isBot: false, 
                    type: "back",
                    timestamp: new Date()
                  };
                  setChatMessages(prev => [...prev, backMessage]);
                  setTimeout(() => {
                    const response = "Claro! Como posso ajudar você agora?";
                    const botMessage = { 
                      id: Date.now() + 1, 
                      text: response, 
                      isBot: true, 
                      type: "main_menu",
                      timestamp: new Date()
                  };
                    setChatMessages(prev => [...prev, botMessage]);
                  }, 500);
                }}
                className="text-sm w-full"
              >
                ← Voltar ao Menu Principal
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-gradient-to-t from-background to-transparent">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-3 py-2 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
              />
              <Button 
                onClick={sendMessage} 
                size="sm" 
                disabled={!chatInput.trim()}
                className="rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Encerrar Chat Button in Input Area */}
            {chatMessages.length > 1 && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={endChat}
                  className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="w-3 h-3 mr-1" />
                  Encerrar Chat
                </Button>
              </div>
            )}
          </div>

          {/* Quote Form */}
          {showForm && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <h4 className="text-lg font-semibold">📋 Orçamento Personalizado</h4>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowForm(false)}
                  className="text-xs"
                >
                  Voltar ao Chat
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 font-medium">Nome *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">E-mail *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Telefone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(91) 99601-4545"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Tipo de Projeto *</label>
                      <select
                        name="project"
                        value={formData.project}
                        onChange={(e) => setFormData({...formData, project: e.target.value})}
                        required
                        className="w-full rounded-lg px-3 py-2 border border-input bg-background text-foreground"
                      >
                        <option value="">Selecione...</option>
                        {projectTypesSimple.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Mensagem *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      placeholder="Descreva seu projeto e necessidades..."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}; 