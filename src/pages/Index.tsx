import { RotateCcw } from "lucide-react";
import { RoadmapHeader } from "@/components/RoadmapHeader";
import { RoadmapStats } from "@/components/RoadmapStats";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { useRoadmapData } from "@/hooks/useRoadmapData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { categories, togglePlugin, resetData } = useRoadmapData();
  const { toast } = useToast();

  const handleReset = () => {
    resetData();
    toast({
      title: "Roadmap resetado",
      description: "Todos os plugins foram marcados como não completados.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <RoadmapHeader />
        
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Resetar Progresso
          </Button>
        </div>
        
        <RoadmapStats categories={categories} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPluginToggle={togglePlugin}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-gradient-secondary rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Sugestão de Implementação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-success rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Fase 1 - Fundação</h4>
                <p className="text-white/90">Foque nos plugins de prioridade ALTA primeiro</p>
              </div>
              <div className="bg-warning rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Fase 2 - Otimização</h4>
                <p className="text-white/90">Avance para os de prioridade MÉDIA</p>
              </div>
              <div className="bg-info rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Fase 3 - Refinamento</h4>
                <p className="text-white/90">Por último, analise os de prioridade BAIXA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
