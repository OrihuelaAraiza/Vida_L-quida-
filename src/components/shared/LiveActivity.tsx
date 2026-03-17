"use client"

import { useEffect, useState } from "react"
import { AnimatedList, AnimatedListItem } from "@/components/magicui/animated-list"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Simulated purchase events
const MOCK_EVENTS = [
  { name: "María G.", location: "CDMX", product: "Multilimpiador 1L", time: "hace 2 min" },
  { name: "Carlos R.", location: "Puebla", product: "Desengrasante Alcalino", time: "hace 5 min" },
  { name: "Ana L.", location: "Monterrey", product: "Quita Sarro 500ml", time: "hace 8 min" },
  { name: "Pedro M.", location: "Guadalajara", product: "Quitamanchas Bio", time: "hace 12 min" },
  { name: "Sofia T.", location: "Querétaro", product: "Desinfectante Cobre", time: "hace 15 min" },
]

export function LiveActivity({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true)
  const [events, setEvents] = useState(MOCK_EVENTS.slice(0, 1))
  const [eventIndex, setEventIndex] = useState(1)

  useEffect(() => {
    // Add new event every 4s
    const interval = setInterval(() => {
      if (eventIndex < MOCK_EVENTS.length) {
        setEvents(prev => [...prev, MOCK_EVENTS[eventIndex]])
        setEventIndex(i => i + 1)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [eventIndex])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Actividad reciente de compras"
      className={cn(
        "fixed bottom-6 right-6 z-50 w-72",
        "rounded-xl border border-border bg-background/95 shadow-lg backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Compras recientes
        </span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Cerrar actividad reciente"
          className="text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="p-2 max-h-48 overflow-hidden">
        <AnimatedList delay={4000}>
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/50">
              <div className="mt-0.5 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {event.name[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {event.name} · {event.location}
                </p>
                <p className="text-xs text-foreground/60 truncate">compró {event.product}</p>
                <p className="text-xs text-foreground/40">{event.time}</p>
              </div>
            </div>
          ))}
        </AnimatedList>
      </div>
    </div>
  )
}
