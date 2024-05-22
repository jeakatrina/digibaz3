import { FC } from 'react'
import ServicesClient from './components/ServicesClient'
import Container from '@/components/layouts/web/Container'
import { Services as ServicesDb } from '@prisma/client'
import db from '@/lib/db'



const page = async ({

}) => {

    const getService = await db.services.findMany({
        include: {
            user: true
        }
    })

    return (
        <div className='py-[64px]'>
            <Container>
                <ServicesClient services={getService} />
            </Container>
        </div>
    )
}

export default page