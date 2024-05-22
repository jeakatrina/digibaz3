"use client"

import { FC, useEffect, useState } from 'react'
import Container from '../layouts/web/Container'
import MainNav from './MainNav'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {


    return (
        <div className='w-full fixed top-0 left-0 z-50 backdrop-blur border-b bg-slate-500 bg-clip-padding backdrop-filter bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100' >
            <Container>
                <div className='text-primary-foreground flex flex-row w-full items-center justify-between h-[64px] px-4'>
                    <Link href='/'>
                        <div className='relative h-[50px] w-[50px] overflow-hidden'>
                            <Image
                                src='/images/dblogo2png.png'
                                alt='logo'
                                fill
                                objectFit='cover'
                            />

                        </div>
                    </Link>
                    <div>
                        <MainNav />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar