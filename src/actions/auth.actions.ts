"use server"


import * as z from 'zod';
import { loginUserSchema, registerUserSchema } from "@/schema";
import { Argon2id } from 'oslo/password'
import { lucia, validateRequest } from '@/auth'
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export const register = async (values: z.infer<typeof registerUserSchema>) => {
    const { email, name, username, password, confirmPassword, userType } = values;

    const existingUser = await db.user.findFirst({
        where: {
            email
        }
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
    }

    const hashedPassword = await new Argon2id().hash(password)

    if (userType === 'customer') {
        await db.user.create({
            data: {
                email,
                name,
                username,
                password: hashedPassword,
                type: 'CUSTOMER'
            }
        })
        return redirect('/login')
    } else if (userType === 'artist') {
        await db.user.create({
            data: {
                email,
                name,
                username,
                password: hashedPassword,
                type: 'ARTIST'
            }
        })
        return redirect('/login')
    } else {
        return {
            error: 'Please select a user type'
        }
    }
}

export const login = async (values: z.infer<typeof loginUserSchema>) => {

    const { email, password } = values

    const existingUser = await db.user.findFirst({
        where: {
            email
        }
    })

    if (!existingUser) {
        return {
            error: 'Email doesnt exist'
        }
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password)

    if (!validPassword) {
        return {
            error: 'Password is incorrect'
        }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect(`/profile/${existingUser.id}`)
}

export const logout = async () => {
    const { session } = await validateRequest()
    if (!session) {
        return {
            error: 'No session found'
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/')
}