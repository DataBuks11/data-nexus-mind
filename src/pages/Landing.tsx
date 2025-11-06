import { Link } from "react-router-dom";
import { BeamButtonPrimary, BeamButtonOutline } from "@/components/ui/pulse-buttons";
import { Brain, Database, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] bg-black/[0.96] overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          size={400}
        />
        
        <div className="flex h-full max-w-7xl mx-auto">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Universal Memory
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-lg">
              AI-powered Universal Platform for Designing, Memory and Intelligence. 
              Your AI remembers everything across all platforms.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <Link to="/dashboard">
                <BeamButtonPrimary label="Get Started" />
              </Link>
              <Link to="/support">
                <BeamButtonOutline label="Learn More" />
              </Link>
            </div>
          </div>

          {/* Right content - 3D Scene */}
          <div className="flex-1 relative hidden lg:block">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your AI remembers everything. Connect your chatbots and let DataBuks Universal Memory handle the rest.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect AI Bots</h3>
              <p className="text-muted-foreground">
                Link ChatGPT, Gemini, Claude, and more in seconds
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Store Memory</h3>
              <p className="text-muted-foreground">
                All conversations and context saved in one place
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
              <p className="text-muted-foreground">
                Seamless sync across all your AI assistants
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Supercharge Your AI?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of universal memory across all their AI assistants.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/dashboard">
              <BeamButtonPrimary label="Get Started Free" />
            </Link>
            <Link to="/support">
              <BeamButtonOutline label="View Documentation" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2025 DataBuks Universal Memory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
