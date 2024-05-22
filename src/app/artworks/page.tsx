import { FC } from 'react'
import Container from '@/components/layouts/web/Container'
import { Artwork } from '@prisma/client'
import ArtworksClient from './components/ArtworksClient'
import db from '@/lib/db'

const page = async () => {

    const getArtworks = await db.artwork.findMany({
        include: {
            user: true
        }
    })
    return (
        <div className='py-[64px]'>
            <Container>
                <ArtworksClient artworks={getArtworks} />
            </Container>
        </div>
    )
}

export default page