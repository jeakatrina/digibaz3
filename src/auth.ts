import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import db from "./lib/db";
import { Lucia, Session, TimeSpan, User } from "lucia";
import { UserType } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, 'w'),
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            email: attributes.email,
            name: attributes.name,
            bio: attributes.bio,
            image: attributes.image,
            phoneNumber: attributes.phoneNumber,
            createdAt: attributes.createdAt,
            type: attributes.type
        }
    },
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }

    interface DatabaseUserAttributes {
        id: string;
        email: string;
        name: string;
        phoneNumber: string;
        bio: string;
        image: string;
        createdAt: Date;
        type: typeof UserType;
    }
}

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            }
        }

        const result = await lucia.validateSession(sessionId)

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id)
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }

            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie()
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
            }
        } catch { }
        return result
    }
) 