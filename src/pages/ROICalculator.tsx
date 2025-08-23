import { useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRoadmapData } from "@/hooks/useRoadmapData";

export const ROICalculator = () => {
  const { categories } = useRoadmapData();
  const [teamSize, setTeamSize] = useState(5);
  const [avgSalary, setAvgSalary] = useState(5000);
  const [workingHours, setWorkingHours] = useState(8);
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);

  const allPlugins = categories.flatMap(category => 
    category.plugins.map(plugin => ({
      ...plugin,
      categoryName: category.name,
      id: `${category.id}-${plugin.name}`,
    }))
  );

  const calculations = useMemo(() => {
    const hourlyRate = avgSalary / (workingHours * 22); // 22 dias úteis no mês
    
    const selectedPluginData = allPlugins.filter(plugin => 
      selectedPlugins.includes(plugin.id)
    );

    const totalImplementationCost = selectedPluginData.reduce((acc, plugin) => {
      const hours = plugin.estimatedHours || 8;
      return acc + (hours * hourlyRate);
    }, 0);

    // Estimativa de economia baseada no tipo de plugin
    const monthlySavings = selectedPluginData.reduce((acc, plugin) => {
      let savingsMultiplier = 0;
      
      // Automação e produtividade
      if (plugin.categoryName.includes('Produtividade') || plugin.categoryName.includes('Automação')) {
        savingsMultiplier = 0.15; // 15% de economia no tempo
      }
      // Segurança e backup
      else if (plugin.categoryName.includes('Segurança') || plugin.categoryName.includes('Administração')) {
        savingsMultiplier = 0.1; // 10% economia em riscos evitados
      }
      // Financeiro
      else if (plugin.categoryName.includes('Financeiro')) {
        savingsMultiplier = 0.12; // 12% economia em processos financeiros
      }
      // CRM e vendas
      else if (plugin.categoryName.includes('CRM') || plugin.categoryName.includes('Vendas')) {
        savingsMultiplier = 0.08; // 8% aumento de eficiência
      }
      // Outros
      else {
        savingsMultiplier = 0.05; // 5% economia geral
      }

      return acc + (teamSize * avgSalary * savingsMultiplier);
    }, 0);

    const paybackMonths = monthlySavings > 0 ? totalImplementationCost / monthlySavings : 0;
    const annualSavings = monthlySavings * 12;
    const roiPercentage = totalImplementationCost > 0 ? ((annualSavings - totalImplementationCost) / totalImplementationCost) * 100 : 0;

    return {
      totalImplementationCost,
      monthlySavings,
      annualSavings,
      paybackMonths,
      roiPercentage,
      selectedCount: selectedPluginData.length,
    };
  }, [selectedPlugins, teamSize, avgSalary, workingHours, allPlugins]);

  const togglePlugin = (pluginId: string) => {
    setSelectedPlugins(prev => 
      prev.includes(pluginId) 
        ? prev.filter(id => id !== pluginId)
        : [...prev, pluginId]
    );
  };

  const selectAllByPriority = (priority: string) => {
    const pluginsOfPriority = allPlugins
      .filter(plugin => plugin.priority === priority)
      .map(plugin => plugin.id);
    
    setSelectedPlugins(prev => {
      const newSelection = new Set([...prev, ...pluginsOfPriority]);
      return Array.from(newSelection);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calculator className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Calculadora de ROI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calcule o retorno do investimento dos plugins selecionados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configurações */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Configurações da Empresa</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamSize">Tamanho da Equipe</Label>
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="avgSalary">Salário Médio Mensal (R$)</Label>
                <Input
                  id="avgSalary"
                  type="number"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="workingHours">Horas de Trabalho/Dia</Label>
                <Input
                  id="workingHours"
                  type="number"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(Number(e.target.value))}
                  min="1"
                  max="12"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Seleção Rápida</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectAllByPriority('ALTA')}
                  className="w-full text-left justify-start"
                >
                  Todos os plugins ALTA prioridade
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectAllByPriority('MÉDIA')}
                  className="w-full text-left justify-start"
                >
                  Todos os plugins MÉDIA prioridade
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPlugins([])}
                  className="w-full text-left justify-start"
                >
                  Limpar seleção
                </Button>
              </div>
            </div>
          </Card>

          {/* Seleção de Plugins */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Selecionar Plugins ({calculations.selectedCount} selecionados)
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allPlugins.map(plugin => (
                <div
                  key={plugin.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedPlugins.includes(plugin.id)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }`}
                  onClick={() => togglePlugin(plugin.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{plugin.name}</h3>
                      <div className="flex gap-1 mt-1">
                        <Badge size="sm" variant="outline">
                          {plugin.priority}
                        </Badge>
                        <Badge size="sm" variant="outline">
                          {plugin.categoryName}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {plugin.estimatedHours || 8}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resultados */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Análise de ROI</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Custo de Implementação</p>
                  <p className="font-bold text-destructive">
                    R$ {calculations.totalImplementationCost.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Economia Mensal</p>
                  <p className="font-bold text-success">
                    R$ {calculations.monthlySavings.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-info/10 rounded-lg">
                <Clock className="w-5 h-5 text-info" />
                <div>
                  <p className="text-sm text-muted-foreground">Payback</p>
                  <p className="font-bold text-info">
                    {calculations.paybackMonths > 0 
                      ? `${calculations.paybackMonths.toFixed(1)} meses`
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-primary rounded-lg text-white">
                <p className="text-sm opacity-90">ROI Anual</p>
                <p className="text-2xl font-bold">
                  {calculations.roiPercentage > 0 
                    ? `+${calculations.roiPercentage.toFixed(1)}%`
                    : 'N/A'
                  }
                </p>
                <p className="text-xs opacity-80 mt-1">
                  Economia anual: R$ {calculations.annualSavings.toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </p>
              </div>
            </div>

            {calculations.selectedCount === 0 && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Selecione plugins para ver a análise de ROI
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};