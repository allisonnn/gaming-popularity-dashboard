import React from "react";
import { ParentSize } from "@visx/responsive";
import useNumOfReleaseByYear from "../../hooks/useNumOfReleaseByYear";
import ReleaseTrendChart from "./ReleaseTrendChart";
import { Manufacturer } from "../../types";

interface ReleaseTrendProps {
  manufacturer: Manufacturer;
}

const ReleaseTrend: React.FC<ReleaseTrendProps> = ({ manufacturer }) => {
  const numOfReleaseByYear = useNumOfReleaseByYear();

  return (
    <>
      <div className="flex items-baseline">
        <h2 className="chart-heading">{manufacturer} release trend</h2>
      </div>

      <div className="text-gray-700 grow">
        <ParentSize
          parentSizeStyles={{
            minHeight: "100%",
            height: "100%",
            width: "100%",
          }}
        >
          {({ width, height }) => (
            <ReleaseTrendChart
              margin={{ top: 0, right: 0, bottom: 40, left: 60 }}
              width={width}
              height={height}
              data={numOfReleaseByYear}
              manufacturer={manufacturer}
            />
          )}
        </ParentSize>
      </div>
    </>
  );
};

export default ReleaseTrend;
