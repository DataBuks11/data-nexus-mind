import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function MemoryView() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/memory-center">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">Memory Details</h2>
            <p className="text-muted-foreground">Memory ID: {id}</p>
          </div>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Continue in Bot
          </Button>
        </div>

        {/* Memory Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Project Planning Discussion</CardTitle>
              <Badge>ChatGPT</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="font-medium">Jan 15, 2024</p>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <p className="font-medium">2.3 MB</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium text-green-600">Synced</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[400px] font-mono text-sm"
              defaultValue="User: Let's plan the new project architecture...\n\nAssistant: Great! Let's break this down into key components...\n\n[Full conversation history here]"
            />
            <div className="flex justify-end mt-4">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">planning</Badge>
              <Badge variant="secondary">architecture</Badge>
              <Badge variant="secondary">project</Badge>
            </div>
            <Input placeholder="Add new tag..." />
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Comments & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="text-sm font-medium">You • 2 hours ago</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This discussion was really helpful for understanding the project scope.
                </p>
              </div>
            </div>
            <Textarea placeholder="Add a comment..." rows={3} />
            <Button>Add Comment</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
