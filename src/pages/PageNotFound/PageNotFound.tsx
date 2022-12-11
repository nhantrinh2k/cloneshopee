/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'

export default function PageNotFound() {
  return (
    <div className='bg-white py-10'>
      <div className='container'>
        <div className='row'>
          <div className='h-[400px] w-full bg-not-found bg-center bg-no-repeat object-cover'>
            <h1 className='text-center text-[80px]'>404</h1>
          </div>
          <div className='text-center'>
            <h3 className='text-[40px]'>Look like you're lost</h3>
            <p className='mb-7 mt-2'>the page you are looking for not avaible!</p>
            <NavLink to={path.home} className='bg-orange py-2 px-5 text-white hover:bg-orange/90'>
              Go to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
