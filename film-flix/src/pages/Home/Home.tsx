import React from 'react';
import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';

export default function Home() {
    const Daredevil = require("../../img/Daredevil_(TV_series).png") as string;
    const Morbius = require("../../img/Morbius.jpg") as string;
    const girlWithLaptop = require("../../img/GirlUsingLaptop.jpg") as string;

    return (
        <div>
            <Navbar />
            <section className="bg-gray-900 pt-4 pb-28">
                <div className="max-w-screen-xl gap-16 items-center mx-auto lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 mt-16">
                    <div className="font-light sm:text-lg text-gray-400">
                        <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-white">
                            Find your next favorite movie or TV show.
                        </h2>
                        <p className="mb-4">
                            We are Filmflix and we are here to help you find your next favorite movie or TV show. 
                            On our website you can check data about movies and TV shows, such as their ratings,
                            release date, cast, crew, and more.
                            You can also save your favorite movies and TV shows to your profile.
                        </p>
                        <p>
                            We have a wide variety of movies and TV shows for you search through.
                            We have movies and TV shows from all genres and from all over the world.
                        </p>
                    </div>
                    <div className="mt-8">
                        <img 
                            className="object-cover object-center h-full w-full rounded-lg" 
                            src={girlWithLaptop}
                            alt="gitl with laptop"
                        />
                    </div>
                </div>
            </section>
            <section className="bg-gray-900">
                <div className="container px-5 pb-12 mx-auto">
                    <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div className="rounded-lg h-80 overflow-hidden">
                                <img 
                                    alt="content" 
                                    className="object-cover object-center h-full w-full" 
                                    src={Daredevil}
                                />
                            </div>
                            <h2 
                                className="title-font text-2xl font-medium text-white mt-6 mb-3"
                            >
                                Don't know what to watch?
                            </h2>
                            <p 
                                className="leading-relaxed text-base text-white"
                            >
                                You can search through our wide variety of movies and TV shows to find your next favorite movie or TV show.
                                Daredevil is a great TV show to watch if you are into superheroes.
                            </p>
                        </div>
                        <div className="sm:w-1/2 mb-10 px-4">
                            <div className="rounded-lg h-80 overflow-hidden">
                                <img 
                                    alt="content" 
                                    className="object-cover object-center h-full w-full" 
                                    src={Morbius}
                                />
                            </div>
                            <h2 
                                className="title-font text-2xl font-medium text-white mt-6 mb-3"
                            >
                                Want to know more about the new Marvel Legend?
                            </h2>
                            <p 
                                className="leading-relaxed text-base text-white"
                            >
                                Maybe the famous Marvel Legend Morbius is the right movie for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-900 text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex -m-4 text-center">
                    <div className="p-4 sm:w-1/3 w-1/2">
                        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">2.7K</h2>
                        <p className="leading-relaxed text-white">Users</p>
                    </div>
                    <div className="p-4 sm:w-1/3 w-1/2">
                        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">4K</h2>
                        <p className="leading-relaxed text-white">Movies</p>
                    </div>
                    <div className="p-4 sm:w-1/3 w-1/2">
                        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">4K</h2>
                        <p className="leading-relaxed text-white">Series</p>
                    </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}