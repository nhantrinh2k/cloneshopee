/* eslint-disable import/no-unresolved */
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['sort_by', 'order']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.productList,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
