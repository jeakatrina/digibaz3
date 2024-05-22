"use client"
import { FC } from 'react'

interface ContentSectionProps {
    children: React.ReactNode
}

const ContentSection: FC<ContentSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-fit rounded-sm bg-[#1E1F57] px-8 py-4'>{children}</div>
    )
}

export default ContentSection