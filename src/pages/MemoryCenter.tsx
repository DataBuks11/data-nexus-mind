import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Memory {
  id: string;
  title: string;
  bot: string;
  created_at: string;
  size: string;
  synced: boolean;
}

export default function MemoryCenter() {
  const { user } = useAuth();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [botFilter, setBotFilter] = useState("All Bots");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    if (user) {
      fetchMemories();
    }
  }, [user]);

  const fetchMemories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching memories:", error);
      toast.error("Failed to load memories");
    } else {
      setMemories(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("memories").delete().eq("id", id);

    if (error) {
      console.error("Error deleting memory:", error);
      toast.error("Failed to delete memory");
    } else {
      setMemories(memories.filter((memory) => memory.id !== id));
      toast.success("🗑️ Memory deleted");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBot = botFilter === "All Bots" || memory.bot === botFilter;
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Synced" && memory.synced) ||
      (statusFilter === "Unsynced" && !memory.synced);

    return matchesSearch && matchesBot && matchesStatus;
  });

  const uniqueBots = Array.from(new Set(memories.map((m) => m.bot)));

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Memory Center</h2>
            <p className="text-muted-foreground">Manage all your stored AI memories</p>
          </div>
          <Button>Create New Memory</Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search memories..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border rounded-md bg-background"
                value={botFilter}
                onChange={(e) => setBotFilter(e.target.value)}
              >
                <option>All Bots</option>
                {uniqueBots.map((bot) => (
                  <option key={bot}>{bot}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-md bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Synced</option>
                <option>Unsynced</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Memory List */}
        <div className="space-y-3">
          {filteredMemories.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  {searchQuery || botFilter !== "All Bots" || statusFilter !== "All Status"
                    ? "No memories match your filters"
                    : "No memories yet. Connect your bots to start storing memories!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMemories.map((memory) => (
              <Card key={memory.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Link to={`/memory-view/${memory.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                          {memory.title}
                        </h3>
                      </Link>
                      <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
                        <span>via {memory.bot}</span>
                        <span>•</span>
                        <span>{formatDate(memory.created_at)}</span>
                        <span>•</span>
                        <span>{memory.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={memory.synced ? "default" : "secondary"}>
                        {memory.synced ? "Synced" : "Unsynced"}
                      </Badge>
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(memory.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
