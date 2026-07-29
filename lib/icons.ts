import {
  Cpu,
  Filter,
  Leaf,
  Settings2,
  ShieldCheck,
  Truck,
  Users,
  Waves,
  Wind,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/** Maps the icon keys used in content/site.ts to Lucide components. */
export const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  users: Users,
  shield: ShieldCheck,
  wind: Wind,
  filter: Filter,
  settings: Settings2,
  wrench: Wrench,
  cpu: Cpu,
  truck: Truck,
  'audio-waveform': Waves,
}
