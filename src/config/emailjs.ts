// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // Your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Your EmailJS template ID
  PUBLIC_KEY: 'your_public_key', // Your EmailJS public key
  TO_EMAIL: 'seu@email.com', // Your email address
  TO_NAME: 'SoftwarePro' // Your name or company name
};

// EmailJS Template Variables
export interface EmailTemplateParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone: string;
  project_type: string;
  budget: string;
  description: string;
  deadline: string;
  to_email: string;
  to_name: string;
}

// Example EmailJS Template:
/*
Subject: Novo Orçamento - {{from_name}}

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{phone}}
Tipo de Projeto: {{project_type}}
Orçamento: {{budget}}
Prazo: {{deadline}}

Descrição do Projeto:
{{description}}

---
Enviado via SoftwarePro Chatbot
*/ 