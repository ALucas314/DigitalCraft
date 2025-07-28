import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5591996014545";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "antoniolucas9014@gmail.com";
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      content: `+55 ${whatsappNumber.replace(/^55/, '')}`,
      action: `tel:+55${whatsappNumber}`
    },
    {
      icon: Mail,
      title: "E-mail",
      content: adminEmail,
      action: `mailto:${adminEmail}`
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Castanhal, Pará - Brasil",
      action: null
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Seg-Sex: 9h às 18h",
      action: null
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Substitua pelos seus IDs do EmailJS
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
    const templateIdClient = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    // const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; // Moved to top

    // Validação das variáveis de ambiente
    const missingVars = [];
    if (!serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
    if (!templateIdAdmin) missingVars.push('VITE_EMAILJS_TEMPLATE_ID_ADMIN');
    if (!templateIdClient) missingVars.push('VITE_EMAILJS_TEMPLATE_ID_CLIENT');
    if (!userId) missingVars.push('VITE_EMAILJS_USER_ID');
    if (!adminEmail) missingVars.push('VITE_ADMIN_EMAIL');

    if (missingVars.length > 0) {
      console.error('Variáveis de ambiente faltando:', missingVars);
      toast({
        title: "Erro de configuração",
        description: `Variáveis de ambiente não configuradas: ${missingVars.join(', ')}. Verifique o arquivo .env`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    console.log('Configuração EmailJS:', {
      serviceId,
      templateIdAdmin,
      templateIdClient,
      userId,
      adminEmail
    });

    const templateParamsAdmin = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project: formData.project,
      message: formData.message,
    };
    const templateParamsClient = {
      name: formData.name,
      email: formData.email, // Adicionado para envio ao cliente
      project: formData.project,
      message: formData.message,
      to_email: formData.email, // Garantir que o e-mail seja enviado para o cliente
    };

    console.log('Dados para admin:', templateParamsAdmin);
    console.log('Dados para cliente:', templateParamsClient);
    console.log('Email do cliente que deve receber confirmação:', formData.email);
    // Envia primeiro para o admin
    emailjs.send(serviceId, templateIdAdmin, templateParamsAdmin, userId)
      .then((adminResult) => {
        console.log('Email para admin enviado com sucesso:', adminResult);
        
        // Envia confirmação para o cliente com timeout para evitar conflitos
        setTimeout(() => {
          emailjs.send(serviceId, templateIdClient, templateParamsClient, userId)
            .then((clientResult) => {
              console.log('Email para cliente enviado com sucesso:', clientResult);
              toast({
                title: "Mensagem enviada!",
                description: "Entraremos em contato em até 24 horas. Confira seu e-mail.",
              });
              setFormData({
                name: "",
                email: "",
                phone: "",
                project: "",
                message: ""
              });
              setLoading(false);
            })
            .catch((clientError) => {
              console.error('Erro ao enviar email para cliente:', clientError);
              toast({
                title: "Aviso",
                description: "Sua mensagem foi recebida, mas houve um problema ao enviar a confirmação. Entraremos em contato em breve.",
                variant: "default",
              });
              setFormData({
                name: "",
                email: "",
                phone: "",
                project: "",
                message: ""
              });
              setLoading(false);
            });
        }, 1000); // Espera 1 segundo entre os envios
      })
      .catch((error) => {
        console.error('Erro ao enviar email para admin:', error);
        toast({
          title: "Erro ao enviar",
          description: "Erro ao enviar mensagem. Verifique sua conexão e tente novamente.",
          variant: "destructive",
        });
        setLoading(false);
      });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para desenvolvimento de software.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const projectTypes = [
    "Landing Page",
    "E-commerce",
    "Sistema Web",
    "App Mobile",
    "Sistema Personalizado",
    "Consultoria"
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-lg hover-smooth" data-animation="slide-up-smooth">
            <h2 className="text-3xl font-bold mb-2 text-center" data-animation="fade-in-smooth">Contato Direto</h2>
            <p className="text-muted-foreground text-center mb-8" data-animation="fade-in-smooth">
              Prefere contato direto? Use um dos canais abaixo ou continue usando nosso chatbot.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6" data-animation="fade-in-smooth">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                <div className="hover-smooth" data-animation="fade-in-smooth">
                  <label className="block mb-1 font-medium">Nome *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                    className="hover-scale-smooth"
                  />
                </div>
                <div className="hover-smooth" data-animation="fade-in-smooth">
                  <label className="block mb-1 font-medium">E-mail *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="hover-scale-smooth"
                  />
                </div>
                <div className="hover-smooth" data-animation="fade-in-smooth">
                  <label className="block mb-1 font-medium">Telefone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(91) 99601-4545"
                    className="hover-scale-smooth"
                  />
                </div>
                <div className="hover-smooth" data-animation="fade-in-smooth">
                  <label className="block mb-1 font-medium">Tipo de Projeto *</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg px-3 py-2 border border-input bg-background text-foreground hover-scale-smooth"
                  >
                    <option value="">Selecione...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="hover-smooth" data-animation="fade-in-smooth">
                <label className="block mb-1 font-medium">Mensagem *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Descreva seu projeto e necessidades..."
                  rows={4}
                  className="hover-scale-smooth"
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-2 hover-smooth"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Solicitação"}
              </Button>
            </form>
            <div className="text-center mt-6" data-animation="fade-in-up">
              <span className="text-muted-foreground">Ou fale conosco via:</span>
              <Button
                variant="outline"
                className="ml-2 border-green-500 text-green-600 hover:bg-green-50 hover-lift hover-glow"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-5 h-5 mr-2 pulse" /> WhatsApp
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center space-x-3 hover-lift" data-animation="fade-in-up">
                  <info.icon className="w-5 h-5 text-primary pulse" />
                  {info.action ? (
                    <a href={info.action} className="text-foreground hover:text-primary transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <span className="text-foreground">{info.content}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};