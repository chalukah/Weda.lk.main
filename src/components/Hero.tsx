import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 pl-8 lg:pl-16">
      <div className="z-10 max-w-2xl">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Transform Your
            <br />
            Digital Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-lg">
            Discover the power of innovation with our cutting-edge platform designed to elevate your business to new heights.
          </p>
          <div className="pt-4">
            <Button size="lg" className="text-lg px-8 py-3">
              Try it Out
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}