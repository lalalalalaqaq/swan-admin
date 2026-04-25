import { CheckCircle2, CircleX, Fingerprint, KeyRound, ShieldCheck } from 'lucide-react'

export const logStatuses = [
  { label: '成功', value: 'success' as const, icon: CheckCircle2 },
  { label: '失败', value: 'failed' as const, icon: CircleX },
]

export const logMethods = [
  { label: 'GET', value: 'GET' as const, icon: Fingerprint },
  { label: 'POST', value: 'POST' as const, icon: KeyRound },
  { label: 'PUT', value: 'PUT' as const, icon: ShieldCheck },
  { label: 'DELETE', value: 'DELETE' as const, icon: CircleX },
]
