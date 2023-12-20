import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";

import React from "react";

type Movies = {
  _id: string;
  title: string;
  description: string;
  director: string;
  year: number;
  duration: number;
  cast: string[];
  genre: string[];
  rating: number;
  platform: string;
};

type Series = {
  _id: string;
  title: string;
  description: string;
  director: string;
  yearStart: number;
  yearEnd: number;
  numEpisodes: number;
  seasons: number;
  cast: string[];
  genre: string[];
  durationAVG: number;
  rating: number;
  platform: string;
};

async function getContent(type: "movies" | "series", onErr: (err: string) => void): Promise<Movies[] | Series[]> {
  try {
      const response = await fetch(`http://localhost:3001/${type}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json() as { movies: Movies[] } | { series: Series[] };
      if ("movies" in data) {
        return data.movies;
      } else {
        return data.series;
      }
  } catch (error: any) {
    onErr(error.message);
    return [];
  }
}



export default function Content({ type }: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movies[] | Series[]>([]);
  console.log(content);

  React.useEffect(() => {
    getContent(type, (error) => {
      console.log(error);
    }).then((data) => {
      setContent(data)
    });
  }, [type]);

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <Navbar />
        <div className="flex-grow bg-gray-900">
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            <button
              type="button"
              className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2 
                              border border-blue-900 text-blue-500 hover:text-white hover:bg-blue-500 bg-gray-900 focus:ring-blue-800"
            >
              All genres
            </button>
            <button
              type="button"
              className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                              border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800"
            >
              Action
            </button>
            <button
              type="button"
              className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                              border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800"
            >
              Comedy
            </button>
            <button
              type="button"
              className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                              border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800"
            >
              Fantasy
            </button>
            <button
              type="button"
              className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                              border border-gray-900 bg-gray-900 hover:border-gray-700 text-white focus:ring-gray-800"
            >
              Horror
            </button>
          </div>

          <div className="flex justify-center pb-16">
            <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-4 gap-6 mx-4">
              {
              content.map((cont) => (
                <Link to={`/${type}/${cont._id}`} key={cont._id}>
                  <div className="text-white">
                    <img
                      className="h-auto rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                      alt={cont.title}
                    />
                    <p className="font-medium flex justify-center">{cont.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
