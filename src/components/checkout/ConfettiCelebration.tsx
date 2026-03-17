"use client"

import { useEffect, useRef } from "react"
import Confetti, { ConfettiRef } from "@/components/magicui/confetti"
import { cn } from "@/lib/utils"

interface ConfettiCelebrationProps {
  message: string
  className?: string
}

export function ConfettiCelebration({ message: _message, className }: ConfettiCelebrationProps) {
  const confettiRef = useRef<ConfettiRef>(null)

  useEffect(() => {
    const fire = () => {
      confettiRef.current?.fire({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2D6A4F", "#F5C800", "#2ECC71", "#C17A56"],
        ticks: 200,
      })
    }
    fire()
    // Second burst after 0.5s
    const t = setTimeout(() => fire(), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <Confetti
        ref={confettiRef}
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        manualstart
      />
    </div>
  )
}
