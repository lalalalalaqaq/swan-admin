import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, type RenderResult } from 'vitest-browser-react'
import { type Locator, userEvent } from 'vitest/browser'
import { OtpForm } from './otp-form'

const navigate = vi.fn()
const setUserMock = vi.fn()
const setAccessTokenMock = vi.fn()

vi.mock('@tanstack/react-router', async (orig) => {
  const actual = await orig<typeof import('@tanstack/react-router')>()
  return { ...actual, useNavigate: () => navigate }
})

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({
    auth: {
      setUser: setUserMock,
      setAccessToken: setAccessTokenMock,
    },
  }),
}))

vi.mock('@/lib/utils', async (orig) => ({
  ...(await orig()),
  sleep: vi.fn(() => Promise.resolve()),
}))

describe('OtpForm', () => {
  let screen: RenderResult
  let otpInput: Locator
  let verifyButton: Locator

  beforeEach(async () => {
    vi.clearAllMocks()

    screen = await render(<OtpForm />)
    otpInput = screen.getByLabelText(/^One-Time Password$/i)
    verifyButton = screen.getByRole('button', { name: /^Verify$/i })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('disables Verify until 6 digits are entered', async () => {
    await expect.element(verifyButton).toBeDisabled()

    await userEvent.fill(otpInput, '12345')
    await expect.element(verifyButton).toBeDisabled()

    await userEvent.fill(otpInput, '123456')
    await expect.element(verifyButton).toBeEnabled()
  })

  it('stores mock auth state and navigates after verification', async () => {
    await userEvent.fill(otpInput, '123456')
    await userEvent.click(verifyButton)

    await vi.waitFor(() => expect(setUserMock).toHaveBeenCalledOnce())
    expect(setUserMock).toHaveBeenCalledWith(
      expect.objectContaining({
        accountNo: 'SWAN-OPS',
        email: 'internal@swan.local',
        role: ['operator'],
        exp: expect.any(Number),
      })
    )
    expect(setAccessTokenMock).toHaveBeenCalledWith('mock-access-token-123456')
    expect(navigate).toHaveBeenCalledWith({ to: '/', replace: true })
  })

  it('navigates to redirectTo when provided', async () => {
    vi.clearAllMocks()

    const { getByLabelText, getByRole } = await render(
      <OtpForm redirectTo='/logs' />
    )

    await userEvent.fill(getByLabelText(/^One-Time Password$/i), '654321')
    await userEvent.click(getByRole('button', { name: /^Verify$/i }))

    await vi.waitFor(() =>
      expect(navigate).toHaveBeenCalledWith({ to: '/logs', replace: true })
    )
  })
})
