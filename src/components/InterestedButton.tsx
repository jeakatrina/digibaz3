import { FC, useState } from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Sparkles } from 'lucide-react';

interface InterestedButtonProps {
    userData: User | null;
}

const InterestedButton: FC<InterestedButtonProps> = ({ userData }) => {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const handlePaymentOpen = () => {
        setIsPaymentOpen(true);
    };

    const handlePaymentClose = () => {
        setIsPaymentOpen(false);
    };

    return (
        <div className="flex space-x-4">
            <Sheet>
                <SheetTrigger className='bg-[#8889DA] px-4 py-2 rounded-full flex flex-row items-center justify-center'>
                    <Sparkles size={20} className='mr-2' /> Interested!
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Contact</SheetTitle>
                        <SheetDescription>{userData?.name}</SheetDescription>
                    </SheetHeader>
                    <ul className='space-y-4 mt-4 text-sm'>
                        <li
                            onClick={() => window.open(userData?.instagramLink || '', '_blank')}
                            className='cursor-pointer'
                        >
                            Instagram
                        </li>
                        <li>
                            <Link href={`mailto:${userData?.gmailLink}`}>
                                Gmail
                            </Link>
                        </li>
                        <li
                            onClick={() => window.open(userData?.facebookLink || '', '_blank')}
                            className='cursor-pointer'
                        >
                            Facebook
                        </li>
                    </ul>
                </SheetContent>
            </Sheet>
            <button 
                className="bg-[#8889DA] px-4 py-2 rounded-full text-white hover:bg-green-600"
                onClick={handlePaymentOpen}
            >
                Buy now!
            </button>

            {isPaymentOpen && (
                <PaymentModal onClose={handlePaymentClose} />
            )}
        </div>
    );
};

const PaymentModal: FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md">
                <h2 className="text-xl font-bold mb-4">Payment</h2>
                <p>Enter your payment details here...</p>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InterestedButton;
