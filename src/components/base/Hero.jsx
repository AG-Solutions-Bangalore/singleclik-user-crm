import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from "embla-carousel-autoplay";
import { Button } from '../ui/button'
import AseestHero from "../../../public/assets/hero.png"

const Hero = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className="pt-24 container px-5 md:px-7   " id="home">
        <div className="flex flex-col w-full justify-center items-center">
            <div className="mb-4 text-center text-base bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md shadow-md">
                {/* We just raised $20M in Series B. */}
                We Are Just Start our Starup
            </div>

            <h1 className="sm:text-5xl md:text-5xl lg:text-6xl text-4xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7474BF] to-[#348AC7] pb-6 w-full leading-tight">
                The best way to manage <br /> your Personal Enquiry
            </h1>
            <p className="text-base text-center md:text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Suspendisse varius enim in eros elementum tristique.
            </p>
            <div className="button-group my-8 flex flex-col gap-y-4 md:gap-y-0 md:flex-row w-full justify-center items-center">
            <Link target='_blank' to={'https://play.google.com/store/apps/details?id=com.singleclick.agsolution&hl=en_IN'}>
                <Button variant="default" className="w-full md:w-auto md:mr-4 px-6 py-3 text-lg">
                    Download the app
                </Button>
                </Link>
                <Button onClick={() => navigate('/login')} variant="outline" className="w-full md:w-auto md:mr-4 px-6 py-3 text-lg">
                    Log in
                </Button>
            </div>
            <p className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-400">
                * No credit card required
            </p>

            <Carousel
                plugins={[
                    Autoplay({
                        delay: 6000,
                    }),
                ]}
                opts={{
                    loop: true,
                    align: "center",
                }}
                className="mb-10 mt-8 max-w-[1074px] w-full"
            >
                <CarouselContent className="m-0">
                    <CarouselItem className="p-0 flex justify-center">
                        <img className="rounded-md w-full max-w-[1074px]" src={AseestHero} alt="Carousel Image 1" />
                    </CarouselItem>
                    <CarouselItem className="p-0 flex justify-center">
                        <img className="rounded-md w-full max-w-[1074px]" src={AseestHero} alt="Carousel Image 2" />
                    </CarouselItem>
                    <CarouselItem className="p-0 flex justify-center">
                        <img className="rounded-md w-full max-w-[1074px]" src={AseestHero} alt="Carousel Image 3" />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    </div>
</>
  )
}

export default Hero