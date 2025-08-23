import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { RoadmapHeader } from "@/components/RoadmapHeader";
import { RoadmapStats } from "@/components/RoadmapStats";
import { CategoryCard } from "@/components/CategoryCard";
import { FilterPanel } from "@/components/FilterPanel";
import { Button } from "@/components/ui/button";
import { useRoadmapData } from "@/hooks/useRoadmapData";
import { useToast } from "@/hooks/use-toast";
import { Priority, PluginCost, SetupTime, ROI } from "@/types/roadmap";

const Index = () => {
  const { categories, togglePlugin, resetData } = useRoadmapData();
  const { toast } = useToast();

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<PluginCost[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<SetupTime[]>([]);
  const [selectedROI, setSelectedROI] = useState<ROI[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // Filtrar categorias e plugins
  const filteredCategories = categories.map(category => {
    const filteredPlugins = category.plugins.filter(plugin => {
      // Filtro de busca
      if (searchTerm && !plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !plugin.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro de prioridade
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(plugin.priority)) {
        return false;
      }

      // Filtro de custo
      if (selectedCosts.length > 0 && plugin.cost && !selectedCosts.includes(plugin.cost)) {
        return false;
      }

      // Filtro de tempo
      if (selectedTimes.length > 0 && plugin.setupTime && !selectedTimes.includes(plugin.setupTime)) {
        return false;
      }

      // Filtro de ROI
      if (selectedROI.length > 0 && plugin.roi && !selectedROI.includes(plugin.roi)) {
        return false;
      }

      // Filtro de concluídos
      if (!showCompleted && plugin.completed) {
        return false;
      }

      return true;
    });

    return {
      ...category,
      plugins: filteredPlugins,
    };
  }).filter(category => {
    // Filtro de categoria
    if (selectedCategories.length > 0 && !selectedCategories.includes(category.id)) {
      return false;
    }
    
    // Só mostrar categorias que tenham plugins após filtrar
    return category.plugins.length > 0;
  });

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
        
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedCosts={selectedCosts}
          setSelectedCosts={setSelectedCosts}
          selectedTimes={selectedTimes}
          setSelectedTimes={setSelectedTimes}
          selectedROI={selectedROI}
          setSelectedROI={setSelectedROI}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
          availableCategories={categories.map(cat => ({ id: cat.id, name: cat.name }))}
        />
        
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
        
        <RoadmapStats categories={filteredCategories} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPluginToggle={togglePlugin}
            />
          ))}
        </div>
        
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum plugin encontrado com os filtros aplicados.
            </p>
          </div>
        )}
        
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
