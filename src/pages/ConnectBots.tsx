import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download } from "lucide-react";

export default function ConnectBots() {
  const bots = [
    { name: "ChatGPT", description: "OpenAI's conversational AI", ready: true },
    { name: "Gemini", description: "Google's multimodal AI", ready: true },
    { name: "Claude", description: "Anthropic's AI assistant", ready: false },
    { name: "Mistral", description: "Open-source AI model", ready: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Connect Chatbots</h2>
          <p className="text-muted-foreground">Connect via DataBuks browser extension</p>
        </div>

        {/* Extension CTA Banner */}
        <Alert className="border-primary bg-primary/5">
          <Download className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Browser Extension Required</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">Install the DataBuks Chrome Extension to automatically connect your AI chatbots and sync memories locally.</p>
            <Button size="lg" className="w-full md:w-auto">
              Install DataBuks Chrome Extension to Start
            </Button>
          </AlertDescription>
        </Alert>

        {/* Bot Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {bots.map((bot) => (
            <Card key={bot.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{bot.name}</CardTitle>
                  <Badge variant={bot.ready ? "default" : "secondary"}>
                    {bot.ready ? "Ready via Extension" : "Extension required"}
                  </Badge>
                </div>
                <CardDescription>{bot.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Helper Text */}
        <p className="text-sm text-muted-foreground text-center mt-6 p-4 bg-muted/30 rounded-lg">
          Note: Connections are handled locally by the browser extension. No API keys required.
        </p>
      </div>
    </DashboardLayout>
  );
}
