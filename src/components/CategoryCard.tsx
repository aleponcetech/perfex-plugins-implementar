import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PluginItem } from "./PluginItem";
import { Category } from "@/types/roadmap";

interface CategoryCardProps {
  category: Category;
  onPluginToggle: (categoryId: string, pluginIndex: number) => void;
}

export const CategoryCard = ({ category, onPluginToggle }: CategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const completedPlugins = category.plugins.filter(plugin => plugin.completed).length;
  const totalPlugins = category.plugins.length;
  const progressPercentage = totalPlugins > 0 ? (completedPlugins / totalPlugins) * 100 : 0;
  
  const highPriorityCount = category.plugins.filter(p => p.priority === 'ALTA').length;
  const mediumPriorityCount = category.plugins.filter(p => p.priority === 'MÉDIA').length;
  const lowPriorityCount = category.plugins.filter(p => p.priority === 'BAIXA').length;

  return (
    <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="p-6 hover:bg-accent/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-left">{category.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  {completedPlugins}/{totalPlugins}
                </Badge>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground text-left mb-4">{category.description}</p>
            
            <div className="space-y-3">
              <Progress value={progressPercentage} className="h-2" />
              
              <div className="flex gap-2 justify-center flex-wrap">
                {highPriorityCount > 0 && (
                  <Badge className="bg-success/20 text-success border-success/30">
                    {highPriorityCount} ALTA
                  </Badge>
                )}
                {mediumPriorityCount > 0 && (
                  <Badge className="bg-warning/20 text-warning border-warning/30">
                    {mediumPriorityCount} MÉDIA
                  </Badge>
                )}
                {lowPriorityCount > 0 && (
                  <Badge className="bg-info/20 text-info border-info/30">
                    {lowPriorityCount} BAIXA
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="border-t border-border">
            <div className="p-6 space-y-3">
              {category.plugins.map((plugin, index) => (
                <PluginItem
                  key={index}
                  plugin={plugin}
                  onToggle={() => onPluginToggle(category.id, index)}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};