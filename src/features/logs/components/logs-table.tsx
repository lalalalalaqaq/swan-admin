import { useEffect, useMemo, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, LoaderCircle } from 'lucide-react'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTableUrlState } from '@/hooks/use-table-url-state'
import { fetchSystemLogs } from '@/features/tasks/api/log-api'
import { logMethods, logStatuses } from '../data/data'
import { logsColumns as columns } from './logs-columns'

const route = getRouteApi('/_authenticated/logs/')

export function LogsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: true, key: 'filter' },
    columnFilters: [
      { columnId: 'done', searchKey: 'status', type: 'array' },
      { columnId: 'method', searchKey: 'method', type: 'array' },
    ],
  })

  const page = pagination.pageIndex + 1
  const pageSize = pagination.pageSize

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['sys-logs', { page, pageSize }],
    queryFn: () => fetchSystemLogs(page, pageSize),
  })

  const rows = useMemo(() => data?.records ?? [], [data])

  const table = useReactTable({
    data: rows,
    columns,
    pageCount: data?.pages ?? 0,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: (row, _columnId, filterValue) => {
      const op = String(row.getValue('op')).toLowerCase()
      const uri = String(row.getValue('uri')).toLowerCase()
      const username = String(row.getValue('username') ?? '').toLowerCase()
      const searchValue = String(filterValue).toLowerCase()

      return (
        op.includes(searchValue)
        || uri.includes(searchValue)
        || username.includes(searchValue)
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
  })

  useEffect(() => {
    ensurePageInRange(data?.pages ?? 0)
  }, [data?.pages, ensurePageInRange])

  if (isPending) {
    return (
      <div className='flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground'>
        <LoaderCircle className='size-4 animate-spin' />
        正在加载日志...
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant='destructive'>
        <AlertCircle />
        <AlertTitle>日志加载失败</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : '请检查接口或登录状态。'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='按操作、地址或用户筛选...'
        filters={[
          {
            columnId: 'done',
            title: '状态',
            options: logStatuses,
          },
          {
            columnId: 'method',
            title: '方法',
            options: logMethods,
          },
        ]}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table className='min-w-[980px]'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.columnDef.meta?.className}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className='h-11'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.tdClassName}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  暂无日志数据。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
    </div>
  )
}
