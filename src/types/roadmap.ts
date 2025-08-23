export type Priority = 'ALTA' | 'MÉDIA' | 'BAIXA';

export interface Plugin {
  name: string;
  description: string;
  priority: Priority;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  plugins: Plugin[];
}

export const roadmapData: Category[] = [
  {
    id: 'admin-security',
    name: 'Administração e Segurança',
    description: 'Módulos que garantem a integridade, segurança e personalização básica do seu CRM.',
    plugins: [
      {
        name: 'Flexible Backup and Restore',
        description: 'Cria e restaura backups completos do seu CRM, garantindo a segurança dos dados.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'PerfShield - Security Toolset',
        description: 'Adiciona múltiplas camadas de segurança para proteger seu CRM contra ataques e vulnerabilidades.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'PDF Customizer Module',
        description: 'Permite personalizar o design de documentos PDF, como faturas e orçamentos.',
        priority: 'BAIXA',
        completed: false
      }
    ]
  },
  {
    id: 'financial',
    name: 'Gestão Financeira e Faturamento',
    description: 'Cruciais para a saúde financeira do negócio, automatizando cobranças, compras e contabilidade.',
    plugins: [
      {
        name: 'Accounting and Bookkeeping',
        description: 'Módulo completo de contabilidade, com balanços, livro-razão e relatórios financeiros.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Purchase Management',
        description: 'Gerencia todo o ciclo de compras, desde ordens de compra até o gerenciamento de fornecedores.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Subscription as Products',
        description: 'Permite vender produtos como assinaturas com faturamento recorrente.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Coinbase Crypto Payment Gateway',
        description: 'Integra a Coinbase para aceitar pagamentos em criptomoedas.',
        priority: 'BAIXA',
        completed: false
      },
      {
        name: 'Invoice Templates',
        description: 'Oferece modelos de faturas com design profissional.',
        priority: 'BAIXA',
        completed: false
      }
    ]
  },
  {
    id: 'crm',
    name: 'Gestão de Clientes e Vendas (Core CRM)',
    description: 'Melhora a forma como você interage, gerencia e adquire clientes.',
    plugins: [
      {
        name: 'Account Management Advancements',
        description: 'Aprimora a gestão de contas de clientes com mais campos, segmentação e relatórios.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Customer Service Management',
        description: 'Módulo para gerenciar o atendimento ao cliente, com SLAs, relatórios e satisfação do cliente.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Omni Channel Sales',
        description: 'Centraliza vendas de diferentes canais (e-commerce, marketplaces) dentro do Perfex.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Web to Customer Registration',
        description: 'Cria formulários para que visitantes do site se registrem diretamente como clientes no CRM.',
        priority: 'MÉDIA',
        completed: false
      }
    ]
  },
  {
    id: 'productivity',
    name: 'Produtividade e Gestão da Equipe',
    description: 'Ferramentas para otimizar o trabalho da equipe, a colaboração e a gestão de conhecimento.',
    plugins: [
      {
        name: 'Team Password',
        description: 'Um cofre de senhas seguro e compartilhado para a sua equipe.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Google Sheets Module (Two-Way Sync)',
        description: 'Sincronização bidirecional entre módulos do Perfex (ex: Clientes) e planilhas do Google.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Advanced Email System',
        description: 'Melhora o sistema de e-mail interno com templates, rastreamento e automações.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Document Management Module',
        description: 'Sistema para gerenciar, compartilhar e versionar documentos internos e de clientes.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Project Templates',
        description: 'Permite criar modelos de projetos para agilizar a criação de novos trabalhos.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Reminder Module',
        description: 'Sistema avançado de lembretes para tarefas, faturas, compromissos, etc.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'PerfexWiki - Internal Knowledge',
        description: 'Cria uma base de conhecimento (wiki) interna para documentar processos e informações.',
        priority: 'MÉDIA',
        completed: false
      }
    ]
  },
  {
    id: 'appointments',
    name: 'Agendamentos e Compromissos',
    description: 'Essencial para empresas que dependem de agendamentos com clientes.',
    plugins: [
      {
        name: 'Appointly - Appointments',
        description: 'Sistema completo de agendamento de compromissos com integração ao Google Calendar.',
        priority: 'ALTA',
        completed: false
      },
      {
        name: 'Appointment Module',
        description: 'Alternativa para gerenciamento de agendamentos.',
        priority: 'ALTA',
        completed: false
      }
    ]
  },
  {
    id: 'automation',
    name: 'Automação e Integrações',
    description: 'Conecte seu CRM a outras ferramentas essenciais para automatizar fluxos de trabalho.',
    plugins: [
      {
        name: 'Mautic Automated Marketing',
        description: 'Integra o Perfex com o Mautic para automação de marketing.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Slack Alert Module',
        description: 'Envia notificações importantes do CRM diretamente para canais do Slack.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Perfex CRM and TelegramBot Chat',
        description: 'Integração com o Telegram para notificações e interações via bot.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'MeetLink Manager',
        description: 'Gerencia e cria links de reuniões (Zoom, Google Meet) diretamente do CRM.',
        priority: 'MÉDIA',
        completed: false
      }
    ]
  },
  {
    id: 'operations',
    name: 'Gestão de Operações e Serviços',
    description: 'Módulos específicos para empresas que gerenciam ativos, equipamentos ou serviços técnicos.',
    plugins: [
      {
        name: 'Assets Management Module',
        description: 'Gerenciamento de ativos da empresa ou de clientes (equipamentos, licenças, etc.).',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'AssetCentral - Assets Management',
        description: 'Alternativa para gerenciamento de ativos, com foco diferente.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Service Management Module',
        description: 'Gestão de serviços, ordens de serviço e contratos de manutenção.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Fixed Equipment Management',
        description: 'Rastreamento e gerenciamento de equipamentos fixos, incluindo manutenções e depreciação.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Manufacturing Management',
        description: 'Módulo para gerenciar o ciclo de produção industrial.',
        priority: 'BAIXA',
        completed: false
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing e Geração de Leads',
    description: 'Ferramentas para capturar a atenção de visitantes e convertê-los em leads.',
    plugins: [
      {
        name: 'PerfexPopup - Popups Builder',
        description: 'Cria pop-ups personalizáveis para capturar leads ou exibir anúncios.',
        priority: 'MÉDIA',
        completed: false
      },
      {
        name: 'Bannercraft - Dynamic Banner',
        description: 'Gerencia e exibe banners dinâmicos dentro da área do cliente.',
        priority: 'BAIXA',
        completed: false
      }
    ]
  },
  {
    id: 'ui-ux',
    name: 'Interface e Experiência do Usuário (UI/UX)',
    description: 'Melhorias visuais para a interface do CRM.',
    plugins: [
      {
        name: 'Ultimate Dark Theme',
        description: 'Adiciona um tema escuro profissional ao Perfex CRM.',
        priority: 'BAIXA',
        completed: false
      },
      {
        name: 'Ultimate Purple Theme',
        description: 'Adiciona um tema roxo profissional ao Perfex CRM.',
        priority: 'BAIXA',
        completed: false
      }
    ]
  }
];