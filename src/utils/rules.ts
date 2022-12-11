import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống!'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng dịnh dạng!'
    },
    maxLength: {
      value: 160,
      message: 'Email phải có độ dài từ 5 - 160 ký tự!'
    },
    minLength: {
      value: 5,
      message: 'Email phải có độ dài từ 5 - 160 ký tự!'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống!'
    },
    maxLength: {
      value: 160,
      message: 'Password phải có độ dài từ 6 - 160 ký tự!'
    },
    minLength: {
      value: 6,
      message: 'Password phải có độ dài từ 6 - 160 ký tự!'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password không được để trống!'
    },
    maxLength: {
      value: 160,
      message: 'Confirm Password phải có độ dài từ 6 - 160 ký tự!'
    },
    minLength: {
      value: 6,
      message: 'Confirm Password phải có độ dài từ 6 - 160 ký tự!'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password không khớp!'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent
  if (price_min != '' && price_max != '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min != '' || price_max != ''
}

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Confirm Password không được để trống!')
    .min(6, 'Confirm Password phải có độ dài từ 6 - 160 ký tự!')
    .max(160, 'Confirm Password phải có độ dài từ 6 - 160 ký tự!')
    .oneOf([yup.ref(refString)], 'Confirm Password không khớp!')
}

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email không được để trống!')
      .email('Email không đúng dịnh dạng!')
      .min(5, 'Email phải có độ dài từ 5 - 160 ký tự!')
      .max(160, 'Email phải có độ dài từ 5 - 160 ký tự!'),
    password: yup
      .string()
      .required('Password không được để trống!')
      .min(6, 'Password phải có độ dài từ 6 - 160 ký tự!')
      .max(160, 'Password phải có độ dài từ 6 - 160 ký tự!'),
    confirm_password: handleConfirmPassword('password'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'Vui lòng điền khoảng giá phù hợp',
      test: testPriceMinMax
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'Vui lòng điền khoảng giá phù hợp',
      test: testPriceMinMax
    }),
    name: yup.string().trim().required('Lỗi')
  })
  .required()

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự!'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự!'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự!'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự!'),
  date_of_birth: yup.date().max(new Date(), 'Ngày không hợp lệ, vui lòng chọn ngày chính xác!'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPassword('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
