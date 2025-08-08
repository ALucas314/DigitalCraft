import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, MapPin, Clock, Sparkles, ArrowRight } from "lucide-react";
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
      action: `tel:+55${whatsappNumber}`,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "E-mail",
      content: adminEmail,
      action: `mailto:${adminEmail}`,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Castanhal, Pará - Brasil",
      action: null,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Seg-Sex: 9h às 18h",
      action: null,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdAdmin = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
    const templateIdClient = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

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

    emailjs.send(serviceId, templateIdAdmin, templateParamsAdmin, userId)
      .then((adminResult) => {
        console.log('Email para admin enviado com sucesso:', adminResult);
        
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
        }, 1000);
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
    "UI/UX Design",
    "Web Development",
    "Mobile Apps",
    "E-commerce",
    "Sistema Personalizado",
    "Consultoria"
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16" data-animation="fade-in-smooth">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6" data-animation="slide-left-smooth">
            <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Vamos Conversar</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8" data-animation="fade-in-smooth">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Inicie seu
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projeto
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed" data-animation="fade-in-smooth">
            Conte-nos sobre sua ideia e vamos transformá-la em realidade juntos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-8" data-animation="slide-up-smooth">
            <form onSubmit={handleSubmit} className="space-y-6" data-animation="fade-in-smooth">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                    className="bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">E-mail *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Telefone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(91) 99601-4545"
                    className="bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de Projeto *</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 text-slate-700 dark:text-slate-300 transition-all duration-300"
                  >
                    <option value="">Selecione...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Mensagem *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Descreva seu projeto e necessidades..."
                  rows={4}
                  className="bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Solicitação"}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            
            <div className="text-center mt-8 pt-8 border-t border-slate-200 dark:border-slate-700" data-animation="fade-in-up">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Ou fale conosco via:</span>
              <Button
                variant="outline"
                size="lg"
                className="ml-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </Button>
            </div>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8" data-animation="slide-right-smooth">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informações de Contato</h3>
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/70 transition-all duration-300 group" data-animation="fade-in-smooth">
                  <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-white">{info.title}</h4>
                    {info.action ? (
                      <a href={info.action} className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {info.content}
                      </a>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">{info.content}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="text-center p-4 bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">24h</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Resposta</div>
              </div>
              <div className="text-center p-4 bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};