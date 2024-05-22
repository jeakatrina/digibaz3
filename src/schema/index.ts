import * as z from 'zod'

export const registerUserSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    username: z.string().min(5, {
        message: 'Must have at least 5 characters'
    }),
    name: z.string().min(1, {
        message: 'Enter your full name'
    }),
    password: z.string().min(8, {
        message: 'Must have at least 8 characters'
    }),
    confirmPassword: z.string().min(1, {
        message: 'Enter the same password'
    }),
    userType: z.string().min(1, {
        message: 'Select a user type'
    }),
})

export const loginUserSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(8, {
        message: 'Must have at least 8 characters'
    }),
})

export const userSettingsSchema = z.object({
    name: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    bio: z.string().max(100, {
        message: 'Characters cannot exceed over 100'
    }).optional(),
    avatar: z.string().optional(),
    facebookLink: z.string().optional(),
    instagramLink: z.string().optional(),
    gmailLink: z.string().optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
})

export const bioFormSchema = z.object({
    bio: z.string().max(100,
        {
            message: 'Characters cannot exceed over 100'
        }
    ),
})

export const avatarFormSchema = z.object({
    imageUrl: z.string()
})

export const serviceFormSchema = z.object({
    name: z.string().min(1, {
        message: 'Title is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    }),
    startingPrice: z.coerce.number().min(1),
})

export const artworkFormSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'

    }),
    serviceId: z.string().min(1, {
        message: 'Service is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    }),
    startingPrice: z.coerce.number().min(1, {
        message: 'Price is required'
    }),
})

export const editArtworkFormSchema = z.object({
    title: z.string().optional(),
    serviceId: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    startingPrice: z.coerce.number().optional(),
})

export const editServiceFormSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    startingPrice: z.coerce.number().optional(),
})