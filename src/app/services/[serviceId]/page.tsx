
import Container from '@/components/layouts/web/Container'
import { FC } from 'react'
import ServiceClient from './components/ServiceClient'
import db from '@/lib/db'

interface pageProps {
    params: {
        serviceId: string
    }
}

const page: FC<pageProps> = async ({
    params
}) => {

    const getService = await db.services.findUnique({
        where: {
            id: params.serviceId
        }
    })

    // const getServiceName = getService?.name || null
    // const getServiceDescription = getService?.description || null
    // const getServiceStartingPrice = getService?.startingPrice || null
    // const getServiceThumbnail = getService?.thumbnail || null

    const getUser = await db.user.findUnique({
        where: {
            id: getService?.userId
        }
    })

    //TODO: make services grid

    const getServices = await db.services.findMany({
        where: {
            userId: getUser?.id
        },
        include: {
            user: true
        }
    })

    const getArtworks = await db.artwork.findMany({
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
                    <ServiceClient
                        // name={getServiceName}
                        // description={getServiceDescription}
                        // startingPrice={getServiceStartingPrice}
                        // thumbnail={getServiceThumbnail}
                        serviceData={getService}
                        servicesData={getServices}
                        artworksData={getArtworks}
                        userData={getUser}
                    />
                </Container>
            </div>
        </div>
    )
}

export default page