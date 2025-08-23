import { useState, useEffect } from 'react';
import { Category, UserProgress } from '@/types/roadmap';

const initialCategories: Category[] = [
  {
    id: 'core-business',
    name: 'Core Business (CRM & Vendas)',
    description: 'Funcionalidades centrais do CRM para gestão de clientes e vendas',
    icon: 'users',
    color: '#3B82F6',
    plugins: [
      {
        name: 'Account Management Advancements',
        description: 'Aprimora a gestão de contas de clientes com mais campos, segmentação e relatórios.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 16,
      },
      {
        name: 'Customer Service Management',
        description: 'Módulo para gerenciar o atendimento ao cliente, com SLAs, relatórios e satisfação do cliente.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 24,
      },
      {
        name: 'Lead Management Pro',
        description: 'Sistema avançado de gestão de leads com scoring, nutrição e automação.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 20,
      },
      {
        name: 'Sales Pipeline Automation',
        description: 'Automação completa do pipeline de vendas com gatilhos e ações automáticas.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 32,
      },
    ],
  },
  {
    id: 'financial',
    name: 'Gestão Financeira',
    description: 'Módulos essenciais para controle financeiro, faturamento e contabilidade',
    icon: 'dollar-sign',
    color: '#10B981',
    plugins: [
      {
        name: 'Accounting and Bookkeeping',
        description: 'Módulo completo de contabilidade, com balanços, livro-razão e relatórios financeiros.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 40,
      },
      {
        name: 'Purchase Management',
        description: 'Gerencia todo o ciclo de compras, desde ordens de compra até o gerenciamento de fornecedores.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 20,
      },
      {
        name: 'Advanced Invoicing',
        description: 'Sistema avançado de faturamento com templates customizáveis e automação.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 18,
      },
      {
        name: 'Financial Reports Pro',
        description: 'Relatórios financeiros avançados com dashboards interativos e análises.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 24,
      },
      {
        name: 'Bank Integration',
        description: 'Integração bancária para conciliação automática e controle de fluxo de caixa.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 36,
      },
    ],
  },
  {
    id: 'project-management',
    name: 'Gestão de Projetos',
    description: 'Ferramentas completas para planejamento, execução e controle de projetos',
    icon: 'folder',
    color: '#8B5CF6',
    plugins: [
      {
        name: 'Project Planning Suite',
        description: 'Suite completa para planejamento de projetos com Gantt, recursos e dependências.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 48,
      },
      {
        name: 'Time Tracking Pro',
        description: 'Sistema avançado de controle de tempo com relatórios e análise de produtividade.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 22,
      },
      {
        name: 'Task Management Advanced',
        description: 'Gestão avançada de tarefas com workflows, automação e colaboração.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 28,
      },
      {
        name: 'Resource Management',
        description: 'Controle completo de recursos humanos e materiais em projetos.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'MÉDIO',
        estimatedHours: 35,
      },
    ],
  },
  {
    id: 'hr-management',
    name: 'Gestão de Recursos Humanos',
    description: 'Sistema completo para gestão de colaboradores e processos de RH',
    icon: 'user-check',
    color: '#F59E0B',
    plugins: [
      {
        name: 'Employee Management',
        description: 'Gestão completa de funcionários com cadastros, documentos e histórico.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 25,
      },
      {
        name: 'Payroll System',
        description: 'Sistema de folha de pagamento com cálculos automáticos e relatórios.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 45,
      },
      {
        name: 'Performance Evaluation',
        description: 'Sistema de avaliação de desempenho com metas e feedback.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 30,
      },
      {
        name: 'Training Management',
        description: 'Gestão de treinamentos e desenvolvimento de funcionários.',
        priority: 'BAIXA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 20,
      },
    ],
  },
  {
    id: 'communication',
    name: 'Comunicação & Marketing',
    description: 'Ferramentas para comunicação, marketing e relacionamento com clientes',
    icon: 'megaphone',
    color: '#EF4444',
    plugins: [
      {
        name: 'Email Marketing Pro',
        description: 'Plataforma completa de email marketing com automação e segmentação.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 38,
      },
      {
        name: 'SMS Integration',
        description: 'Integração SMS para campanhas e notificações automáticas.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 12,
      },
      {
        name: 'WhatsApp Business API',
        description: 'Integração oficial do WhatsApp Business para atendimento e marketing.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 18,
      },
      {
        name: 'Social Media Manager',
        description: 'Gestão e agendamento de posts em redes sociais.',
        priority: 'BAIXA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'BAIXO',
        estimatedHours: 26,
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Vendas Online',
    description: 'Módulos para vendas online, catálogos e gestão de e-commerce',
    icon: 'shopping-cart',
    color: '#06B6D4',
    plugins: [
      {
        name: 'Online Store Builder',
        description: 'Construtor de loja online integrado com catálogo e carrinho.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 50,
      },
      {
        name: 'Product Catalog Pro',
        description: 'Catálogo avançado de produtos com variações, estoque e preços.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 24,
      },
      {
        name: 'Payment Gateway Integration',
        description: 'Integração com múltiplos gateways de pagamento.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 16,
      },
      {
        name: 'Inventory Management',
        description: 'Controle avançado de estoque com alertas e relatórios.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 28,
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Análise & Relatórios',
    description: 'Business intelligence, dashboards e relatórios avançados',
    icon: 'bar-chart',
    color: '#84CC16',
    plugins: [
      {
        name: 'Business Intelligence Suite',
        description: 'Suite completa de BI com dashboards interativos e análises preditivas.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 55,
      },
      {
        name: 'Custom Reports Builder',
        description: 'Construtor de relatórios personalizados com drag-and-drop.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 32,
      },
      {
        name: 'KPI Dashboard',
        description: 'Dashboard de KPIs com métricas em tempo real.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 20,
      },
      {
        name: 'Data Export Suite',
        description: 'Ferramentas avançadas para exportação de dados em múltiplos formatos.',
        priority: 'BAIXA',
        completed: false,
        cost: 'BAIXO',
        setupTime: 'MÉDIO',
        roi: 'BAIXO',
        estimatedHours: 8,
      },
    ],
  },
  {
    id: 'automation',
    name: 'Automação & Integração',
    description: 'Workflows automáticos, integrações e APIs',
    icon: 'zap',
    color: '#A855F7',
    plugins: [
      {
        name: 'Workflow Automation',
        description: 'Sistema de workflows automáticos com gatilhos e ações personalizáveis.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 42,
      },
      {
        name: 'API Management',
        description: 'Gestão completa de APIs com documentação e controle de acesso.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'MÉDIO',
        estimatedHours: 35,
      },
      {
        name: 'Third-party Integrations',
        description: 'Hub de integrações com sistemas externos populares.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 30,
      },
      {
        name: 'Zapier Integration',
        description: 'Integração nativa com Zapier para conectar com 5000+ apps.',
        priority: 'BAIXA',
        completed: false,
        cost: 'BAIXO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 10,
      },
    ],
  },
  {
    id: 'security',
    name: 'Segurança & Compliance',
    description: 'Ferramentas de segurança, auditoria e conformidade',
    icon: 'shield',
    color: '#DC2626',
    plugins: [
      {
        name: 'Advanced Security Suite',
        description: 'Suite completa de segurança com 2FA, logs e monitoramento.',
        priority: 'ALTA',
        completed: false,
        cost: 'ALTO',
        setupTime: 'COMPLEXO',
        roi: 'ALTO',
        estimatedHours: 40,
      },
      {
        name: 'LGPD Compliance',
        description: 'Ferramentas para conformidade com LGPD e gestão de privacidade.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 22,
      },
      {
        name: 'Audit Trail',
        description: 'Sistema completo de auditoria com logs detalhados de ações.',
        priority: 'MÉDIA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'MÉDIO',
        estimatedHours: 18,
      },
      {
        name: 'Backup & Recovery',
        description: 'Sistema automático de backup e recuperação de dados.',
        priority: 'ALTA',
        completed: false,
        cost: 'MÉDIO',
        setupTime: 'MÉDIO',
        roi: 'ALTO',
        estimatedHours: 15,
      },
    ],
  },
];

const initialUserProgress: UserProgress = {
  totalPoints: 0,
  completedPlugins: 0,
  badges: [],
  streak: 0,
};

export const useRoadmapData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress);

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedCategories = localStorage.getItem('roadmap-categories');
    const savedUserProgress = localStorage.getItem('roadmap-user-progress');
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
    }
    
    if (savedUserProgress) {
      setUserProgress(JSON.parse(savedUserProgress));
    }
  }, []);

  // Salva no localStorage sempre que os dados mudam
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('roadmap-categories', JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('roadmap-user-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const togglePlugin = (categoryId: string, pluginIndex: number) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => {
        if (category.id === categoryId) {
          const newPlugins = [...category.plugins];
          const wasCompleted = newPlugins[pluginIndex].completed;
          newPlugins[pluginIndex] = {
            ...newPlugins[pluginIndex],
            completed: !wasCompleted,
            completedDate: !wasCompleted ? new Date().toISOString() : undefined,
          };
          
          // Atualizar progresso do usuário
          if (!wasCompleted) {
            setUserProgress(prev => ({
              ...prev,
              totalPoints: prev.totalPoints + 10,
              completedPlugins: prev.completedPlugins + 1,
            }));
          } else {
            setUserProgress(prev => ({
              ...prev,
              totalPoints: Math.max(0, prev.totalPoints - 10),
              completedPlugins: Math.max(0, prev.completedPlugins - 1),
            }));
          }
          
          return { ...category, plugins: newPlugins };
        }
        return category;
      });
      return newCategories;
    });
  };

  const resetData = () => {
    setCategories(initialCategories);
    setUserProgress(initialUserProgress);
    localStorage.removeItem('roadmap-categories');
    localStorage.removeItem('roadmap-user-progress');
  };

  return {
    categories,
    userProgress,
    togglePlugin,
    resetData,
  };
};