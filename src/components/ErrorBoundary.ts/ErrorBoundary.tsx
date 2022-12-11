/* eslint-disable react/no-unescaped-entities */
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='bg-white py-10'>
          <div className='container'>
            <div className='row'>
              <div className='h-[400px] w-full bg-not-found bg-center bg-no-repeat object-cover'>
                <h1 className='text-center text-[80px]'>500</h1>
              </div>
              <div className='text-center'>
                <h3 className='text-[40px]'>Look like you're lost</h3>
                <p className='mb-7 mt-2'>the page you are looking for not avaible!</p>
                <a href='/' className='bg-orange py-2 px-5 text-white hover:bg-orange/90'>
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
