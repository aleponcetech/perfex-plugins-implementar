import { Trophy, Target, BookOpen } from "lucide-react";

export const RoadmapHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-primary p-4 rounded-full shadow-glow">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </div>
      
      <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
        Roadmap Perfex CRM
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Roadmap visual para análise e implantação de plugins para Perfex CRM
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-success rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-6 h-6 text-white mr-2" />
            <span className="font-semibold text-white">ALTA Prioridade</span>
          </div>
          <p className="text-sm text-white/90">
            Essencial para a maioria das empresas. Foco em segurança, finanças e funcionalidades centrais.
          </p>
        </div>
        
        <div className="bg-gradient-warning rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-6 h-6 text-white mr-2" />
            <span className="font-semibold text-white">MÉDIA Prioridade</span>
          </div>
          <p className="text-sm text-white/90">
            Adiciona grande valor e eficiência. Ideal para automação e otimização de processos.
          </p>
        </div>
        
        <div className="bg-info rounded-lg p-4">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="w-6 h-6 text-white mr-2" />
            <span className="font-semibold text-white">BAIXA Prioridade</span>
          </div>
          <p className="text-sm text-white/90">
            Melhorias de nicho ou estéticas. "Bons de ter" após implementar as prioridades maiores.
          </p>
        </div>
      </div>
    </div>
  );
};