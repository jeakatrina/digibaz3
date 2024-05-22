import { Artwork, Services as ServicesDb, User } from '@prisma/client';

export interface ServiceWithUser extends ServicesDb {
    user: User;
}

export interface ArtworkWithUser extends Artwork {
    user: User;
}