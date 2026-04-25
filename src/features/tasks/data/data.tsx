import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CheckCircle,
  Timer,
  CircleOff,
} from 'lucide-react'

export const labels = [
  { value: 'BUG', label: '缺陷' },
  { value: 'FEATURE', label: '功能' },
  { value: 'DOC', label: '文档' },
]

export const statuses = [
  { label: '待办', value: 'TODO' as const, icon: Circle },
  { label: '进行中', value: 'IN_PROGRESS' as const, icon: Timer },
  { label: '已完成', value: 'COMPLETED' as const, icon: CheckCircle },
  { label: '已取消', value: 'CANCELLED' as const, icon: CircleOff },
]

export const priorities = [
  { label: '低', value: 'LOW' as const, icon: ArrowDown },
  { label: '中', value: 'MEDIUM' as const, icon: ArrowRight },
  { label: '高', value: 'HIGH' as const, icon: ArrowUp },
]
