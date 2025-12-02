import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Database, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface BotStatus {
  name: string;
  status: string;
}

interface RecentMemory {
  id: string;
  title: string;
  bot: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [connectedBots, setConnectedBots] = useState<BotStatus[]>([]);
  const [recentMemories, setRecentMemories] = useState<RecentMemory[]>([]);
  const [totalMemories, setTotalMemories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);

    // Fetch connected bots
    const { data: botsData } = await supabase
      .from("connected_bots")
      .select("name, status")
      .order("created_at", { ascending: false });

    if (botsData) {
      setConnectedBots(botsData);
    }

    // Fetch recent memories
    const { data: memoriesData } = await supabase
      .from("memories")
      .select("id, title, bot, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (memoriesData) {
      setRecentMemories(memoriesData);
    }

    // Count total memories
    const { count } = await supabase
      .from("memories")
      .select("*", { count: "exact", head: true });

    if (count !== null) {
      setTotalMemories(count);
    }

    setLoading(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const connectedCount = connectedBots.filter((b) => b.status === "ready").length;
  const totalBotsAvailable = 4; // ChatGPT, Gemini, Claude, Grok

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
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your AI memory system</p>
        </div>

        {/* Privacy Banner */}
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Secure Cloud Storage Active</h3>
                <p className="text-sm text-muted-foreground">
                  Your chat memories are stored securely in your private database with encryption and authentication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Memories</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMemories}</div>
              <p className="text-xs text-muted-foreground">
                {totalMemories === 0 ? "Start storing memories" : "Stored securely"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Bots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {connectedCount}/{totalBotsAvailable}
              </div>
              <p className="text-xs text-muted-foreground">
                {connectedCount === 0 ? "Connect your first bot" : "Active connections"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentMemories.length > 0 ? formatTimeAgo(recentMemories[0].created_at).split(" ")[0] : "—"}
              </div>
              <p className="text-xs text-muted-foreground">
                {recentMemories.length > 0 ? formatTimeAgo(recentMemories[0].created_at).split(" ").slice(1).join(" ") : "No activity"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Connected Bots */}
        {connectedBots.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Connected Chatbots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {connectedBots.map((bot) => (
                  <div
                    key={bot.name}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(bot.status)}`} />
                      <span className="font-medium">{bot.name}</span>
                    </div>
                    <Badge variant={bot.status === "ready" ? "default" : "secondary"}>
                      {bot.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Memories */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Memory Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMemories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No memories yet. Connect your bots and start storing memories!
              </p>
            ) : (
              <div className="space-y-3">
                {recentMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{memory.title}</p>
                      <p className="text-sm text-muted-foreground">via {memory.bot}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTimeAgo(memory.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
