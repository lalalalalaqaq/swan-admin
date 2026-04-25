/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SKIP_AUTH?: string
  readonly VITE_DEV_ACCESS_TOKEN?: string
  readonly VITE_DEV_USER_NAME?: string
  readonly VITE_DEV_USER_EMAIL?: string
  readonly VITE_DEV_USER_ROLE?: string
  readonly VITE_MARKET_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
