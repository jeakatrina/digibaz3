import { FC } from 'react'
import { User } from '@prisma/client'
import Link from 'next/link'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Sparkles } from 'lucide-react'

interface InterestedButtonProps {
    userData: User | null
}

const InterestedButton: FC<InterestedButtonProps> = ({
    userData
}) => {
    return (
        <Sheet>
            <SheetTrigger className='bg-[#8889DA] px-4 py-2 rounded-full flex flex-row items-center justify-center'>
                <Sparkles size={20} className='mr-2' /> Interested!
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Contact
                    </SheetTitle>
                    <SheetDescription>
                        {userData?.name}
                    </SheetDescription>
                </SheetHeader>
                <ul className='space-y-4 mt-4 text-sm'>
                    <li
                        onClick={() => window.open(userData?.instagramLink || '', '_blank')}
                        className='cursor-pointer'
                    >
                        Instagram
                    </li>
                    <li>
                        <Link
                            href={`mailto:${userData?.gmailLink}`}
                        >
                            Gmail
                        </Link>
                    </li>
                    <li
                        onClick={() => window.open(userData?.facebookLink || '', '_blank')}
                        className='cursor-pointer'
                    >
                        Facebook
                    </li>
                </ul>


            </SheetContent>
        </Sheet>

    )
}

export default InterestedButton