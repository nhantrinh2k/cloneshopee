/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocicalStyle, generateNameId, rateSale } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <div className=''>
      <Link to={`${path.productList}${generateNameId({ name: product.name, id: product._id })}`}>
        <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
          <div className='relative w-full pt-[100%]'>
            <img
              src={product.image}
              alt={product.name}
              className='absolute top-0 left-0 h-full w-full bg-white object-cover'
            />
            <div className='absolute top-0 right-0 flex flex-col items-center justify-center bg-yellowratesale '>
              <div className='p-[2px] text-center'>
                <div className='text-sm text-orange'> {rateSale(product.price_before_discount, product.price)}</div>
                <div className='text-sm text-white'>GIẢM</div>
              </div>
            </div>
          </div>
          <div className='overflow-hidden p-2'>
            <div className='min-h-[2rem] text-sm line-clamp-2'>{product.name}</div>
            <div className='mt-3 flex items-center justify-center md:justify-start'>
              <div className='ml-1 truncate text-sm text-gray54 line-through'>
                <span className='text-xs'>₫</span>
                <span className='text-xs'>{formatCurrency(product.price_before_discount)}</span>
              </div>
              <div className='ml-1 truncate text-orange'>
                <span className='text-sm'>₫</span>
                <span className='text-[15px]'>{formatCurrency(product.price)}</span>
              </div>
            </div>
            <div className='mt-3 flex flex-col items-center justify-center md:flex-row md:justify-start'>
              <ProductRating rating={product.rating} />
              <div className='mt-2 text-sm md:ml-2 md:mt-0'>
                <div className='ml-1 text-sm text-black87'>Đã bán {formatNumberToSocicalStyle(product.sold)}</div>
              </div>
            </div>
            <div className='mt-2 text-center text-sm text-black87 md:text-start'>TP. Hồ Chí Minh</div>
          </div>
        </div>
      </Link>
      {/* <div className='opacity-1 rounded-top-sm absolute bottom-[-1.5rem] z-10 h-[2rem] rounded-b-[0.125rem] bg-orange'>
        <span className='px-[14px] text-center text-[14px] leading-8 text-white'>Tìm sản phẩm tương tự</span>
      </div> */}
    </div>
  )
}
