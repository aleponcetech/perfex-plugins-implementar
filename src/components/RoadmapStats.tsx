import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Category } from "@/types/roadmap";

interface RoadmapStatsProps {
  categories: Category[];
}

export const RoadmapStats = ({ categories }: RoadmapStatsProps) => {
  const allPlugins = categories.flatMap(category => category.plugins);
  const completedPlugins = allPlugins.filter(plugin => plugin.completed);
  const totalPlugins = allPlugins.length;
  const overallProgress = totalPlugins > 0 ? (completedPlugins.length / totalPlugins) * 100 : 0;

  const highPriorityPlugins = allPlugins.filter(p => p.priority === 'ALTA');
  const mediumPriorityPlugins = allPlugins.filter(p => p.priority === 'MÉDIA');
  const lowPriorityPlugins = allPlugins.filter(p => p.priority === 'BAIXA');

  const completedHighPriority = highPriorityPlugins.filter(p => p.completed).length;
  const completedMediumPriority = mediumPriorityPlugins.filter(p => p.completed).length;
  const completedLowPriority = lowPriorityPlugins.filter(p => p.completed).length;

  const highPriorityProgress = highPriorityPlugins.length > 0 ? (completedHighPriority / highPriorityPlugins.length) * 100 : 0;
  const mediumPriorityProgress = mediumPriorityPlugins.length > 0 ? (completedMediumPriority / mediumPriorityPlugins.length) * 100 : 0;
  const lowPriorityProgress = lowPriorityPlugins.length > 0 ? (completedLowPriority / lowPriorityPlugins.length) * 100 : 0;

  return (
    <div className="mb-8 space-y-6">
      <Card className="p-6 bg-gradient-secondary shadow-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Progresso Geral</h2>
          <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {Math.round(overallProgress)}%
          </div>
          <Progress value={overallProgress} className="h-3 max-w-md mx-auto" />
          <p className="text-muted-foreground mt-2">
            {completedPlugins.length} de {totalPlugins} plugins analisados
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-success bg-opacity-10 border-success/20">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-success">Prioridade ALTA</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                {completedHighPriority}/{highPriorityPlugins.length}
              </Badge>
            </div>
            <Progress value={highPriorityProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(highPriorityProgress)}% concluído
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-warning bg-opacity-10 border-warning/20">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-warning">Prioridade MÉDIA</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                {completedMediumPriority}/{mediumPriorityPlugins.length}
              </Badge>
            </div>
            <Progress value={mediumPriorityProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(mediumPriorityProgress)}% concluído
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-info bg-opacity-10 border-info/20">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-info" />
            <h3 className="font-semibold text-info">Prioridade BAIXA</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <Badge variant="outline" className="bg-info/20 text-info border-info/30">
                {completedLowPriority}/{lowPriorityPlugins.length}
              </Badge>
            </div>
            <Progress value={lowPriorityProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(lowPriorityProgress)}% concluído
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};