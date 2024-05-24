"use client"

import { getArtworks } from '@/actions/artwork.actions'
import { getServices } from '@/actions/services.actions'
import ContentSection from '@/components/layouts/web/ContentSection'
import HeaderSection from '@/components/layouts/web/HeaderSection'
import SideSection from '@/components/layouts/web/SideSection'
import ArtworkCard from '@/components/ui/cards/ArtworkCard'
import ServiceCard from '@/components/ui/cards/ServicesCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArtworkWithUser, ServiceWithUser } from '@/types'
import { Artwork, Services, User } from '@prisma/client'
import { ArrowUpRight, ChevronRight, MoreHorizontal, SparkleIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import InterestedButton from '@/components/InterestedButton'

interface ArtworkClientProps {
    // name: string | null
    // description: string | null
    // startingPrice: number | null
    // thumbnail: string | null
    artworkData: Artwork | null
    artworksData: Artwork[] | null
    serviceData: Services | null
    servicesData: Services[] | null
    userData: User | null
}

const ArtworkClient: FC<ArtworkClientProps> = ({
    artworkData,
    artworksData,
    serviceData,
    servicesData,
    userData
}) => {

    const [artworks, setArtworks] = useState<ArtworkWithUser[]>([]);
    const [services, setServices] = useState<ServiceWithUser[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchArtworks = async () => {
            const result = await getArtworks()
            setArtworks(result.artworks)
        }
        fetchArtworks()
    }, [])

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getServices()
            setServices(result.services)
        }
        fetchServices()
    }, [])

    const totalPages = Math.ceil(services.length / itemsPerPage);

    const toUserProfile = () => {
        window.location.href = `/profile/${userData?.id}`
    }

    return (
        <div className='px-4 py-4 flex flex-col w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:px-0'>

            {/* service data */}
            <div className="w-full space-y-4 md:w-3/4">
                <HeaderSection>

                    <div className='flex flex-col md:flex-row'>

                        {/* mobile */}
                        <div className="relative w-full md:w-3/5 md:hidden ">
                            <AspectRatio ratio={4 / 3}>
                                <Image src={artworkData?.imageUrl || ''} fill alt='users profile' objectFit='cover' />
                            </AspectRatio>
                        </div>
                        {/* desktop */}
                        <div className="relative w-full md:w-3/5 hidden md:block md:min-h-[500px]">
                            <Image src={artworkData?.imageUrl || ''} fill alt="test" objectFit='cover' />
                        </div>
                        <div className='w-full px-4 my-4 space-y-4 md:w-2/5 md:py-0'>
                            <div className='w-full space-y-0'>
                                <h1 className="text-2xl font-semibold md:text-4xl">
                                    {artworkData?.title}
                                </h1>
                            </div>

                            <p className='text-sm md:text-base'>
                                {artworkData?.description.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                            <Separator />

                            {/* web */}
                            <div className="space-y-2 hidden md:block">
                                <p className='mx-auto text-md font-extralight md:text-xl'>Price: <span className='font-semibold text-orange-300'>₱ {artworkData?.startingPrice}</span></p>
                                <InterestedButton userData={userData} />
                            </div>
                            <div className="space-y-2 w-full flex flex-col md:hidden">
                                <p className='mx-auto text-md font-extralight md:text-xl'>Price: <span className='font-semibold text-orange-300'>₱ {artworkData?.startingPrice}</span></p>
                                <InterestedButton userData={userData} />
                            </div>
                        </div>
                    </div>
                </HeaderSection>

                {/* artworks under service display mobile */}
                {artworks
                    .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === artworkData?.id)
                    .length > 0 && (
                        <div className='hidden md:block'>
                            <ContentSection>
                                <div className="min-h-full h-fit space-y-4">
                                    <div className="flex flex-row w-full items-center justify-between">
                                        <h2 className='text-xl'>Available artworks under {serviceData?.name}</h2>
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .length > 4 && (
                                                <Link
                                                    href={`/services/${userData?.id}`}
                                                    className='text-sm flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                                >See More <ChevronRight className='ml-2' size={25} /></Link>
                                            )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .slice(0, 4)
                                            .map((artwork, i) => (
                                                <ArtworkCard key={artwork.id} data={artwork} />
                                            ))}
                                    </div>


                                </div>
                            </ContentSection>
                        </div>
                    )}

                {/* display more services web */}
                <div className="hidden md:block">
                    <ContentSection>
                        <h2 className='text-xl'>Explore more artworks</h2>
                        <div className='min-h-[1000px] flex flex-col space-y-2 mx-auto mt-4'>
                            <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
                                {artworks
                                    .filter(artwork => artwork.id !== artworkData?.id)
                                    .sort(() => Math.random() - 0.5)
                                    .map((artwork) => (
                                        <ArtworkCard key={artwork.id} data={artwork} />
                                    ))
                                }
                            </div>
                        </div>
                        <Pagination className='mx-auto my-4'>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className='text-primary-foreground cursor-pointer'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                                        }}
                                    />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                                    if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)) {
                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    className={
                                                        cn(currentPage === pageNumber ? 'bg-primary-foreground text-black' : 'text-primary-foreground')
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(pageNumber);
                                                    }}
                                                    isActive={pageNumber === currentPage}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                                        return <PaginationItem key={pageNumber}>...</PaginationItem>;
                                    } else {
                                        return null;
                                    }
                                })}
                                <PaginationItem>
                                    <PaginationNext
                                        className='text-primary-foreground cursor-pointer'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage((prev) => prev + 1);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </ContentSection>
                </div>
            </div>

            <div className='w-full space-y-4 md:w-1/4'>
                {/* user profile */}
                <HeaderSection>
                    <div
                        onClick={toUserProfile}
                        className="space-y-4 cursor-pointer"
                    >
                        <div className="w-full flex flex-row justify-start items-center">
                            <div className='aspect-square relative h-[80px] md:h-[100px]'>
                                <Image src={userData?.image || ''} fill alt="test" objectFit='cover' />
                            </div>


                            <div className='ml-4'>
                                <p className="text-xs">Artist</p>
                                <p className='text-2xl font-semibold md:text-lg'>{userData?.username}</p>
                                <p className='text-xs'>view profile</p>
                            </div>

                        </div>
                    </div>
                </HeaderSection>

                <SideSection>
                    {/* recent artworks from user display */}
                    <div className="w-full flex flex-row justify-between items-center py-2">
                        <h4 className='text-sm md:text-base'>Recent from {userData?.username}</h4>
                        {artworks
                            .filter(artwork => artwork.userId === userData?.id && artwork.id !== artworkData?.id)
                            .length > 4 && (
                                <Link
                                    href={`/services/${userData?.id}`}
                                    className='text-xs flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                >See More <ChevronRight className='ml-2' /></Link>
                            )}
                    </div>

                    {/* recent services from same user display mobile */}
                    <Carousel
                        className='md:hidden'
                    >
                        <CarouselContent>
                            {artworks.filter(artwork => artwork.userId === userData?.id && artwork.id !== artworkData?.id).slice(0, 4).map((artwork, i) => (
                                <CarouselItem key={artwork.id} className='basis-1/2'>
                                    <ArtworkCard data={artwork} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className='hidden md:grid mt-4 md:space-y-4'>
                        {artworks.filter(artwork => artwork.userId === userData?.id && artwork.id !== artworkData?.id).slice(0, 4).map((artwork, i) => (
                            <ArtworkCard key={artwork.id} data={artwork} />
                        ))}
                    </div>
                    {/* <div>
                        <Link
                            href={`/services/${userData?.id}`}
                            className='text-sm flex flex-row items-center justify-end md:pt-4 hover:text-[#8889DA]'
                        >See More <ChevronRight className='ml-2' size={25} /></Link>
                    </div> */}
                </SideSection>

                {/* artworks under service display desktop */}
                {/* {artworks
                    .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                    .length > 0 && (
                        <div className='block md:hidden'>
                            <ContentSection>
                                <div className="min-h-full h-fit space-y-4">

                                    <h2 className='text-sm md:text-xl'>Available artworks under {serviceData?.name}</h2>

                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .slice(0, 4)
                                            .map((artwork, i) => (
                                                <ArtworkCard key={artwork.id} data={artwork} />
                                            ))}
                                    </div>

                                    {artworks
                                        .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                        .length > 4 && (
                                            <Link
                                                href={`/services/${userData?.id}`}
                                                className='text-xs flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                            >See More <ChevronRight className='ml-2' size={25} /></Link>
                                        )}
                                </div>
                            </ContentSection>
                        </div>
                    )} */}
            </div>

            {/* display more services mobile */}
            <div className="block md:hidden">
                <ContentSection>
                    <h2 className='text-xl'>Explore more artworks</h2>
                    <div className='min-h-[1000px] flex flex-col space-y-2 mx-auto mt-4'>
                        <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>

                            {/* {services
                                .filter(service => service.userId !== userData?.id)
                                .sort(() => Math.random() - 0.5)
                                .map((service) => (
                                    <ServiceCard key={service.id} data={service} />
                                ))
                            } */}
                            {artworks
                                .filter(artwork => artwork.id !== artworkData?.id)
                                .sort(() => Math.random() - 0.5)
                                .map((artwork) => (
                                    <ArtworkCard key={artwork.id} data={artwork} />
                                ))
                            }
                        </div>
                    </div>
                    <Pagination className='mx-auto my-4'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className='text-primary-foreground cursor-pointer'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                                    }}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)) {
                                    return (
                                        <PaginationItem key={pageNumber}>
                                            <PaginationLink
                                                className={
                                                    cn(currentPage === pageNumber ? 'bg-primary-foreground text-black' : 'text-primary-foreground')
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(pageNumber);
                                                }}
                                                isActive={pageNumber === currentPage}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                                    return <PaginationItem key={pageNumber}>...</PaginationItem>;
                                } else {
                                    return null;
                                }
                            })}
                            <PaginationItem>
                                <PaginationNext
                                    className='text-primary-foreground cursor-pointer'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage((prev) => prev + 1);
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </ContentSection>
            </div>
        </div>


    )
}

export default ArtworkClient