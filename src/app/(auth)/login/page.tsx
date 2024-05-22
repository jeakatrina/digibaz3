import LoginForm from '@/components/auth/LoginForm'
import Container from '@/components/layouts/web/Container'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
            <div className='h-[600px] w-[600px] absolute top-[-9rem] left-[-9rem] bg-[#AAD9D9] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
            <div className='h-[600px] w-[600px] absolute bottom-[-9rem] right-[-9rem] bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
            <Container>
                <div className='flex items-center justify-center h-screen w-full relative z-10'>
                    <LoginForm />
                </div>
            </Container>
        </div>
    )
}

export default page