import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardList,
  Cpu,
  Cylinder,
  Factory,
  FileCheck2,
  Filter,
  Gauge,
  HardHat,
  HeartPulse,
  Lock,
  MapPin,
  Route,
  Ruler,
  Server,
  Settings2,
  ShieldCheck,
  Store,
  Truck,
  Waves,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Name → icon. Content files reference icons by string, so copy and its icon
 * can be edited in one place without importing from `lucide-react`.
 */
export const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'audio-waveform': Waves,
  'badge-check': BadgeCheck,
  'building-2': Building2,
  check: Check,
  'clipboard-list': ClipboardList,
  cpu: Cpu,
  cylinder: Cylinder,
  factory: Factory,
  'file-check': FileCheck2,
  filter: Filter,
  gauge: Gauge,
  'hard-hat': HardHat,
  'heart-pulse': HeartPulse,
  lock: Lock,
  'map-pin': MapPin,
  route: Route,
  ruler: Ruler,
  server: Server,
  settings: Settings2,
  'shield-check': ShieldCheck,
  store: Store,
  truck: Truck,
  wrench: Wrench,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BadgeCheck
}
