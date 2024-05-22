"use server"

import db from "@/lib/db"

export const getArtists = async () => {
    const users = await db.user.findMany({
        where: {
            type: "ARTIST"
        },
        include: {
            artworks: true,
            services: true
        }
    })

    return {
        users
    }
}

export const getArtist = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id,
            type: "ARTIST"
        },
        include: {
            artworks: true,
            services: true
        }
    })

    return {
        user
    }
}