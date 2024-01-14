import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Series } from "../../types/series";
import { Movies } from "../../types/movies";
import { Link } from "react-router-dom";

import { HOST } from "../../const";

import React from "react";

async function getContent(
  type: "movies" | "series",
  onErr: (err: string) => void
): Promise<Movies[] | Series[]> {
  try {
    const response = await fetch(`${HOST}/api/${type}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = (await response.json()) as
      | { movies: Movies[] }
      | { series: Series[] };
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

function FilterButton({
  option,
  content,
  onClick,
  allGenres,
  selected,
}: {
  option: string;
  content: Movies[] | Series[];
  onClick: (content: Movies[] | Series[]) => void;
  allGenres?: boolean;
  selected?: boolean;
}) {
  // @ts-ignore
  const filtered = content.filter(
    (cont: Movies | Series) => cont.genre.includes(option) || allGenres
  ) as Movies[] | Series[];
  if (filtered.length <= 0) {
    return null;
  }
  return (
    <button
      type="button"
      className=" rounded-full text-sm font-medium px-3 py-1.5 text-center me-2 mb-2
                  border border-gray-900 bg-gray-900 hover:border-gray-700 
                  text-white focus:ring-gray-800"
      onClick={() => {
        onClick(filtered);
      }}
      style={selected ? { backgroundColor: "#3b82f6", color: "#ffffff" } : {}}
    >
      {option}
    </button>
  );
}

const FILTERS = [
  "All genres",
  "Action",
  "Animation",
  "Crime",
  "Drama",
  "Fantasy",
  "Sci-Fi",
  "War",
];

export default function Content({ type }: { type: "movies" | "series" }) {
  const [content, setContent] = React.useState<Movies[] | Series[]>([]);
  const [copyContent, setCopyContent] = React.useState<Movies[] | Series[]>([]);
  const [selected, setSelected] = React.useState("All genres");

  React.useEffect(() => {
    getContent(type, (error) => {
      console.log(error);
    }).then((data) => {
      setContent(data);
      setCopyContent(data);
    });
  }, [type]);

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <div className="flex-grow bg-gray-900">
          <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter}
                option={filter}
                content={copyContent}
                onClick={(filtered) => {
                  setContent(filtered);
                  setSelected(filter);
                }}
                allGenres={filter === "All genres"}
                selected={selected === filter}
              />
            ))}
          </div>

          <div className="flex justify-center pb-16">
            <div className="max-w-screen-2xl grid grid-cols-2 md:grid-cols-4 gap-6 mx-4">
              {content.map((cont) => (
                <Link to={`/${type}/${cont._id}`} key={cont._id}>
                  <div className="text-white">
                    <img
                      className="object-cover h-80 w-full rounded-lg"
                      src={cont.image}
                      alt={cont.title}
                    />
                    <p className="font-medium flex justify-center mt-4">
                      {cont.title}
                    </p>
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
