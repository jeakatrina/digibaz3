import { ServiceWithUser } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ServiceCardProps {
    data: ServiceWithUser;
}

const ServiceCard: FC<ServiceCardProps> = ({ data }) => {
    const router = useRouter();

    const handleClick = () => {
        window.open(`/services/${data.id}`, '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className='bg-primary/40 group cursor-pointer rounded-lg shadow-sm border border-transparent hover:border-white transition-all duration-200 overflow-hidden text-primary-foreground'
        >
            <div className='aspect-square bg-slate-100 relative overflow-hidden'>
                <Image
                    src={data.thumbnail}
                    fill
                    alt={data.name}
                    className='aspect-square object-cover'
                />
            </div>
            <div className='px-2 py-2'>
                <p className='text-sm sm:text-base transition-colors duration-200 group-hover:text-[#8889DA]'>
                    {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
                </p>
                <p className=' text-sm text-orange-200'>
                    ₱ {data.startingPrice}
                </p>
                <p className='font-extralight text-xs'>
                    {data.user.username}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
