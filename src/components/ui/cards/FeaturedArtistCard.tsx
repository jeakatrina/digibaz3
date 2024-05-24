
import { ArtworkWithUser } from '@/types';
import { User } from '@prisma/client';
import { User2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface FeaturedArtistProps {
    data: User;
}

const FeaturedArtist: FC<FeaturedArtistProps> = ({ data }) => {
    const router = useRouter();

    const handleClick = () => {
        window.location.href = `/profile/${data.id}`;
    };

    return (
        <div
            onClick={handleClick}
            className='group cursor-pointer rounded-lg shadow-sm transition-all duration-200 overflow-hidden text-primary-foreground'
        >
            <div className='aspect-square bg-slate-100 relative rounded-full overflow-hidden'>
                {data.image ? (
                    <Image
                        src={data.image}
                        fill
                        objectFit='cover'
                        alt={data.name}
                        className='aspect-square'
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <User2Icon
                            className='hidden mx-auto my-auto lg:block'
                            size={100}
                            color='#8889DA'
                        />
                        <User2Icon
                            className='block mx-auto my-auto lg:hidden'
                            size={50}
                            color='#8889DA'
                        />
                    </div>
                )}
            </div>
            <div className='mx-auto py-2'>
                <p className='text-base front-bold transition-colors duration-200 group-hover:text-[#8889DA] text-center md:text-xl'>
                    {data.username}
                </p>
                <p className='text-[0.5rem] sm:text-xs text-center'>
                    {data.name}
                </p>

            </div>
        </div>
    );
};

export default FeaturedArtist;
