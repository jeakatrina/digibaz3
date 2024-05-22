"use server"

import { Argon2id } from 'oslo/password'
import * as z from 'zod';
import { artworkFormSchema, avatarFormSchema, bioFormSchema, serviceFormSchema, userSettingsSchema } from "@/schema";
import db from '@/lib/db';
import { validateRequest } from '@/auth';

export const uploadAvatar = async (values: z.infer<typeof avatarFormSchema>) => {
    const { imageUrl } = values;
    console.log('Received imageUrl:', imageUrl); // Log received imageUrl

    try {
        const session = await validateRequest();
        const sessionId = session.user?.id;

        const existingUser = await db.user.findFirst({
            where: {
                id: sessionId
            }
        });

        if (!existingUser) {
            return {
                error: 'Unauthorized'
            };
        } else {
            await db.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    image: imageUrl
                }
            });
            console.log('Avatar updated successfully');
            return {
                success: 'Avatar updated successfully'
            };
        }
    } catch (error) {
        console.error('Error updating avatar:', error); // Log any errors
        return {
            error: 'An error occurred while updating the avatar'
        };
    }
};


export const addBio = async (values: z.infer<typeof bioFormSchema>) => {

    const { bio } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: sessionId
            },
            data: {
                bio
            }
        })
        return {
            success: 'Bio added successfully'
        }
    }
}

export const addService = async (values: z.infer<typeof serviceFormSchema>) => {

    const { name, description, imageUrl, startingPrice } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.services.create({
            data: {
                name: name,
                description: description,
                thumbnail: imageUrl,
                startingPrice: startingPrice,
                userId: existingUser.id
            }
        })
        return {
            success: 'Service added successfully'
        }
    }
}

export const addArtwork = async (values: z.infer<typeof artworkFormSchema>) => {

    const { title, serviceId, description, imageUrl, startingPrice } = values
    const session = await validateRequest()

    const sessionId = session.user?.id


    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    const existingService = await db.services.findFirst({
        where: {
            id: serviceId
        }
    })

    if (!existingUser || !existingService) {
        return {
            error: 'Unauthorized'
        }

    } else {
        await db.artwork.create({
            data: {
                title: title,
                serviceId,
                startingPrice,
                description: description,
                imageUrl: imageUrl,
                userId: existingUser.id,
            }
        })
        return {
            success: 'Artwork added successfully'
        }
    }
}

export const editArtwork = async (values: z.infer<typeof artworkFormSchema>, artworkId: string) => {
    const { title, serviceId, description, imageUrl, startingPrice } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (sessionId !== existingUser?.id) {
        return {
            error: 'Unauthorized'
        }
    }

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.artwork.update({
            where: {
                id: artworkId
            },
            data: {
                title,
                serviceId,
                startingPrice,
                description,
                imageUrl
            }
        })
        return {
            success: 'Artwork updated successfully'
        }
    }
}

export const editService = async (values: z.infer<typeof serviceFormSchema>, serviceId: string) => {

    const { name, description, imageUrl, startingPrice } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (sessionId !== existingUser?.id) {
        return {
            error: 'Unauthorized'
        }
    }

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.services.update({
            where: {
                id: serviceId
            },
            data: {
                name,
                description,
                thumbnail: imageUrl,
                startingPrice
            }
        })
        return {
            success: 'Service updated successfully'
        }
    }
}

export const editProfile = async (values: z.infer<typeof userSettingsSchema>) => {
    const { name, username, avatar, bio, facebookLink, instagramLink, gmailLink, password, newPassword, confirmNewPassword } = values

    const session = await validateRequest()
    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        const updatedData: any = {
            name,
            username,
            facebookLink,
            instagramLink,
            gmailLink,
            image: avatar,
            bio
        }

        if (typeof password !== 'string' || typeof newPassword !== 'string' || typeof confirmNewPassword !== 'string') {
            return {
                error: 'Invalid input'
            }
        }


        if (newPassword) {
            if (newPassword !== confirmNewPassword) {
                return {
                    error: 'New password does not match'
                }
            } else {

                const validPassword = await new Argon2id().verify(existingUser.password, password)

                if (validPassword) {
                    const hashedPassword = await new Argon2id().hash(newPassword)
                    updatedData.password = hashedPassword
                } else {
                    return {
                        error: 'Password is incorrect'
                    }
                }
            }
        }


        await db.user.update({
            where: {
                id: existingUser.id
            },
            data: updatedData
        })

        return {
            success: 'Profile updated successfully'
        }
    }
}

export const editBio = async (values: z.infer<typeof bioFormSchema>) => {

    const { bio } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                bio
            }
        })
        return {
            message: 'Bio updated successfully'
        }
    }
}