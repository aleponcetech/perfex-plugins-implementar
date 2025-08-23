import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Priority, PluginCost, SetupTime, ROI } from "@/types/roadmap";

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPriorities: Priority[];
  setSelectedPriorities: (priorities: Priority[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedCosts: PluginCost[];
  setSelectedCosts: (costs: PluginCost[]) => void;
  selectedTimes: SetupTime[];
  setSelectedTimes: (times: SetupTime[]) => void;
  selectedROI: ROI[];
  setSelectedROI: (roi: ROI[]) => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
  availableCategories: { id: string; name: string }[];
}

export const FilterPanel = ({
  searchTerm,
  setSearchTerm,
  selectedPriorities,
  setSelectedPriorities,
  selectedCategories,
  setSelectedCategories,
  selectedCosts,
  setSelectedCosts,
  selectedTimes,
  setSelectedTimes,
  selectedROI,
  setSelectedROI,
  showCompleted,
  setShowCompleted,
  availableCategories,
}: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorities: Priority[] = ['ALTA', 'MÉDIA', 'BAIXA'];
  const costs: PluginCost[] = ['BAIXO', 'MÉDIO', 'ALTO'];
  const times: SetupTime[] = ['RÁPIDO', 'MÉDIO', 'COMPLEXO'];
  const rois: ROI[] = ['ALTO', 'MÉDIO', 'BAIXO'];

  const toggleFilter = <T,>(item: T, selected: T[], setter: (items: T[]) => void) => {
    if (selected.includes(item)) {
      setter(selected.filter(i => i !== item));
    } else {
      setter([...selected, item]);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedPriorities([]);
    setSelectedCategories([]);
    setSelectedCosts([]);
    setSelectedTimes([]);
    setSelectedROI([]);
    setShowCompleted(true);
  };

  const hasActiveFilters = searchTerm || selectedPriorities.length > 0 || 
    selectedCategories.length > 0 || selectedCosts.length > 0 || 
    selectedTimes.length > 0 || selectedROI.length > 0 || !showCompleted;

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar plugins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {[selectedPriorities, selectedCategories, selectedCosts, selectedTimes, selectedROI]
                .reduce((acc, arr) => acc + arr.length, 0) + (searchTerm ? 1 : 0) + (!showCompleted ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearAllFilters} size="sm">
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Prioridade</label>
              <div className="flex flex-wrap gap-1">
                {priorities.map(priority => (
                  <Badge
                    key={priority}
                    variant={selectedPriorities.includes(priority) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(priority, selectedPriorities, setSelectedPriorities)}
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <div className="flex flex-wrap gap-1">
                {availableCategories.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleFilter(category.id, selectedCategories, setSelectedCategories)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Custo</label>
              <div className="flex flex-wrap gap-1">
                {costs.map(cost => (
                  <Badge
                    key={cost}
                    variant={selectedCosts.includes(cost) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(cost, selectedCosts, setSelectedCosts)}
                  >
                    {cost}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tempo</label>
              <div className="flex flex-wrap gap-1">
                {times.map(time => (
                  <Badge
                    key={time}
                    variant={selectedTimes.includes(time) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(time, selectedTimes, setSelectedTimes)}
                  >
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">ROI</label>
              <div className="flex gap-1">
                {rois.map(roi => (
                  <Badge
                    key={roi}
                    variant={selectedROI.includes(roi) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleFilter(roi, selectedROI, setSelectedROI)}
                  >
                    {roi}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showCompleted"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showCompleted" className="text-sm font-medium">
                Mostrar concluídos
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};