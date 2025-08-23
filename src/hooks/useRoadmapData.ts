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