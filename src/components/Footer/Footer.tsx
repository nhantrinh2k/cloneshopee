/* eslint-disable jsx-a11y/anchor-has-content */

export default function Footer() {
  return (
    <footer className='bg-neutral-100 py-10'>
      <div className='container'>
        <div className='mt-10 text-center text-sm'>
          <div className='mb-10 flex flex-col items-center justify-center md:flex-row'>
            <div className='border-gray-300 px-5 pb-2 uppercase text-colortextfooter md:border-r-2 md:pb-0'>
              CHÍNH SÁCH BẢO MẬT
            </div>
            <div className='border-gray-300 px-5 pb-2 uppercase text-colortextfooter md:border-r-2 md:pb-0'>
              QUY CHẾ HOẠT ĐỘNG
            </div>
            <div className='border-gray-300 px-5 pb-2 uppercase text-colortextfooter md:border-r-2 md:pb-0'>
              CHÍNH SÁCH VẬN CHUYỂN
            </div>
            <div className='pl-5 uppercase text-colortextfooter'>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
          </div>
          <div className='mb-3 flex items-center justify-center'>
            <a
              href='http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=18375'
              className='h-[2.8125rem] w-[7.5rem] bg-footer bg-right-bottom'
            ></a>
          </div>
          <div className='text-colortextfooter'>Công ty TNHH Shopee</div>
          <div className='mt-6 text-colortextfooter'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2 text-colortextfooter'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2 text-colortextfooter'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2 text-colortextfooter'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
