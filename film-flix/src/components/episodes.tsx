import { Series } from "../types/series";
import { Movies } from "../types/movies";

import React from "react";

export default function Episodes({ content }: { content: Series | Movies}) {

  const [currentSeason, setCurrentSeason] = React.useState(1);

  const handleSeasonClick = (season: number) => {
    setCurrentSeason(season);
  };

  return (

    // eslint-disable-next-line no-mixed-operators
    content && "seasons" in content && (
      <div>
        <div className="flex justify-center space-x-4 pt-8">
          {content.seasons.map((season: any, index: number) => (
            <button
              key={season.season}
              className={`text-white text-xl ${currentSeason === index + 1 ? "text-blue-400" : "hover:text-blue-400"} focus:outline-none`}
              onClick={() => handleSeasonClick(index + 1)}
            >
              Season {index + 1}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-8 ">
          {content.seasons.map((season: any) => (
            <div key={season.season}>
              {currentSeason === season.season && (
                <>
                  <div className="overflow-auto hover:overflow-x-hidden w-screen max-w-72 sm:max-w-2xl max-h-96 bg-slate-800">
                    {season.episodes.map(  
                      (episode: any, index: number) => (
                        <div
                          key={episode.numEpisode}
                          className="px-4 py-4"
                        >
                          <h2 className="font-semibold pt-2 text-xl text-sky-400 flex justify-center">
                            {`${index + 1}. ${episode.title}`}
                          </h2>
                          <p className="text-white font-extralight pt-2 flex justify-center mx-auto">
                            {episode.description}
                          </p>
                          <h3 className="text-gray-400 font-medium pt-2 flex justify-center">
                            {`${episode.duration} MIN`}
                          </h3>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    // eslint-disable-next-line no-mixed-operators
    ) || (
      null
    )
  );
}