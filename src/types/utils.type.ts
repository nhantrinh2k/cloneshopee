export interface SuccessResponApi<Data> {
  message: string
  data: Data
}

export interface ErrorResponApi<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
