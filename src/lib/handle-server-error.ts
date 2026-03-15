import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (data && typeof data === 'object' && 'msg' in data && typeof (data as { msg?: string }).msg === 'string') {
      errMsg = (data as { msg: string }).msg
    } else if (data && typeof data === 'object' && 'title' in data && typeof (data as { title?: string }).title === 'string') {
      errMsg = (data as { title: string }).title
    }
  }

  toast.error(errMsg)
}
