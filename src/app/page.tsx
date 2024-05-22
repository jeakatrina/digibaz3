"use client"

import { getArtworks } from "@/actions/artwork.actions";
import { getServices } from "@/actions/services.actions";
import Homepage from "@/components/clientPages/Homepage";
import Container from "@/components/layouts/web/Container";
import ContentSection from "@/components/layouts/web/ContentSection";
import ArtworkCard from "@/components/ui/cards/ArtworkCard";
import Header from "@/components/ui/Header";
import ServiceCard from "@/components/ui/cards/ServicesCard";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSession } from "@/lib/auth/SessionContext";
import { ServiceWithUser } from "@/types";
import { Artwork, Services, User, UserType } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import FeaturedArtistCard from "@/components/ui/cards/FeaturedArtistCard";
import { getArtist, getArtists } from "@/actions/artist.actions";
import FeaturedSection from "@/components/layouts/web/FeaturedSection";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface ArtworkWithUser extends Artwork {
  user: User;
}

const ITEMS_PER_PAGE = 25;

export default function Home() {

  const highlightArtists = ['clwhmpa2d0000lgra1u57u6mc', 'clwgmnyum0000bvaha085potw']
  const [artists, setArtists] = useState<User[]>([

  ]);
  const [sortOrder, setSortOrder] = useState('none');
  const [artworks, setArtworks] = useState<ArtworkWithUser[]>([]);
  const [services, setServices] = useState<ServiceWithUser[]>([]);
  const [userType, setUserType] = useState<UserType[]>([]);

  const [artworkCurrentPage, setArtworkCurrentPage] = useState(1);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])



  const session = useSession();



  const fetchArtistById = async (id: string) => {
    const result = await getArtist(id)
    return result;
  }

  const fetchArtworks = useCallback(async () => {
    const result = await getArtworks();
    setArtworks(result.artworks);
  }, [setArtworks]);

  const fetchServices = useCallback(async () => {
    const result = await getServices();
    setServices(result.services);
  }, [setServices]);

  const fetchArtists = useCallback(async () => {
    const result = await getArtists()
    setArtists(result.users)
  }, [setArtists])


  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    fetchArtists()
  }, [fetchArtists])

  useEffect(() => {
    const fetchArtists = async () => {
      const artists = [];
      for (const id of highlightArtists) {
        const result = await getArtist(id);
        if (result.user) {
          const { artworks, services, ...user } = result.user;
          artists.push(user);
        }
      }
      setArtists(artists);
    };

    fetchArtists();
  }, []);

  return (
    <div >
      <div className="w-full h-fit relative overflow-hidden py-[64px]">
        <div className='h-[400px] w-[400px] md:h-[400px] md:w-[400px] xl:h-[700px] xl:w-[700px] absolute top-[25rem] xl:top-[40rem] left-[-15rem] bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />

        <div className='h-[400px] w-[400px] md:h-[400px] md:w-[400px] xl:h-[700px] xl:w-[700px] absolute top-[120rem] -right-[20rem] transform -translate-y-1/2 bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />

        <div className='h-[400px] w-[400px] md:h-[400px] md:w-[400px] xl:h-[700px] xl:w-[700px] absolute bottom-0 left-0 bg-[#AAD9D9] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />


        {/* slides */}
        <div className="w-full h-fill relative z-10">
          <div className="aspect-[4/3] md:aspect-[16/4] relative overflow-hidden">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide">

                  {/* welcome slide */}
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/landingpagebg.jpg"
                      fill
                      objectFit="cover"
                      alt="artist of the year"
                    />
                    <Container>
                      <h1 className="absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl md:text-5xl lg:text-7xl">
                        Your Gateway
                        to the Digital
                        Art Realm.
                      </h1>
                    </Container>
                  </div>
                </div>
                <div className="embla__slide">
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/artistOfTheMonthCover.svg"
                      layout="fill"
                      objectFit="cover"
                      alt="artist of the year"
                    />
                    <Container>
                      <div className="absolute inset-0 flex flex-col items-center justify-center md:flex-row py-4">
                        <div className="relative aspect-square rounded-md h-[200px] lg:h-[300px] overflow-hidden">
                          <Image
                            src="/images/artistOfTheMonth1.png"
                            objectFit="cover"
                            fill
                            alt="artist of the year"
                          />
                        </div>
                        <div className="ml-0 md:ml-4 space-y-1 text-center md:text-left">
                          <p className="text-base md:text-xl">Artist of the month</p>
                          <p className="font-bold text-2xl md:text-5xl lg:text-7xl">STEF SABADO</p>
                          <p className="text-sm md:text-base w-[500px]">
                            3D artist
                          </p>
                          {/* <div className="grid grid-cols-3">
                            TODO if makaya: 3-illustration grid
                          </div> */}
                        </div>
                      </div>
                    </Container>
                  </div>
                </div>
                {/* <div className="embla__slide">Slide 3</div> */}
              </div>
            </div>
            {/* <Carousel ref={emblaRef}>
              <CarouselContent>
                <CarouselItem className="aspect-[4/3] md:aspect-[16/4] relative overflow-hidden">
                  <Image
                    src="/images/artistOfTheYearCover.svg"
                    fill
                    objectFit="cover"
                    alt="artist of the year"
                  />
                </CarouselItem>
                <CarouselItem className="aspect-[4/3] md:aspect-[16/4] relative overflow-hidden">
                  <Image
                    src="/images/landingpagebg.jpg"
                    fill
                    objectFit="cover"
                    alt="artist of the year"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel> */}
          </div>
        </div>

        <Container>
          <div className="flex flex-col items-center mb-2 justify-center text-primary-foreground space-y-4">
            <FeaturedSection>
              <h2 className="text-xl font-bold text-center">Weekly Artists</h2>
              <div className='hidden md:grid grid-cols-2 gap-4 md:grid-cols-4 '>
                {artists
                  .filter(artist => highlightArtists.includes(artist.id))
                  .map((artist, index) => (
                    <FeaturedArtistCard key={index} data={artist} />
                  ))}
              </div>

            </FeaturedSection>
            <div className="md:hidden">
              <Carousel>
                <CarouselContent>
                  {artists
                    .filter(artist => highlightArtists.includes(artist.id))
                    .map((artist, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/3"
                      >
                        <FeaturedArtistCard data={artist} />
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </Container>

        {/* <div className=""> */}
        <Container>
          {/* recent services grid */}
          <div className="space-y-4 z-10 relative">
            <ContentSection>
              <div className="space-y-4 ">
                <Header title="Recent Services" />
                <div className="min-h-screen">
                  <div className='grid grid-cols-2 gap-4 pt-4 md:grid-cols-4 lg:grid-cols-5 '>
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        data={service}
                      />
                    ))}
                  </div>
                </div>
                <Link
                  href={`/services`}
                  className='text-white text-sm flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                >See More <ChevronRight className='ml-2' size={25} /></Link>
              </div>
            </ContentSection>
            {/* recent artworks grid */}
            <ContentSection>
              <div className="space-y-4">
                <Header title="Recent Artworks" />
                <div className="min-h-screen">
                  <div className='grid grid-cols-2 gap-4 pt-4 md:grid-cols-4 lg:grid-cols-5 min-h-fit '>
                    {artworks.map((artwork) => (
                      <ArtworkCard
                        key={artwork.id}
                        data={artwork} />
                    ))}
                  </div>
                </div>
                <Link
                  href={`/services`}
                  className='text-white text-sm flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base py-4'
                >See More <ChevronRight className='ml-2' size={25} /></Link>
              </div>
            </ContentSection>
          </div>
        </Container>
        {/* </div> */}

      </div >

    </div >

  );
}
