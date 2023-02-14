import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import Product from 'src/pages/ProductList/components/Product'
import { ProductListConfig } from 'src/types/product.type'

export default function ProductListHome() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })

  return (
    <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {productsData?.data.data.products.map((product) => (
        <div className=' col-span-1 ' key={product._id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  )
}
