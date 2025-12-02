import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

const STORAGE_KEY = "custom_commands";

export default function Commands() {
  const [commands, setCommands] = useState([
    { id: 1, name: "/remember", trigger: "remember this", function: "Store memory" },
    { id: 2, name: "/clear", trigger: "clear memory", function: "Clear all memory" },
    { id: 3, name: "/sync", trigger: "sync now", function: "Sync memories" },
    { id: 4, name: "/search", trigger: "search for", function: "Search memories" },
  ]);
  const [cmdName, setCmdName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("Store memory");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCommands(JSON.parse(stored));
    }
  }, []);

  const handleCreate = () => {
    if (!cmdName || !trigger) {
      toast.error("Please fill in all fields");
      return;
    }

    const newCommand = {
      id: Date.now(),
      name: cmdName,
      trigger,
      function: selectedFunction,
    };

    const updatedCommands = [...commands, newCommand];
    setCommands(updatedCommands);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCommands));

    setCmdName("");
    setTrigger("");
    setSelectedFunction("Store memory");
    toast.success("✅ Command created successfully!");
  };

  const handleDelete = (id: number) => {
    const updatedCommands = commands.filter(cmd => cmd.id !== id);
    setCommands(updatedCommands);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCommands));
    toast.success("🗑️ Command deleted");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Custom Commands</h2>
            <p className="text-muted-foreground">Define slash commands for quick actions</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Command
          </Button>
        </div>

        {/* Command List */}
        <div className="space-y-3">
          {commands.map((cmd) => (
            <Card key={cmd.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Command</p>
                      <p className="font-mono font-semibold">{cmd.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trigger Phrase</p>
                      <p className="font-medium">{cmd.trigger}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Function</p>
                      <p className="font-medium">{cmd.function}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(cmd.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Command Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Command</CardTitle>
            <CardDescription>Define a custom slash command</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cmd-name">Command Name</Label>
              <Input 
                id="cmd-name" 
                placeholder="/mycommand" 
                value={cmdName}
                onChange={(e) => setCmdName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Phrase</Label>
              <Input 
                id="trigger" 
                placeholder="trigger phrase" 
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="function">Assigned Function</Label>
              <select
                id="function"
                className="w-full px-3 py-2 border rounded-md bg-background"
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
              >
                <option>Store memory</option>
                <option>Clear memory</option>
                <option>Sync memories</option>
                <option>Search memories</option>
                <option>Export data</option>
              </select>
            </div>
            <Button className="w-full" onClick={handleCreate}>Create Command</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
