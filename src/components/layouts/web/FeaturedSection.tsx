"use client"
import { FC } from 'react'

interface FeaturedSectionProps {
    children: React.ReactNode
}

const FeaturedSection: FC<FeaturedSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full mx-auto rounded-sm px-8 py-4 md:w-3/5 space-y-8'>{children}</div>
    )
}

export default FeaturedSection