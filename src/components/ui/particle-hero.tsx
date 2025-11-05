import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  fadeDelay: number
  fadeStart: number
  fadingOut: boolean
  reset: () => void
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGoldMode, setIsGoldMode] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() / 5 + 0.1
        this.opacity = 1
        this.fadeDelay = Math.random() * 600 + 100
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      },
      update() {
        this.y -= this.speed
        if (this.y < 0) this.reset()
        if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true
        if (this.fadingOut) {
          this.opacity -= 0.008
          if (this.opacity <= 0) this.reset()
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1)
      },
    }
    particle.reset()
    particle.y = Math.random() * canvas.height
    return particle
  }

  const calculateParticleCount = (canvas: HTMLCanvasElement) => Math.floor((canvas.width * canvas.height) / 6000)

  const initParticles = (canvas: HTMLCanvasElement) => {
    const count = calculateParticleCount(canvas)
    particlesRef.current = Array.from({ length: count }, () => createParticle(canvas))
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particlesRef.current.forEach((p) => {
      p.update()
      p.draw(ctx)
    })
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas)
    animate(canvas, ctx)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const toggleGoldMode = () => setIsGoldMode(!isGoldMode)

  return (
    <div
      className={`relative h-[700px] w-full overflow-hidden ${isGoldMode ? "gold-mode" : ""}`}
      style={{ background: "#05060f", backgroundImage: "linear-gradient(0deg,rgba(216,236,248,.06),rgba(152,192,239,.06))" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />
      <div className="absolute top-20 left-0 right-0 mx-auto text-center z-10">
        <h1 className="text-7xl font-bold bg-gradient-to-b from-[#bad1f1] to-[#9dc3f7] text-transparent bg-clip-text">
          Universal Memory
        </h1>
        <p className="mt-4 text-lg text-[#d8ecf8]">
          AI-powered Universal Platform for Designing, Memory and Intelligence
        </p>
        <button
          onClick={toggleGoldMode}
          className="mt-6 px-6 py-2 rounded-lg border border-[#9dc3f7] text-[#bad1f1] hover:bg-[#9dc3f7]/20 transition"
        >
          Toggle Gold Mode
        </button>
      </div>
    </div>
  )
}
