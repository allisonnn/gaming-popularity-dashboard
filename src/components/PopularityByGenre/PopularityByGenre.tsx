import React from "react";
import { ParentSize } from "@visx/responsive";
import PopularityByGenreChart from "./PopularityByGenreChart";
import useNumOfReleaseByGenre from "../../hooks/useNumOfReleaseByGenre";
import { Manufacturer } from "../../types";

interface PopularGenresProps {
  manufacturer: Manufacturer;
}

const PopularGenres: React.FC<PopularGenresProps> = ({ manufacturer }) => {
  const data = useNumOfReleaseByGenre();

  return (
    <>
      <div className="flex items-baseline  border-b mb-1">
        <h2 className="chart-heading">{manufacturer} popular genres</h2>
        <span className="text-gray-600">{`(sorted by release number)`}</span>
      </div>
      <div className="text-gray-700 grow">
        <ParentSize>
          {({ width, height }) => (
            <PopularityByGenreChart
              width={width}
              height={height}
              margin={{ top: 0, right: 0, bottom: 0, left: 90 }}
              data={data[manufacturer]}
            />
          )}
        </ParentSize>
      </div>
    </>
  );
};

export default PopularGenres;
