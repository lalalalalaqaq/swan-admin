import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm'>
        <Avatar className='h-11 w-11 ring-1 ring-border'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-semibold'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              olivia.martin@email.com
            </p>
          </div>
          <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-foreground'>
            +$1,999.00
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm'>
        <Avatar className='flex h-11 w-11 items-center justify-center space-y-0 border border-border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-semibold'>Jackson Lee</p>
            <p className='text-sm text-muted-foreground'>
              jackson.lee@email.com
            </p>
          </div>
          <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-foreground'>
            +$39.00
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm'>
        <Avatar className='h-11 w-11 ring-1 ring-border'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-semibold'>Isabella Nguyen</p>
            <p className='text-sm text-muted-foreground'>
              isabella.nguyen@email.com
            </p>
          </div>
          <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-foreground'>
            +$299.00
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm'>
        <Avatar className='h-11 w-11 ring-1 ring-border'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-semibold'>William Kim</p>
            <p className='text-sm text-muted-foreground'>will@email.com</p>
          </div>
          <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-foreground'>
            +$99.00
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4 rounded-[1.75rem] bg-white px-4 py-4 shadow-sm'>
        <Avatar className='h-11 w-11 ring-1 ring-border'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-semibold'>Sofia Davis</p>
            <p className='text-sm text-muted-foreground'>
              sofia.davis@email.com
            </p>
          </div>
          <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary-foreground'>
            +$39.00
          </div>
        </div>
      </div>
    </div>
  )
}
