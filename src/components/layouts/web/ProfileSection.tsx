"use client"
import { FC } from 'react'

interface ProfileSectionProps {
    children: React.ReactNode
}

const ProfileSection: FC<ProfileSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-fit rounded-sm bg-[#1E1F57] px-6 py-6'>{children}</div>
    )
}

export default ProfileSection