"use client"

import { ReactNode, useRef, useEffect } from 'react';
import { Carousel } from './carousel';

interface CarouselElement extends HTMLElement {
    scrollNext: () => void;
}

type LoopingCarouselProps = {
    children: ReactNode;
    interval?: number;
    [key: string]: any;
};

const LoopingCarousel: React.FC<LoopingCarouselProps> = ({ children, interval = 3000, ...props }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current as unknown as CarouselElement;
        const timer = setInterval(() => {
            if (carousel) {
                carousel.scrollNext();
            }
        }, interval);

        return () => {
            clearInterval(timer);
        };
    }, [interval]);

    return (
        <Carousel ref={carouselRef} {...props}>
            {children}
        </Carousel>
    );
}
export default LoopingCarousel;

// Usage
