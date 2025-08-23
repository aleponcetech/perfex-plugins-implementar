import { useState } from "react";
import { Settings as SettingsIcon, Download, Upload, Trash2, Save, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRoadmapData } from "@/hooks/useRoadmapData";

export const Settings = () => {
  const { resetData } = useRoadmapData();
  const { toast } = useToast();
  const [notes, setNotes] = useState(localStorage.getItem('roadmap-notes') || '');
  const [backupName, setBackupName] = useState('');

  const exportData = () => {
    const data = {
      categories: localStorage.getItem('roadmap-categories'),
      userProgress: localStorage.getItem('roadmap-user-progress'),
      notes: localStorage.getItem('roadmap-notes'),
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `roadmap-backup-${backupName || 'backup'}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Backup criado",
      description: "Seus dados foram exportados com sucesso.",
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.categories) {
          localStorage.setItem('roadmap-categories', data.categories);
        }
        if (data.userProgress) {
          localStorage.setItem('roadmap-user-progress', data.userProgress);
        }
        if (data.notes) {
          localStorage.setItem('roadmap-notes', data.notes);
          setNotes(data.notes);
        }
        
        // Recarregar a página para aplicar as mudanças
        window.location.reload();
        
        toast({
          title: "Dados importados",
          description: "Backup restaurado com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Arquivo de backup inválido.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const saveNotes = () => {
    localStorage.setItem('roadmap-notes', notes);
    toast({
      title: "Notas salvas",
      description: "Suas anotações foram salvas com sucesso.",
    });
  };

  const clearAllData = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('roadmap-categories');
      localStorage.removeItem('roadmap-user-progress');
      localStorage.removeItem('roadmap-notes');
      resetData();
      setNotes('');
      
      toast({
        title: "Dados apagados",
        description: "Todos os dados foram removidos.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <SettingsIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Configurações</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gerencie seus dados, backups e configurações pessoais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Backup e Restauração */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Backup e Restauração</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="backupName">Nome do Backup (opcional)</Label>
                <Input
                  id="backupName"
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                  placeholder="Meu backup do projeto"
                />
              </div>
              
              <Button onClick={exportData} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
              
              <div>
                <Label htmlFor="importFile">Importar Backup</Label>
                <Input
                  id="importFile"
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="cursor-pointer"
                />
              </div>

              <Button 
                onClick={() => {
                  if (confirm('Isso irá restaurar todos os 36 plugins originais distribuídos corretamente por prioridades. Continuar?')) {
                    resetData();
                    window.location.reload();
                    toast({
                      title: "Dados restaurados",
                      description: "Todos os plugins foram restaurados com distribuição correta de prioridades.",
                    });
                  }
                }}
                className="w-full"
                variant="outline"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Restaurar Plugins Originais
              </Button>
            </div>
          </Card>

          {/* Notas Pessoais */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Notas Pessoais</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Suas Anotações</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adicione suas observações, lembretes ou estratégias aqui..."
                  rows={8}
                  className="resize-none"
                />
              </div>
              
              <Button onClick={saveNotes} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Salvar Notas
              </Button>
            </div>
          </Card>

          {/* Informações do Sistema */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Informações do Sistema</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Versão:</span>
                <span className="font-mono">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Dados salvos em:</span>
                <span>LocalStorage</span>
              </div>
              <div className="flex justify-between">
                <span>Último backup:</span>
                <span>{localStorage.getItem('last-backup') || 'Nunca'}</span>
              </div>
            </div>
          </Card>

          {/* Zona de Perigo */}
          <Card className="p-6 border-destructive">
            <h2 className="text-xl font-bold mb-4 text-destructive">Zona de Perigo</h2>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Esta ação removerá permanentemente todos os seus dados, incluindo progresso, 
                configurações e notas. Certifique-se de fazer um backup antes.
              </p>
              
              <Button 
                variant="destructive" 
                onClick={clearAllData}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Apagar Todos os Dados
              </Button>
            </div>
          </Card>
        </div>

        {/* Dicas de Uso */}
        <Card className="p-6 mt-8 bg-muted/50">
          <h2 className="text-lg font-bold mb-3">💡 Dicas de Uso</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Faça backups regulares para não perder seu progresso</li>
            <li>• Use as notas para documentar decisões e observações importantes</li>
            <li>• Você pode importar/exportar dados entre diferentes dispositivos</li>
            <li>• Os dados são salvos localmente no seu navegador</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Settings;