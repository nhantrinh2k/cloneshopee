/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocicalStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-sm line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='ml-1 truncate text-sm text-gray54 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-xs'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-sm'>₫</span>
              <span className='text-[15px]'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <div className='ml-1 text-sm text-black87'>Đã bán {formatNumberToSocicalStyle(product.sold)}</div>
            </div>
          </div>
          <div className='mt-2 text-sm text-black87'>TP. Hồ Chí Minh</div>
        </div>
      </div>
    </Link>
  )
}
