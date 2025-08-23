import { Trophy, Star, Target, Zap, Award, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRoadmapData } from "@/hooks/useRoadmapData";

export const Achievements = () => {
  const { categories, userProgress } = useRoadmapData();
  
  const allPlugins = categories.flatMap(cat => cat.plugins);
  const completedPlugins = allPlugins.filter(p => p.completed);
  const highPriorityCompleted = completedPlugins.filter(p => p.priority === 'ALTA').length;
  const categoriesCompleted = categories.filter(cat => 
    cat.plugins.every(plugin => plugin.completed)
  ).length;

  const achievements = [
    {
      id: 'first-plugin',
      title: 'Primeiro Passo',
      description: 'Complete seu primeiro plugin',
      icon: Target,
      unlocked: completedPlugins.length >= 1,
      progress: Math.min(completedPlugins.length, 1),
      total: 1,
      points: 10,
      rarity: 'common' as const,
    },
    {
      id: 'security-expert',
      title: 'Especialista em Segurança',
      description: 'Complete todos os plugins de Administração e Segurança',
      icon: Trophy,
      unlocked: categories.find(cat => cat.name.includes('Administração'))?.plugins.every(p => p.completed) || false,
      progress: categories.find(cat => cat.name.includes('Administração'))?.plugins.filter(p => p.completed).length || 0,
      total: categories.find(cat => cat.name.includes('Administração'))?.plugins.length || 1,
      points: 50,
      rarity: 'rare' as const,
    },
    {
      id: 'high-priority-master',
      title: 'Mestre da Prioridade',
      description: 'Complete 5 plugins de alta prioridade',
      icon: Star,
      unlocked: highPriorityCompleted >= 5,
      progress: highPriorityCompleted,
      total: 5,
      points: 75,
      rarity: 'epic' as const,
    },
    {
      id: 'speed-runner',
      title: 'Velocista',
      description: 'Complete 3 plugins no mesmo dia',
      icon: Zap,
      unlocked: false, // Implementação simplificada
      progress: 0,
      total: 3,
      points: 30,
      rarity: 'rare' as const,
    },
    {
      id: 'completionist',
      title: 'Completista',
      description: 'Complete todas as categorias',
      icon: Award,
      unlocked: categoriesCompleted === categories.length,
      progress: categoriesCompleted,
      total: categories.length,
      points: 200,
      rarity: 'legendary' as const,
    },
    {
      id: 'automation-expert',
      title: 'Guru da Automação',
      description: 'Complete todos os plugins de Automação e Integrações',
      icon: Clock,
      unlocked: categories.find(cat => cat.name.includes('Automação'))?.plugins.every(p => p.completed) || false,
      progress: categories.find(cat => cat.name.includes('Automação'))?.plugins.filter(p => p.completed).length || 0,
      total: categories.find(cat => cat.name.includes('Automação'))?.plugins.length || 1,
      points: 60,
      rarity: 'epic' as const,
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getLevel = (points: number) => {
    if (points < 50) return { level: 1, name: 'Iniciante' };
    if (points < 150) return { level: 2, name: 'Aprendiz' };
    if (points < 300) return { level: 3, name: 'Especialista' };
    if (points < 500) return { level: 4, name: 'Mestre' };
    return { level: 5, name: 'Lenda' };
  };

  const currentLevel = getLevel(totalPoints);
  const nextLevelPoints = [50, 150, 300, 500, 1000][currentLevel.level - 1] || 1000;
  const levelProgress = ((totalPoints % nextLevelPoints) / nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Conquistas</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Acompanhe seu progresso e desbloqueie conquistas especiais
          </p>
        </div>

        {/* Status do Jogador */}
        <Card className="p-6 mb-8 bg-gradient-primary text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Nível {currentLevel.level} - {currentLevel.name}</h2>
              <p className="opacity-90">{totalPoints} pontos ganhos</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{unlockedAchievements.length}</div>
              <div className="text-sm opacity-90">Conquistas desbloqueadas</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso para o próximo nível</span>
              <span>{totalPoints}/{nextLevelPoints}</span>
            </div>
            <Progress value={levelProgress} className="h-2 bg-white/20" />
          </div>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completedPlugins.length}</div>
            <div className="text-sm text-muted-foreground">Plugins Completados</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{highPriorityCompleted}</div>
            <div className="text-sm text-muted-foreground">Alta Prioridade</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{categoriesCompleted}</div>
            <div className="text-sm text-muted-foreground">Categorias Completas</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-info">{Math.round((completedPlugins.length / allPlugins.length) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Progresso Total</div>
          </Card>
        </div>

        {/* Lista de Conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map(achievement => (
            <Card
              key={achievement.id}
              className={`p-6 transition-all ${
                achievement.unlocked 
                  ? 'bg-card border-border shadow-md' 
                  : 'bg-muted/50 border-muted opacity-70'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </h3>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    {achievement.unlocked && (
                      <Badge variant="secondary">
                        +{achievement.points} pts
                      </Badge>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {achievement.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={achievement.unlocked ? '' : 'text-muted-foreground'}>
                        Progresso
                      </span>
                      <span className={achievement.unlocked ? '' : 'text-muted-foreground'}>
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.total) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};