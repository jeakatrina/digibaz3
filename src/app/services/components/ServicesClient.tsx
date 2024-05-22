"use client"

import { getServices } from '@/actions/services.actions'
import ContentSection from '@/components/layouts/web/ContentSection'
import Header from '@/components/ui/Header'
import ServiceCard from '@/components/ui/cards/ServicesCard'
import { useSession } from '@/lib/auth/SessionContext'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { ServiceWithUser } from '@/types';
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

interface ServicesClientProps {
    services: ServiceWithUser[]
}

const ServicesClient: FC<ServicesClientProps> = ({ }) => {

    const [services, setServices] = useState<ServiceWithUser[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('none');
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);

    const session = useSession()

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getServices()
            setServices(result.services)
        }
        fetchServices()
    }, [])

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedServices = [...filteredServices]
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.startingPrice - b.startingPrice;
            } else if (sortOrder === 'desc') {
                return b.startingPrice - a.startingPrice;
            } else {
                return 0;
            }
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);


    return (
        <div className='h-full w-full py-[64px]'>
            <div className="space-y-4">
                <Header title='Browse Services' />
                <ContentSection>
                    <div className="w-full space-x-4 flex flex-row justify-start items-center text-black">
                        <Input
                            className='w-1/4'
                            type='text'
                            placeholder='Search for services'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select
                            onValueChange={(value) => setSortOrder(value)}
                        >
                            <SelectTrigger className='w-1/4'>
                                <SelectValue
                                    defaultValue={sortOrder}
                                    placeholder='Price'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='none'>Don&apos;t mind</SelectItem>
                                <SelectItem value='asc'>Low to High</SelectItem>
                                <SelectItem value='desc'>High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </ContentSection>
                <ContentSection>
                    <div className='min-h-[1000px] flex flex-col space-y-2 mx-auto mt-4'>
                        <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
                            {sortedServices.map((service) => (
                                <ServiceCard key={service.id} data={service} />
                            ))}
                        </div>
                    </div>

                </ContentSection>
                <ContentSection>
                    <Pagination className='mx-auto'>
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

export default ServicesClient