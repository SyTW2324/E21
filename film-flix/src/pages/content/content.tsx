import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import mv from "./mv.json";
import sr from "./sr.json";
import React from "react";

type Movie = {
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

async function getContent(type: "movies" | "series") {
  if (type === "movies") {
    return mv;
  }
  return sr; // Cambiar por fetch
}

export default function Content({ type }: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movie[] | Series[]>([]);

  React.useEffect(() => {
    getContent(type).then((data: any) => {
      setContent(data);
    });
  }, [type]);

  return (
    <>
      <div className="bg-gray-900">
        <Navbar />
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4">
          {content.map((cont) => (
            <Link to={`/content-info/${cont.title}`} key={cont._id}>
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
        <Footer />
      </div>
    </>
  );
}
