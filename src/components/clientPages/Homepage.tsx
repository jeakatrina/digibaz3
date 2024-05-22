import { FC } from 'react'
import { Button } from '../ui/button'

interface HomepageProps {

}

const Homepage: FC<HomepageProps> = ({ }) => {
    return (
        <div className='flex h-screen justify-center items-center flex-col space-y-4'>
            <h1 className='font-bold text-4xl md:text-7xl text-center'>Your Gateway <br />to the Digital <br />Art Realm.</h1>
            <Button className='w-[30%] md:py-10 rounded-full md:text-2xl'>Explore</Button>
        </div>
    )
}

export default Homepage