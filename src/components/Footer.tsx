import { FC } from 'react'
import Container from './layouts/web/Container'
import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
    return (
        <footer className='w-full h-full py-4 text-center text-primary-foreground text-xs bg-slate-900'>
            <Container>
                <div className="flex flex-row justify-between mx-4 2xl:mx-0">
                    © 2024 Digital Bazaaar All rights reserved.
                    <ul className='space-x-2 flex flex-row h-full items-center justify-center'>
                        <li>
                            <Link href='/FAQ'>
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href='https://www.instagram.com'>
                                Instagram
                            </Link>
                        </li>
                        {/* <li className='flex flex-row items-center justify-center w-full space-x-4'>
                            <span>stay updated:</span>
                            <Input type='email' placeholder='Email' />
                            <Button>submit</Button>
                        </li> */}
                    </ul>
                </div>
            </Container>
        </footer>
    )
}

export default Footer