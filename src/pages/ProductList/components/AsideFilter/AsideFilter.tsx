/* eslint-disable import/no-unresolved */
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import RatingStars from 'src/components/RatingStars'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const [openMenu, setOpenMenu] = useState(false)
  const handleClickOpenMenu = () => {
    setOpenMenu((prev) => !prev)
  }
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='pt-16 pb-2 md:py-8'>
      {openMenu ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='absolute right-8 top-[20rem] h-10 w-10 cursor-pointer md:hidden'
          onClick={handleClickOpenMenu}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='absolute top-[20rem] right-8 h-10 w-10 cursor-pointer md:hidden'
          onClick={handleClickOpenMenu}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
      )}

      <div className={`${!openMenu ? 'hidden md:inline' : 'opacity-100'}`}>
        <Link
          to={path.home}
          className={classNames('flex items-center font-bold', {
            'text-orange': !category
          })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-3 h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
          Tất cả danh mục
        </Link>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <ul>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='{1.5}'
                      stroke='currentColor'
                      className='absolute top-[2px] left-[-10px] h-3 w-3 fill-orange'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-2 h-4 w-4 lg:mr-3 lg:h-6 lg:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
            />
          </svg>
          BỘ LỌC TÌM KIẾM
        </Link>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <div className='my-5'>
          <div>Khoảng Giá</div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='₫ TỪ'
                      classNameInput='p-1 text-sm w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                      value={field.value}
                      ref={field.ref}
                    />
                  )
                }}
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='₫ ĐẾN'
                      classNameInput='p-1 text-sm w-full outline-none border border-gray-300 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                      value={field.value}
                      ref={field.ref}
                    />
                  )
                }}
              />
            </div>
            <div className='mt-1 min-h-[1.25rem] py-3 text-center text-sm text-red-600'>
              {errors.price_min?.message}
            </div>
            <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <div className='text-sm'>Đánh Giá</div>
        <RatingStars queryConfig={queryConfig} />
        <div className='my-4 h-[1px] bg-gray-300'></div>
        <Button
          onClick={handleRemoveFilter}
          className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        >
          Xóa Tất Cả
        </Button>
      </div>
    </div>
  )
}
