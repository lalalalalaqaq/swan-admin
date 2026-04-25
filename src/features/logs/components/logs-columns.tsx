import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { Badge } from '@/components/ui/badge'
import { type LogRecord } from '../data/schema'

export const logsColumns: ColumnDef<LogRecord>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='w-[56px] font-mono text-[11px] text-muted-foreground'>
        {row.getValue('id')}
      </div>
    ),
    meta: { className: 'w-[68px]', tdClassName: 'px-2.5 py-2' },
  },
  {
    accessorKey: 'done',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='状态' />
    ),
    meta: { className: 'w-[96px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => {
      const done = row.getValue('done') as boolean
      return (
        <Badge
          variant={done ? 'secondary' : 'destructive'}
          className='rounded-full px-2 py-0.5 text-[11px]'
        >
          {done ? <CheckCircle2 className='size-3.5' /> : <AlertCircle className='size-3.5' />}
          {done ? '成功' : '失败'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id) ? 'success' : 'failed'),
  },
  {
    accessorKey: 'op',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='操作' />
    ),
    meta: { className: 'w-[140px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <div className='text-sm font-medium tracking-[-0.01em]'>{row.getValue('op')}</div>
    ),
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='方法' />
    ),
    meta: { className: 'w-[82px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <Badge variant='outline' className='rounded-full px-2 py-0.5 text-[11px]'>
        {String(row.getValue('method')).toUpperCase()}
      </Badge>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'uri',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='请求地址' />
    ),
    meta: { className: 'w-[220px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <LongText
        className='max-w-[13rem] truncate font-mono text-[11px] text-muted-foreground'
        contentClassName='max-w-xl break-all'
      >
        {row.getValue('uri')}
      </LongText>
    ),
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='用户' />
    ),
    meta: { className: 'w-[96px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <div className='truncate text-sm font-medium'>{row.original.username ?? '—'}</div>
    ),
  },
  {
    accessorKey: 'userRole',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='角色' />
    ),
    meta: { className: 'w-[92px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <Badge variant='outline' className='rounded-full px-2 py-0.5 text-[11px]'>
        {row.original.userRole ?? '—'}
      </Badge>
    ),
  },
  {
    id: 'detail',
    accessorFn: (row) => row.error ?? row.desc ?? row.payload ?? row.result ?? '—',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='详情' />
    ),
    meta: { className: 'w-[280px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <LongText
        className='max-w-[16rem] truncate text-[11px] text-muted-foreground'
        contentClassName='max-w-xl break-all'
      >
        {String(row.getValue('detail'))}
      </LongText>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='时间' />
    ),
    meta: { className: 'w-[156px]', tdClassName: 'px-2.5 py-2' },
    cell: ({ row }) => (
      <span className='text-xs text-muted-foreground'>
        {format(new Date(row.original.createdAt), 'yyyy-MM-dd HH:mm:ss')}
      </span>
    ),
  },
]
