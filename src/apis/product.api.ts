/* eslint-disable import/no-unresolved */
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponApi<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi
