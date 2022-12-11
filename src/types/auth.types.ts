import { User } from './user.types'
import { SuccessResponApi } from './utils.type'

export type AuthResponse = SuccessResponApi<{
  access_token: string
  refresh_token: string
  expries_refresh_token: number
  expires: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponApi<{ access_token: string }>
