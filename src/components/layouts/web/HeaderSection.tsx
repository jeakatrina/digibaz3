"use client"
import { FC } from 'react'

interface HeaderSectionProps {
    children: React.ReactNode
}

const HeaderSection: FC<HeaderSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-fit rounded-sm bg-[#1E1F57] overflow-hidden'>{children}</div>
    )
}

export default HeaderSection