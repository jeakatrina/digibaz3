import Container from '@/components/layouts/web/Container'
import { FC } from 'react'
import SettingsClient from './components/SettingsClient'
import { User } from '@prisma/client'
import { validateRequest } from '@/auth'
import db from '@/lib/db'


// interface pageProps {
//     // params: {
//     //     userId: string
//     // }
// }

const page = async ({
    // params
}) => {

    const session = await validateRequest()

    const getUserData = await db.user.findUnique({
        where: {
            id: session.user?.id
        }
    })

    return (
        <div className='pt-[64px] px-4'>
            <Container>
                <SettingsClient userData={getUserData} />
            </Container>
        </div>
    )
}

export default page