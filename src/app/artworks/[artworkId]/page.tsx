
import Container from '@/components/layouts/web/Container'
import { FC } from 'react'
import db from '@/lib/db'
import ArtworkClient from './components/ArtworkClient'

interface pageProps {
    params: {
        artworkId: string
    }
}

const page: FC<pageProps> = async ({
    params
}) => {

    const getArtwork = await db.artwork.findUnique({
        where: {
            id: params.artworkId
        }
    })

    // const getServiceName = getService?.name || null
    // const getServiceDescription = getService?.description || null
    // const getServiceStartingPrice = getService?.startingPrice || null
    // const getServiceThumbnail = getService?.thumbnail || null

    const getUser = await db.user.findUnique({
        where: {
            id: getArtwork?.userId
        }
    })

    //TODO: make services grid

    const getArtworks = await db.artwork.findMany({
        where: {
            userId: getUser?.id
        },
        include: {
            user: true
        }
    })

    const getService = await db.services.findUnique({
        where: {
            id: getArtwork?.serviceId
        }
    })

    const getServices = await db.services.findMany({
        where: {
            userId: getUser?.id
        },
        include: {
            user: true
        }
    })

    return (
        <div className='py-[64px] flex flex-col min-h-screen text-primary-foreground'>
            <div className="flex-grow">
                <Container>
                    <ArtworkClient
                        // name={getServiceName}
                        // description={getServiceDescription}
                        // startingPrice={getServiceStartingPrice}
                        // thumbnail={getServiceThumbnail}
                        artworkData={getArtwork}
                        artworksData={getArtworks}
                        serviceData={getService}
                        servicesData={getServices}
                        userData={getUser}
                    />
                </Container>
            </div>
        </div>
    )
}

export default page