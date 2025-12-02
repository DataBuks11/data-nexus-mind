import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Command {
  id: string;
  name: string;
  trigger: string;
  function: string;
}

export default function Commands() {
  const { user } = useAuth();
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmdName, setCmdName] = useState("");
  const [trigger, setTrigger] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("Store memory");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchCommands();
    }
  }, [user]);

  const fetchCommands = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("custom_commands")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching commands:", error);
      toast.error("Failed to load commands");
    } else {
      setCommands(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!cmdName || !trigger) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!user) return;

    if (editingId) {
      const { error } = await supabase
        .from("custom_commands")
        .update({ name: cmdName, trigger, function: selectedFunction })
        .eq("id", editingId);

      if (error) {
        toast.error("Failed to update command");
      } else {
        toast.success("✅ Command updated!");
        resetForm();
        fetchCommands();
      }
    } else {
      const { error } = await supabase.from("custom_commands").insert({
        user_id: user.id,
        name: cmdName,
        trigger,
        function: selectedFunction,
      });

      if (error) {
        toast.error("Failed to create command");
      } else {
        toast.success("✅ Command created!");
        resetForm();
        fetchCommands();
      }
    }
  };

  const handleEdit = (cmd: Command) => {
    setCmdName(cmd.name);
    setTrigger(cmd.trigger);
    setSelectedFunction(cmd.function);
    setEditingId(cmd.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("custom_commands").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("🗑️ Deleted");
      fetchCommands();
      if (editingId === id) resetForm();
    }
  };

  const resetForm = () => {
    setCmdName("");
    setTrigger("");
    setSelectedFunction("Store memory");
    setEditingId(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Custom Commands</h2>
          <p className="text-muted-foreground">Define slash commands for quick actions</p>
        </div>

        <div className="space-y-3">
          {commands.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No commands yet. Create one below!</p>
              </CardContent>
            </Card>
          ) : (
            commands.map((cmd) => (
              <Card key={cmd.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Command</p>
                        <p className="font-mono font-semibold">{cmd.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Trigger</p>
                        <p className="font-medium">{cmd.trigger}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Function</p>
                        <p className="font-medium">{cmd.function}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(cmd)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(cmd.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Command" : "Create New Command"}</CardTitle>
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
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleCreate}>
                {editingId ? "Update Command" : "Create Command"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
