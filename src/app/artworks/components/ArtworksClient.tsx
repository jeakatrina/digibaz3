"use client"

import ContentSection from '@/components/layouts/web/ContentSection'
import Header from '@/components/ui/Header'
import { useSession } from '@/lib/auth/SessionContext'

import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { Artwork } from '@prisma/client'
import { ArtworkWithUser } from '@/types'
import { getArtworks } from '@/actions/artwork.actions'
import ArtworkCard from '@/components/ui/cards/ArtworkCard'

interface ArtworksClientProps {
    artworks: Artwork[]
}

const ArtworksClient: FC<ArtworksClientProps> = ({ }) => {

    const [artworks, setArtworks] = useState<ArtworkWithUser[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('none');
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);

    const session = useSession()

    useEffect(() => {
        const fetchArtworks = async () => {
            const result = await getArtworks()
            setArtworks(result.artworks)
        }
        fetchArtworks()
    }, [])

    const filteredArtworks = artworks.filter(artwork =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedArtworks = [...filteredArtworks]
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

    const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);


    return (
        <div className='h-full w-full py-[64px]'>
            <div className="space-y-4">
                <Header title='Browse Artworks' />
                <ContentSection>
                    <div className="w-full space-x-4 flex flex-row justify-start items-center text-black">
                        <Input
                            className='w-1/4'
                            type='text'
                            placeholder='Search for artworks'
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
                            {sortedArtworks.map((artwork) => (
                                <ArtworkCard key={artwork.id} data={artwork} />
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

export default ArtworksClient