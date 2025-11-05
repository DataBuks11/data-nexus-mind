import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemoryCenter() {
  const memories = [
    { id: 1, title: "Project Planning Discussion", bot: "ChatGPT", date: "2024-01-15", size: "2.3 MB", synced: true },
    { id: 2, title: "Code Review Notes", bot: "Claude", date: "2024-01-14", size: "1.1 MB", synced: true },
    { id: 3, title: "Data Analysis Query", bot: "Gemini", date: "2024-01-13", size: "3.5 MB", synced: false },
    { id: 4, title: "API Documentation", bot: "ChatGPT", date: "2024-01-12", size: "0.8 MB", synced: true },
    { id: 5, title: "Design Feedback", bot: "Claude", date: "2024-01-11", size: "1.9 MB", synced: true },
  ];

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
                />
              </div>
              <select className="px-4 py-2 border rounded-md bg-background">
                <option>All Bots</option>
                <option>ChatGPT</option>
                <option>Gemini</option>
                <option>Claude</option>
              </select>
              <select className="px-4 py-2 border rounded-md bg-background">
                <option>All Status</option>
                <option>Synced</option>
                <option>Unsynced</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Memory List */}
        <div className="space-y-3">
          {memories.map((memory) => (
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
                      <span>{memory.date}</span>
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
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
