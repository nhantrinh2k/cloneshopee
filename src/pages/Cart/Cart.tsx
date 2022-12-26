/* eslint-disable import/no-unresolved */
import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import cartempty from 'src/assets/images/cartempty.png'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { ProductListConfig } from 'src/types/product.type'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import { useTranslation } from 'react-i18next'

export default function Cart() {
  const { t } = useTranslation()
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const queryConfig: ProductListConfig = { limit: '12', page: '1' }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const byProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchases = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  })

  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteAllPurchase = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      byProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-4 md:py-16'>
      <HelmetProvider>
        <Helmet>
          <title>Giỏ Hàng</title>
          <meta name='description' data-react-helmet='true' />
        </Helmet>
      </HelmetProvider>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {extendedPurchase.length > 0 && (
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange'
                        checked={isAllChecked}
                        onClick={handleCheckAll}
                      />
                    </div>
                    <div className='flex-grow text-black'>{t('product shopping cart')}</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>{t('unit price shopping cart')}</div>
                    <div className='col-span-1'>{t('quantity shopping cart')}</div>
                    <div className='col-span-1'>{t('total price shopping cart')}</div>
                    <div className='col-span-1'>{t('actions shopping cart')}</div>
                  </div>
                </div>
              </div>
            )}
            {extendedPurchase.length > 0 ? (
              <div className='mb-3 rounded-sm py-3 shadow'>
                {extendedPurchase?.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='mt-3 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='t h-20 w-20 flex-shrink-0'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-5 pt-1 pb-2 text-left'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='mr-2 text-gray-400 line-through'>
                              ₫{formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='text-black'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center'
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onType={handleTypeQuantity(index)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value <= purchase.product.quantity &&
                                  value >= 1 &&
                                  value != (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            onClick={handleDeletePurchase(index)}
                            className='bg-none text-black transition-colors hover:text-orange'
                          >
                            {t('delete shopping cart')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-start justify-center p-2 md:items-center'>
                <img src={cartempty} alt='cart empty' className='h-24 w-24' />
                <div className='mt-3 capitalize text-gray-500'>{t('cart empty')}</div>
                <div className='mt-3'>
                  <Link
                    to={path.home}
                    className='flex h-10 w-40 items-center justify-center bg-red-500 text-sm text-white hover:bg-red-600 sm:mt-5'
                  >
                    {t('shopping now')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {extendedPurchase.length > 0 && (
          <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange'
                  checked={isAllChecked}
                  onClick={handleCheckAll}
                />
              </div>
              <button className='mx-3 border-none bg-none'>
                {t('select all shopping cart')} ({purchasesInCart?.length})
              </button>
              <button onClick={handleDeleteAllPurchase} className='mx-3 border-none bg-none'>
                {t('delete shopping cart')}
              </button>
            </div>

            <div className='mt-5 flex flex-col items-center sm:ml-auto sm:mt-0 sm:flex-row'>
              <div>
                <div className='mb-3 flex items-center sm:mb-0 sm:justify-end'>
                  <div>
                    {t('total shopping cart')} ({checkedPurchasesCount}) {t('product low shopping cart')}:
                  </div>
                  <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                </div>
                <div className='flex items-center sm:justify-end'>
                  <div className='text-sm'>{t('saved shopping cart')}</div>
                  <div className='ml-4 text-sm text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                </div>
              </div>
              <Button
                onClick={handleBuyPurchases}
                disabled={byProductsMutation.isLoading}
                className='ml-4 mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm text-white hover:bg-red-600 sm:mt-0'
              >
                {t('check out shopping cart')}
              </Button>
            </div>
          </div>
        )}
        {productsData && (
          <div className='mt-10 p-4 shadow'>
            <div className='flex flex-col items-center justify-between sm:flex-row'>
              <div className='mb-3 text-lg capitalize text-gray-500 sm:mb-0'>{t('also like')}</div>
              <Link to={path.home} className='text-orange'>
                {t('view all')} {'>'}
              </Link>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
