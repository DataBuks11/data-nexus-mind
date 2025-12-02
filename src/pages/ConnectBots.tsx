import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Bot {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
  api_key?: string;
}

const availableBots = [
  { name: "ChatGPT", description: "OpenAI's conversational AI", icon: "🤖" },
  { name: "Gemini", description: "Google's multimodal AI", icon: "✨" },
  { name: "Claude", description: "Anthropic's helpful assistant", icon: "🧠" },
  { name: "Grok", description: "xAI's conversational AI", icon: "🚀" },
];

export default function ConnectBots() {
  const { user } = useAuth();
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (user) {
      fetchBots();
    }
  }, [user]);

  const fetchBots = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("connected_bots")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bots:", error);
      toast.error("Failed to load bots");
    } else {
      setBots(data || []);
    }
    setLoading(false);
  };

  const handleConnect = async (botName: string) => {
    if (!user) return;

    const botInfo = availableBots.find((b) => b.name === botName);
    if (!botInfo) return;

    const { error } = await supabase.from("connected_bots").insert({
      user_id: user.id,
      name: botInfo.name,
      description: botInfo.description,
      icon: botInfo.icon,
      status: "pending",
      api_key: apiKey || null,
    });

    if (error) {
      console.error("Error connecting bot:", error);
      toast.error("Failed to connect bot");
    } else {
      toast.success(`✅ ${botName} connected successfully!`);
      setApiKey("");
      setSelectedBot(null);
      fetchBots();
    }
  };

  const handleDisconnect = async (botId: string) => {
    const { error } = await supabase
      .from("connected_bots")
      .delete()
      .eq("id", botId);

    if (error) {
      console.error("Error disconnecting bot:", error);
      toast.error("Failed to disconnect bot");
    } else {
      toast.success("🗑️ Bot disconnected");
      fetchBots();
    }
  };

  const handleUpdateStatus = async (botId: string, newStatus: string) => {
    const { error } = await supabase
      .from("connected_bots")
      .update({ status: newStatus })
      .eq("id", botId);

    if (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      fetchBots();
    }
  };

  const isConnected = (botName: string) => {
    return bots.some((bot) => bot.name === botName);
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
          <h2 className="text-3xl font-bold mb-2">Connect Chatbots</h2>
          <p className="text-muted-foreground">Link your AI assistants to DataBuks</p>
        </div>

        {/* Available Bots */}
        <div className="grid md:grid-cols-2 gap-4">
          {availableBots.map((bot) => {
            const connectedBot = bots.find((b) => b.name === bot.name);
            const connected = !!connectedBot;

            return (
              <Card key={bot.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{bot.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{bot.name}</h3>
                        <p className="text-sm text-muted-foreground">{bot.description}</p>
                      </div>
                    </div>
                    {connected && (
                      <Badge variant={connectedBot.status === "ready" ? "default" : "secondary"}>
                        {connectedBot.status}
                      </Badge>
                    )}
                  </div>

                  {connected ? (
                    <div className="flex gap-2">
                      <select
                        className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                        value={connectedBot.status}
                        onChange={(e) => handleUpdateStatus(connectedBot.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="ready">Ready</option>
                        <option value="error">Error</option>
                      </select>
                      <Button
                        variant="destructive"
                        onClick={() => handleDisconnect(connectedBot.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full"
                          onClick={() => setSelectedBot(bot.name)}
                        >
                          Connect {bot.name}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Connect {bot.name}</DialogTitle>
                          <DialogDescription>
                            Enter your API key to connect {bot.name} (optional)
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="api-key">API Key (Optional)</Label>
                            <Input
                              id="api-key"
                              type="password"
                              placeholder="sk-..."
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                            />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => handleConnect(bot.name)}
                          >
                            Connect
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Extension Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-4xl">🔌</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">DataBuks Chrome Extension</h3>
                <p className="text-muted-foreground mb-4">
                  Install our extension to sync memories automatically
                </p>
                <Button onClick={() => toast.info("ℹ️ Extension coming soon!")}>
                  Install DataBuks Extension
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
