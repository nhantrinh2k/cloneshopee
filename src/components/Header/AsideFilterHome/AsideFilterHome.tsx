/* eslint-disable import/no-unresolved */
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilterHome({ queryConfig, categories }: Props) {
  const { category } = queryConfig

  return (
    <div className=''>
      <ul className='flex'>
        {categories.map((categoryItem) => {
          return (
            <li className='py-3 pr-3 text-sm' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.productList,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
              >
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

                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
