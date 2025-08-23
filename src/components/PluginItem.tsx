import { CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Plugin } from "@/types/roadmap";
import { cn } from "@/lib/utils";

interface PluginItemProps {
  plugin: Plugin;
  onToggle: () => void;
}

export const PluginItem = ({ plugin, onToggle }: PluginItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'bg-success/20 text-success border-success/30';
      case 'MÉDIA':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'BAIXA':
        return 'bg-info/20 text-info border-info/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md",
        plugin.completed 
          ? "bg-success/5 border-success/20 hover:bg-success/10" 
          : "bg-background border-border hover:bg-accent/5"
      )}
      onClick={onToggle}
    >
      <div className="flex-shrink-0 mt-1">
        {plugin.completed ? (
          <CheckCircle2 className="w-5 h-5 text-success" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className={cn(
            "font-medium text-sm leading-5",
            plugin.completed ? "text-success line-through" : "text-foreground"
          )}>
            {plugin.name}
          </h4>
          <Badge variant="outline" className={cn("flex-shrink-0 text-xs", getPriorityColor(plugin.priority))}>
            {plugin.priority}
          </Badge>
        </div>
        
        <p className={cn(
          "text-sm leading-5",
          plugin.completed ? "text-muted-foreground" : "text-muted-foreground"
        )}>
          {plugin.description}
        </p>
      </div>
    </div>
  );
};