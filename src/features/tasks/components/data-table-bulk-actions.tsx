import { type Table } from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleArrowUp, ArrowUpDown } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import {
  batchUpdateTaskPriority,
  batchUpdateTaskStatus,
} from '../api/task-api'
import { priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const queryClient = useQueryClient()
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedIds = selectedRows.map((row) => (row.original as Task).id)

  const statusMutation = useMutation({
    mutationFn: batchUpdateTaskStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      table.resetRowSelection()
    },
  })

  const priorityMutation = useMutation({
    mutationFn: batchUpdateTaskPriority,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      table.resetRowSelection()
    },
  })

  const handleBulkStatusChange = (status: Task['status']) => {
    toast.promise(statusMutation.mutateAsync({ ids: selectedIds, status }), {
      loading: '正在更新状态...',
      success: () => `已更新 ${selectedIds.length} 个任务的状态。`,
      error: '更新失败',
    })
  }

  const handleBulkPriorityChange = (priority: Task['priority']) => {
    toast.promise(
      priorityMutation.mutateAsync({ ids: selectedIds, priority }),
      {
        loading: '正在更新优先级...',
        success: () => `已更新 ${selectedIds.length} 个任务的优先级。`,
        error: '更新失败',
      }
    )
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='任务'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label='更新状态'
                  title='更新状态'
                >
                  <CircleArrowUp />
                  <span className='sr-only'>更新状态</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>更新状态</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                defaultValue={status.value}
                onClick={() => handleBulkStatusChange(status.value)}
              >
                {status.icon && (
                  <status.icon className='size-4 text-muted-foreground' />
                )}
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label='更新优先级'
                  title='更新优先级'
                >
                  <ArrowUpDown />
                  <span className='sr-only'>更新优先级</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>更新优先级</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent sideOffset={14}>
            {priorities.map((priority) => (
              <DropdownMenuItem
                key={priority.value}
                defaultValue={priority.value}
                onClick={() => handleBulkPriorityChange(priority.value)}
              >
                {priority.icon && (
                  <priority.icon className='size-4 text-muted-foreground' />
                )}
                {priority.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BulkActionsToolbar>
    </>
  )
}
