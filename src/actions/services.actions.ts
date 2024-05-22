"use server"

import db from "@/lib/db"

export const getServices = async () => {
    const services = await db.services.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return {
        services
    }
}

export const getService = async (id: string) => {
    const service = await db.services.findUnique({
        where: {
            id
        },
        include: {
            user: true
        }
    })

    return {
        service
    }
}



export const getUser = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            services: true,
            artworks: true,
        }
    })

    return {
        user
    }
}