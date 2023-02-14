import { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import banner1 from 'src/assets/images/banner1.png'
import banner2 from 'src/assets/images/banner2.png'
import banner3 from 'src/assets/images/banner3.png'
import banner4 from 'src/assets/images/banner4.png'
import banner5 from 'src/assets/images/banner5.png'
import banner6 from 'src/assets/images/banner6.png'
import banner7 from 'src/assets/images/banner7.png'
import banner8 from 'src/assets/images/banner8.png'
import image1 from 'src/assets/images/image1.png'
import image2 from 'src/assets/images/image2.png'
import path from 'src/constants/path'
import ProductListHome from './components/ProductListHome'

export default function Home() {
  const slides = [
    {
      url: 'https://cf.shopee.vn/file/fa79715264f5c973648d8096a8aa9773_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-20403322e7815abc6066c9d181fe6797_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-78c18169675ee3f8e9883f69313fe9d0_xxhdpi'
    },
    {
      url: 'https://cf.shopee.vn/file/vn-50009109-d5805972982d5c9ca7b371a91aaeb235_xxhdpi'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className='home'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-1 xl:grid-cols-3'>
          <div className='col-span-2'>
            <div className='group relative h-[316px] w-full max-w-full pt-8 pb-5 xl:max-w-[900px] xl:py-8'>
              <Link to={path.productList}>
                <div
                  style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                  className='h-full w-full rounded-sm bg-cover bg-center duration-200 ease-out'
                ></div>
              </Link>
              {/* Left Arrow */}
              <div className='absolute top-[50%] left-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer select-none rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              {/* Right Arrow */}
              <div className='absolute top-[50%] right-2 hidden -translate-x-0 translate-y-[-50%] cursor-pointer select-none rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
              <div className='absolute top-[75%] left-[35%] z-10 flex -translate-y-0 justify-center py-2 outline-none md:left-[45%]'>
                {slides.map((slide, slideIndex) => (
                  <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='mx-2 cursor-pointer text-2xl'>
                    {slideIndex == currentIndex ? (
                      <button
                        type='button'
                        className='h-3 w-3 rounded-full bg-orange'
                        aria-current='false'
                        aria-label='Slide 1'
                        data-carousel-slide-to='0'
                      ></button>
                    ) : (
                      <button
                        type='button'
                        className='h-3 w-3 rounded-full border border-colordottedborder bg-colordottedslide'
                        aria-current='false'
                        aria-label='Slide 1'
                        data-carousel-slide-to='1'
                      ></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex gap-2 pb-8 xl:flex-col xl:gap-0 xl:py-8'>
            <Link to={path.productList}>
              <img src={image1} alt='image1' className='max-w-full cursor-pointer rounded-sm bg-cover bg-center pb-1' />
            </Link>
            <Link to={path.productList}>
              <img src={image2} alt='image2' className='cursor-pointer rounded-sm bg-cover bg-center' />
            </Link>
          </div>
        </div>
        <div className='ml-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8'>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner1} alt='banner1' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Miễn Phí Vận Chuyển</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner2} alt='banner2' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Mã Giảm Giá </div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner3} alt='banner3' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Gì Cũng Rẻ - Mua Là Freeship</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner4} alt='banner4' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Khung Giờ Săn Sale</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner5} alt='banner5' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Bắt Trend - Giá Sốc</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner6} alt='banner6' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Hàng Hiệu Giá Tốt</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner7} alt='banner7' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Hàng Quốc Tế</div>
            </Link>
          </div>
          <div className='max-w-[120px] transition-transform duration-100 hover:translate-y-[-0.0625rem]'>
            <Link to={path.productList} className='flex flex-col items-center justify-center text-center'>
              <img src={banner8} alt='banner8' className='w-14 cursor-pointer rounded-sm bg-cover bg-center pb-1' />
              <div className='my-1 text-sm'>Chia Kho Xu 30 Triệu</div>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-neutral-100 pb-5'>
        <div className='container my-5'>
          <div className='products-home'>
            <div className='py-5 text-center text-xl text-orange'>GỢI Ý HÔM NAY</div>
            <ProductListHome />
            <div className='mt-7 flex w-full items-center justify-center'>
              <Link
                to={path.productList}
                className='flex h-[2.5rem] w-[24.375rem] items-center justify-center border border-gray-300 bg-white text-gray555 shadow-sm outline-none delay-75 hover:bg-neutral-200'
              >
                Xem Thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
