import { z } from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { createTask, updateTask } from '../api/task-api'
import { labels, priorities, statuses } from '../data/data'
import {
  taskPrioritySchema,
  taskStatusSchema,
  taskTagSchema,
  type Task,
} from '../data/schema'

type TaskMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = z.object({
  title: z.string().min(1, '请输入标题'),
  status: taskStatusSchema,
  tag: taskTagSchema,
  priority: taskPrioritySchema,
})
type TaskForm = z.infer<typeof formSchema>

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  const isUpdate = !!currentRow
  const queryClient = useQueryClient()

  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      status: 'TODO',
      tag: 'FEATURE',
      priority: 'MEDIUM',
    },
  })

  useEffect(() => {
    form.reset(
      currentRow
        ? {
            title: currentRow.title,
            status: currentRow.status,
            tag: currentRow.tag,
            priority: currentRow.priority,
          }
        : {
            title: '',
            status: 'TODO',
            tag: 'FEATURE',
            priority: 'MEDIUM',
          }
    )
  }, [currentRow, form, open])

  const saveMutation = useMutation({
    mutationFn: async (data: TaskForm) => {
      if (isUpdate && currentRow) {
        return updateTask({ id: currentRow.id, ...data })
      }

      return createTask(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success(isUpdate ? '任务已更新' : '任务已创建')
      onOpenChange(false)
      form.reset()
    },
  })

  const onSubmit = (data: TaskForm) => {
    saveMutation.mutate(data)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) {
          form.reset()
        }
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? '编辑' : '新建'}任务</SheetTitle>
          <SheetDescription>
            {isUpdate ? '更新任务信息。' : '填写任务信息以新建任务。'}
            完成后点击保存。
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='输入标题' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='选择状态'
                    items={statuses}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tag'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>标签</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {labels.map((label) => (
                        <FormItem key={label.value} className='flex items-center'>
                          <FormControl>
                            <RadioGroupItem value={label.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {label.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>优先级</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {priorities.map((priority) => (
                        <FormItem
                          key={priority.value}
                          className='flex items-center'
                        >
                          <FormControl>
                            <RadioGroupItem value={priority.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {priority.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>关闭</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit' disabled={saveMutation.isPending}>
            保存
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
