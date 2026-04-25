type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative min-h-svh overflow-hidden bg-[#f8f7f2] text-foreground'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(159,232,112,0.26),transparent_24rem)]' />
      <div className='absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,rgba(14,15,12,0.04))]' />

      <div className='relative flex min-h-svh flex-col px-4 py-4 sm:px-6 sm:py-5'>
        <header className='flex justify-start'>
          <p className='text-[1rem] font-semibold tracking-[-0.03em] text-[#0e0f0c]/88'>
            Swan
          </p>
        </header>

        <main className='flex flex-1 items-center justify-center py-4 sm:py-6'>
          <div className='w-full max-w-[25rem]'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
