import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConnectBots() {
  const bots = [
    { name: "ChatGPT", description: "OpenAI's conversational AI", connected: true },
    { name: "Gemini", description: "Google's multimodal AI", connected: true },
    { name: "Claude", description: "Anthropic's AI assistant", connected: false },
    { name: "Mistral", description: "Open-source AI model", connected: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Connect Chatbots</h2>
          <p className="text-muted-foreground">Link your AI accounts to enable universal memory</p>
        </div>

        <Tabs defaultValue="oauth" className="w-full">
          <TabsList>
            <TabsTrigger value="oauth">OAuth Connection</TabsTrigger>
            <TabsTrigger value="apikey">API Key</TabsTrigger>
          </TabsList>

          <TabsContent value="oauth" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {bots.map((bot) => (
                <Card key={bot.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{bot.name}</CardTitle>
                      <Badge variant={bot.connected ? "default" : "secondary"}>
                        {bot.connected ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>
                    <CardDescription>{bot.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={bot.connected ? "outline" : "default"}
                    >
                      {bot.connected ? "Disconnect" : "Connect via OAuth"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apikey" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connect with API Key</CardTitle>
                <CardDescription>
                  Enter your API credentials to connect manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bot-select">Select Bot</Label>
                  <select
                    id="bot-select"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option>ChatGPT</option>
                    <option>Gemini</option>
                    <option>Claude</option>
                    <option>Mistral</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                  />
                </div>

                <Button className="w-full">Connect</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
