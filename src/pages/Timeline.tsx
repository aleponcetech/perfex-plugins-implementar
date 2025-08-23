import { useState } from "react";
import { Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmapData } from "@/hooks/useRoadmapData";
import { Priority } from "@/types/roadmap";

export const Timeline = () => {
  const { categories } = useRoadmapData();
  const [selectedPhase, setSelectedPhase] = useState<'foundation' | 'optimization' | 'refinement' | 'all'>('all');

  const allPlugins = categories.flatMap(category => 
    category.plugins.map(plugin => ({
      ...plugin,
      categoryName: category.name,
      categoryColor: category.color,
    }))
  );

  const getPhasePlugins = (priority: Priority) => {
    return allPlugins.filter(plugin => plugin.priority === priority);
  };

  const phases = [
    {
      id: 'foundation' as const,
      name: 'Fase 1 - Fundação',
      description: 'Plugins essenciais de prioridade ALTA',
      priority: 'ALTA' as Priority,
      color: 'success',
      icon: AlertTriangle,
      plugins: getPhasePlugins('ALTA'),
    },
    {
      id: 'optimization' as const,
      name: 'Fase 2 - Otimização',
      description: 'Plugins de automação e eficiência - MÉDIA prioridade',
      priority: 'MÉDIA' as Priority,
      color: 'warning',
      icon: Clock,
      plugins: getPhasePlugins('MÉDIA'),
    },
    {
      id: 'refinement' as const,
      name: 'Fase 3 - Refinamento',
      description: 'Melhorias e funcionalidades extras - BAIXA prioridade',
      priority: 'BAIXA' as Priority,
      color: 'info',
      icon: CheckCircle2,
      plugins: getPhasePlugins('BAIXA'),
    },
  ];

  const filteredPhases = selectedPhase === 'all' ? phases : phases.filter(phase => phase.id === selectedPhase);

  const getEstimatedDuration = (plugins: typeof allPlugins) => {
    const totalHours = plugins.reduce((acc, plugin) => acc + (plugin.estimatedHours || 8), 0);
    const weeks = Math.ceil(totalHours / 40); // 40 horas por semana
    return `${weeks} semana${weeks > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Timeline de Implementação</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visualize o cronograma recomendado para implementação dos plugins
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {['all', 'foundation', 'optimization', 'refinement'].map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedPhase === phase
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {phase === 'all' ? 'Todas as Fases' : 
                 phase === 'foundation' ? 'Fundação' :
                 phase === 'optimization' ? 'Otimização' : 'Refinamento'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredPhases.map((phase, phaseIndex) => {
            const completedPlugins = phase.plugins.filter(p => p.completed).length;
            const progress = phase.plugins.length > 0 ? (completedPlugins / phase.plugins.length) * 100 : 0;
            
            return (
              <Card key={phase.id} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-${phase.color}`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{phase.name}</h2>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-2">
                      {completedPlugins}/{phase.plugins.length} concluídos
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Duração estimada: {getEstimatedDuration(phase.plugins)}
                    </div>
                  </div>
                </div>

                <Progress value={progress} className="h-3 mb-6" />

                <div className="grid gap-4">
                  {phase.plugins.map((plugin, pluginIndex) => (
                    <div
                      key={`${plugin.categoryName}-${pluginIndex}`}
                      className={`p-4 rounded-lg border transition-all ${
                        plugin.completed
                          ? 'bg-success/10 border-success/20'
                          : 'bg-card border-border hover:border-primary/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-3 h-3 rounded-full`}
                              style={{ backgroundColor: plugin.categoryColor }}
                            />
                            <h3 className={`font-semibold ${plugin.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {plugin.name}
                            </h3>
                            <Badge variant="outline" size="sm">
                              {plugin.categoryName}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {plugin.description}
                          </p>
                          <div className="flex gap-2">
                            {plugin.cost && (
                              <Badge variant="outline" size="sm">
                                Custo: {plugin.cost}
                              </Badge>
                            )}
                            {plugin.setupTime && (
                              <Badge variant="outline" size="sm">
                                Setup: {plugin.setupTime}
                              </Badge>
                            )}
                            {plugin.roi && (
                              <Badge variant="outline" size="sm">
                                ROI: {plugin.roi}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {plugin.estimatedHours || 8}h estimadas
                          </div>
                          {plugin.completed && plugin.completedDate && (
                            <div className="text-xs text-success mt-1">
                              ✓ Concluído em {new Date(plugin.completedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};