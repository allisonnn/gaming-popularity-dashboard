import React from "react";
import { ParentSize } from "@visx/responsive";
import useSalesByRegion from "../../hooks/useSalesByRegion";
import SalesByRegionChart from "./SalesByRegionChart";
import { Manufacturer } from "../../types";

interface SalesByRegionProps {
  manufacturer: Manufacturer;
}

const SalesByRegion: React.FC<SalesByRegionProps> = ({ manufacturer }) => {
  const data = useSalesByRegion();

  return (
    <>
      <div className="flex items-baseline border-b">
        <h2 className="chart-heading">{manufacturer} regional distribution</h2>
        <span className="text-gray-600">{`(by total sales)`}</span>
      </div>
      <div className="text-gray-700 grow max-h-[300px]">
        <ParentSize>
          {({ width, height }) => (
            <SalesByRegionChart
              width={width}
              height={height}
              data={data[manufacturer]}
            />
          )}
        </ParentSize>
      </div>
    </>
  );
};

export default SalesByRegion;
