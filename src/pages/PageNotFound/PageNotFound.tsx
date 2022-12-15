/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function PageNotFound() {
  return (
    <div className='flex h-auto w-full flex-col items-center justify-center bg-white py-10'>
      <div className='h-[430px] w-full bg-not-found bg-center bg-no-repeat'>
        <h1 className='text-center text-7xl font-extrabold tracking-widest text-black'>404</h1>
      </div>
      <h3 className='text-[35px]'>Look like you're lost</h3>
      <p className='mb-5 mt-2'>the page you are looking for not avaible!</p>

      <NavLink to={path.home} className='bg-orange py-2 px-5 text-white hover:bg-orange/90'>
        Go to Home
      </NavLink>
    </div>
  )
}
