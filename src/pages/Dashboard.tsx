import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Database, Clock } from "lucide-react";

export default function Dashboard() {
  const connectedBots = [
    { name: "ChatGPT", status: "connected", color: "bg-green-500" },
    { name: "Gemini", status: "connected", color: "bg-blue-500" },
    { name: "Claude", status: "disconnected", color: "bg-gray-400" },
    { name: "Mistral", status: "disconnected", color: "bg-gray-400" },
  ];

  const recentMemories = [
    { title: "Project Planning Discussion", bot: "ChatGPT", date: "2 hours ago" },
    { title: "Code Review Notes", bot: "Claude", date: "5 hours ago" },
    { title: "Data Analysis Query", bot: "Gemini", date: "1 day ago" },
    { title: "API Documentation", bot: "ChatGPT", date: "2 days ago" },
    { title: "Design Feedback", bot: "Claude", date: "3 days ago" },
  ];

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
                <h3 className="text-lg font-semibold mb-1">Local-First Privacy Active</h3>
                <p className="text-sm text-muted-foreground">
                  Your chat memories are stored securely in your browser's local storage (IndexedDB). Your data never touches our servers.
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
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Bots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/4</div>
              <p className="text-xs text-muted-foreground">Connect more bots</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 min</div>
              <p className="text-xs text-muted-foreground">ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Connected Bots */}
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
                    <div className={`w-3 h-3 rounded-full ${bot.color}`} />
                    <span className="font-medium">{bot.name}</span>
                  </div>
                  <Badge variant={bot.status === "connected" ? "default" : "secondary"}>
                    {bot.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Memories */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Memory Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMemories.map((memory, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{memory.title}</p>
                    <p className="text-sm text-muted-foreground">via {memory.bot}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{memory.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
