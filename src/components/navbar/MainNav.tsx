"use client"

import { BookImage, HandCoins, LinkIcon, LogIn, LogOutIcon, SettingsIcon, SquareArrowUp, SquareArrowUpRight, User, UserIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../ui/tooltip'
import { cn } from '@/lib/utils'
import { useSession } from '@/lib/auth/SessionContext'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { LogoutButton } from '../auth/LogoutButton'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from '../ui/separator'


interface MainNavProps {

}

const MainNav: FC<MainNavProps> = ({ }) => {

    const pathName = usePathname()
    const session = useSession()

    // const getName = session.user?.name

    const nameInitials = session.user?.name.split(' ').map(word => word[0].toUpperCase()).join('');




    return (
        <nav>
            <ul className='flex flex-row space-x-4'>

                {/* services */}
                <li
                    className={
                        cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative ',
                            pathName === '/services' ? 'bg-primary-foreground' : 'bg-none')
                    }
                >
                    <Link href='/services'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <HandCoins className={cn(pathName === '/services' ? 'text-primary' : '')} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='mt-3'>
                                    Services
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>


                {/* Artworks */}
                <li
                    className={
                        cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative ',
                            pathName === '/artworks' ? 'bg-primary-foreground' : 'bg-none')
                    }
                >
                    <Link href='/artworks'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <BookImage className={cn(pathName === '/artworks' ? 'text-primary' : '')} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='mt-3'>
                                    Artworks
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
                {/* login */}
                {!session.user ? (
                    <li
                        className={
                            cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative',
                                pathName === '/login' ? 'bg-primary-foreground' : 'bg-none')
                        }
                    >
                        <Link href='/login'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <UserIcon className={cn(pathName === '/login' ? 'text-primary' : '')} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className='mt-3'>
                                        Login
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    </li>

                ) : (
                    <li
                        className={
                            cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative mr-4',
                                pathName === '/profile' ? 'bg-primary-foreground' : 'bg-none')
                        }>

                        <Popover>
                            <PopoverTrigger>
                                {/* <UserIcon className={
                                    cn(pathName === '/profile' ? 'text-primary' : 'bg-none')
                                } /> */}
                                <Avatar className='flex items-center justify-center'>
                                    <AvatarImage src={session.user.image} />
                                    <AvatarFallback>{nameInitials}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-md mt-2'>
                                <ul className='flex flex-col items-start space-y-2'>
                                    <div>
                                        <Link href={`/profile/${session.user.id}`} className='flex flex-row items-center justify-between px-4 py-4 hover:bg-muted rounded-sm transition-all ease-in mb-2'>
                                            <Avatar className='flex items-center justify-center mr-4'>
                                                <AvatarImage src={session.user.image} />
                                                <AvatarFallback>{nameInitials}</AvatarFallback>
                                            </Avatar>
                                            <span>
                                                <p>{session.user.name}</p>
                                                <p className='text-xs text-slate-700'>{session.user.email}</p>
                                            </span>
                                        </Link>
                                    </div>
                                    <Separator />


                                    <ul className='px-2 py-1 w-full space-y-2'>
                                        <li className='px-2 py-1 hover:bg-muted rounded-sm transition-all ease-in'>
                                            <Link href='/settings'>
                                                <span className='flex flex-row items-center'>
                                                    <SettingsIcon className='text-primary text-xs mr-2' size={19} /> Settings
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='px-2 py-1 hover:bg-muted rounded-sm transition-all ease-in'>
                                            <LogoutButton >
                                                <span className='flex flex-row items-center'>
                                                    <LogOutIcon className='text-primary text-xs mr-2' size={19} /> Logout
                                                </span>
                                            </LogoutButton>
                                        </li>
                                    </ul>

                                </ul>
                            </PopoverContent>
                        </Popover>


                        {/* <Popover>
                            <PopoverTrigger className='flex flex-row'>
                                <UserIcon />
                                <p style={{ whiteSpace: 'nowrap' }}>{session.user.name}</p>
                            </PopoverTrigger>
                            <PopoverContent>
                                <ul className='w-[150px] mt-2 space-y-4'>
                                    <li >
                                        <Link href='/profile' className='flex flex-row'>
                                            <User className='mr-4' />Profile
                                        </Link>
                                    </li>
                                    <li >
                                        <LogoutButton >
                                            <div className='flex flex-row'>
                                                <LogOutIcon className='mr-4' />Log out
                                            </div>
                                        </LogoutButton>
                                    </li>
                                </ul>


                            </PopoverContent>
                        </Popover> */}



                    </li>
                )
                }
            </ul>
        </nav>
    )
}

export default MainNav