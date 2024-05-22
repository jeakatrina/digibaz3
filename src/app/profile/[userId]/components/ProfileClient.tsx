"use client"

import ProfileSection from '@/components/layouts/web/ProfileSection'
import ContentSection from '@/components/layouts/web/ContentSection'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth/SessionContext'
import { Artwork, Services, User } from '@prisma/client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import EditBioForm from './forms/EditBioForm'
import ProfileImageUpload from './ProfileImageUpload'
import { Edit, User as UserIcon } from 'lucide-react'
import EditProfileForm from './forms/EditProfileForm'
import ServiceForm from './forms/ServiceForm'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ArtworkForm from './forms/ArtworkForm'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import EditArtworkForm from './forms/EditArtworkForm'
import EditServiceForm from './forms/EditServiceForm'
import ContactButton from '@/components/ContactButton'

interface ProfileClientProps {
    name: string | null
    userName: string | null
    bio: string | null
    date: string | null
    image: string | null
    artworks: any | null
    services: any | null
    userData: User | null
    userType: string | null
    servicesData: Services | null
}

const ProfileClient: FC<ProfileClientProps> = ({
    name,
    userName,
    bio,
    image,
    artworks,
    services,
    userData,
    userType,
    servicesData
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const pathName = usePathname()
    const session = useSession()
    const isCurrentUser = session?.user?.name === name

    console.log(session)

    return (
        <div className='h-auto space-y-4'>

            {/* web */}
            {/* profile header */}
            <ProfileSection>
                <div className='hidden lg:flex flex-row h-full'>
                    <div className='w-1/3 h-full flex items-center justify-center overflow-hidden'>
                        <div className='relative  w-[250px] h-[250px] rounded overflow-hidden'>
                            {image && image.length >= 1 ? (
                                <>
                                    <div className='overflow-hidden aspect-square'>
                                        <Image src={image} fill objectFit='cover' className='rounded-full' alt={`${name}'s image`} />
                                    </div>
                                    {isCurrentUser && session && (
                                        <Button className='absolute bottom-0 right-0 mb-2 mr-2 bg-[#8889DA] text-white font-bold py-2 px-4 rounded  transition-opacity duration-200'>
                                            <Edit size={24} />
                                        </Button>
                                    )}
                                </>
                            ) : (
                                isCurrentUser && session ? (
                                    <div className='w-[250px] h-[250px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <ProfileImageUpload />
                                    </div>
                                ) : (
                                    <div className='w-[250px] h-[250px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <UserIcon size={200} color='white' />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className='w-2/3 flex flex-col justify-center space-y-4 px-4'>
                        <div className='flex flex-row items-end'>
                            <h2 className='text-4xl font-semibold'>{name}</h2> <span className='ml-4 text-sm text-slate-400'>{userName}</span>
                        </div>

                        <div>
                            {bio && bio.length > 0 ? (
                                <p>{bio}</p>
                            ) : (
                                isCurrentUser && session ? <EditBioForm /> : null
                            )}
                        </div>

                        {isCurrentUser && session && session.user ? (
                            session.user.type && userType === "ARTIST" ? (
                                <div className='flex flex-row space-x-4 my-4'>
                                    <EditProfileForm userData={userData} />
                                    <ArtworkForm services={services} />
                                    <ServiceForm />
                                </div>
                            ) : (
                                <div className='flex flex-row space-x-4 my-4'>
                                    <EditProfileForm userData={userData} />
                                </div>
                            )
                        ) : (
                            <div>
                                <ContactButton userData={userData} />
                            </div>
                        )}


                        {userType === "ARTIST" ? (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div>
                                    <p>Artworks: {artworks.length > 0 ? <span>{artworks.length}</span> : 'None'}</p>
                                </div>

                                <div>
                                    <p>Services: {services.length > 0 ? <span>{services.length}</span> : 'None'}</p>
                                </div>

                                <div>
                                    <p>Joined: {userData?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div>
                                    <p>Joined: {userData?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* mobile */}

                <div className='lg:hidden flex flex-col h-full space-y-2'>
                    <div className='w-full h-full flex items-center justify-start overflow-hidden'>
                        <div className='relative  w-[90px] h-[90px] rounded overflow-hidden'>
                            {image && image.length >= 1 ? (
                                <>
                                    <div className='overflow-hidden aspect-square'>
                                        <Image src={image} fill objectFit='cover' className='rounded-full' alt={`${name}'s image`} />
                                    </div>
                                    {/* edit pfp button wip */}
                                    {/* {isCurrentUser && session && (
                                        <Button className='absolute bottom-0 right-0 mb-2 mr-2 bg-[#8889DA] text-white font-bold py-2 px-4 rounded  transition-opacity duration-200'>
                                            <Edit size={24} />
                                        </Button>
                                    )} */}
                                </>
                            ) : (
                                isCurrentUser && session ? (
                                    <div className='w-[90px] h-[90px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <ProfileImageUpload />
                                    </div>
                                ) : (
                                    <div className='w-[90px] h-[90px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <UserIcon size={80} color='white' />
                                    </div>
                                )
                            )}
                        </div>
                        <div className='flex flex-col text-left items-start ml-4'>
                            <h2 className='text-xl font-semibold'>{name}</h2> <span className='text-sm text-slate-400'>{userName}</span>
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center space-y-4'>
                        <div>
                            {bio && bio.length > 0 ? (
                                <p className='text-sm mt-4'>{bio}</p>
                            ) : (
                                isCurrentUser && session ? <EditBioForm /> : null
                            )}
                        </div>

                        {isCurrentUser && session && session.user ? (
                            session.user.type && userType === "ARTIST" ? (
                                <div className='flex flex-row space-x-4 my-4 '>
                                    <EditProfileForm userData={userData} />
                                    <ArtworkForm services={services} />
                                    <ServiceForm />
                                </div>
                            ) : (
                                <div className='flex flex-row space-x-4 my-4'>
                                    <EditProfileForm userData={userData} />
                                </div>
                            )
                        ) : (
                            <div>
                                <Button className='px-4 py-1 rounded-full bg-[#8889DA]'>Contact</Button>
                            </div>
                        )}


                        {userType === "ARTIST" ? (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div >
                                    <p>Artworks: {artworks.length > 0 ? <span>{artworks.length}</span> : 'None'}</p>
                                </div>

                                <div >
                                    <p>Services: {services.length > 0 ? <span>{services.length}</span> : 'None'}</p>
                                </div>

                                <div >
                                    <p>Joined: {userData?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div>
                                    <p>Joined: {userData?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ProfileSection>

            {/* Services */}
            {/* Services */}
            <ContentSection>
                <h3 className='text-xl'>Services</h3>
                {services && services.length > 0 ? (
                    <Carousel className="w-full max-w-sm md:max-w-2xl xl:max-w-6xl mx-auto mt-4">
                        <CarouselContent>
                            {services.map((service: Services) => (
                                <CarouselItem key={service.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                                    <div className='group cursor-pointer rounded-lg shadow-sm border border-transparent hover:border-white transition-all duration-200 overflow-hidden text-primary-foreground h-full bg-primary/40 pb-2'>
                                        <Link href={`/services/${service.id}`} target='_blank'>
                                            <div className='aspect-square bg-slate-100 relative overflow-hidden'>
                                                <Image src={service.thumbnail} fill objectFit='cover' alt={service.name} className='aspect-square object-cover' />
                                            </div>
                                            <div className='px-2 py-2'>
                                                <h4 className="mt-2 font-semibold">
                                                    {service.name}
                                                </h4>
                                                <p className='font-extralight text-slate-400'>
                                                    ₱ {service.startingPrice}
                                                </p>
                                            </div>
                                        </Link>
                                        {isCurrentUser && session && (
                                            <div className="px-2">
                                                <EditServiceForm serviceData={service} />
                                            </div>
                                        )}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='text-primary' />
                        <CarouselNext className='text-primary' />
                    </Carousel>
                ) : (
                    <div className='flex flex-col items-center justify-center space-y-4 h-[400px]'>
                        <h3 className='text-xl'>No services available</h3>
                    </div>
                )}
            </ContentSection>


            {/* artworks */}
            <ContentSection>
                <h3 className='text-xl'>Artworks</h3>
                {artworks && artworks.length > 0 ? (
                    <div className="min-h-[1000px]">
                        <div className='grid grid-cols-2 gap-4 pt-4 md:grid-cols-4 lg:grid-cols-5 min-h-fit'>
                            {artworks.map((artwork: Artwork) => (
                                <div key={artwork.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6 relative ">
                                    <div className=' group cursor-pointer rounded-lg shadow-sm border border-transparent hover:border-white transition-all duration-200 overflow-hidden text-primary-foreground h-full pb-4 bg-primary/40 '>
                                        <Link
                                            href={`/artworks/${artwork.id}`}
                                            target='_blank'
                                        >
                                            <div className='aspect-square bg-slate-100 relative overflow-hidden'>
                                                <Image src={artwork.imageUrl} fill objectFit='cover' alt={artwork.title} className='aspect-square object-cover' />
                                            </div>
                                            <div className='px-2 py-2'>
                                                <h4 className="mt-2 font-semibold">
                                                    {artwork.title}
                                                </h4>
                                                <p className='font-extralight text-slate-400'>
                                                    ₱ {artwork.startingPrice}
                                                </p>
                                            </div>
                                        </Link>
                                        {isCurrentUser && session ? (
                                            <div className="px-2">
                                                <EditArtworkForm artworkData={artwork} servicesData={services} />
                                            </div>
                                        ) : ('')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center space-y-4 h-[400px]'>
                        <h3 className='text-xl'>No artworks available</h3>
                    </div>
                )}
            </ContentSection>
        </div >
    )
}

export default ProfileClient