import React, { useCallback } from "react";
import { Group } from "@visx/group";
import { Line, Pie } from "@visx/shape";
import { Text } from "@visx/text";
import withTooltip, {
  WithTooltipProvidedProps,
} from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { Region } from "../../types";
import { TooltipWithBounds, defaultStyles } from "@visx/tooltip";

const getBackgourndColor = (region: Region) => {
  switch (region) {
    case Region.NA_Sales:
      return "fill-sky-500 opacity-90";
    case Region.EU_Sales:
      return "fill-sky-500 opacity-70";
    case Region.JP_Sales:
      return "fill-sky-500 opacity-40";
    case Region.Other_Sales:
      return "fill-sky-500 opacity-20";
    default:
      return "";
  }
};

function getLabel(region: Region) {
  const label = region.replace("Sales", "");
  if (label === "other") return "Others";

  return label.toLocaleUpperCase();
}

const getLabelPosition = (angle: number, radius: number) => {
  return [radius * Math.sin(angle), -radius * Math.cos(angle)];
};

interface SalesDistribution {
  region: Region;
  sales: number;
}

interface SalesByRegionProps {
  width: number;
  height: number;
  data: SalesDistribution[];
}

const SalesByRegionChart = withTooltip<SalesByRegionProps, SalesDistribution>(
  ({
    width,
    height,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
  }: SalesByRegionProps & WithTooltipProvidedProps<SalesDistribution>) => {
    const radius = Math.min(width, height) / 2;

    const handleTooltip = useCallback(
      (d: SalesDistribution) =>
        (
          event:
            | React.TouchEvent<SVGPathElement>
            | React.MouseEvent<SVGPathElement>
        ) => {
          const { x, y } = localPoint(event) || { x: 0, y: 0 };
          showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: y,
          });
        },
      [showTooltip]
    );

    return (
      <>
        <svg
          width={width}
          height={height}
          aria-label="Sales by region pie chart"
        >
          <Group top={height / 2} left={width / 2}>
            <Pie
              data={data}
              pieValue={(d) => d.sales}
              outerRadius={radius - 10}
              innerRadius={0}
            >
              {(pie) => (
                <g>
                  {pie.arcs.map((arc) => {
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    const [labelX, labelY] = getLabelPosition(
                      (arc.startAngle + arc.endAngle) / 2,
                      radius - 5
                    );
                    const labelXExtending =
                      labelX > 0 ? labelX + 10 : labelX - 10;
                    const label = getLabel(arc.data.region);

                    return (
                      <g key={`arc-wrapper-${arc.data.region}`}>
                        <g key={`arc-${arc.data.region}`}>
                          <path
                            d={pie.path(arc) || ""}
                            className={`${getBackgourndColor(
                              arc.data.region
                            )} hover:fill-violet-400 hover:opacity-100`}
                            onMouseMove={handleTooltip(arc.data)}
                            onTouchMove={handleTooltip(arc.data)}
                            onTouchStart={handleTooltip(arc.data)}
                            onMouseLeave={hideTooltip}
                          />

                          {arc.endAngle - arc.startAngle > 0.2 && (
                            <>
                              <Line
                                from={{ x: centroidX, y: centroidY }}
                                to={{ x: labelX, y: labelY }}
                                className="stroke-slate-800"
                              />
                              <Line
                                from={{ x: labelX, y: labelY }}
                                to={{ x: labelXExtending, y: labelY }}
                                className="stroke-slate-800"
                              />
                              <Text
                                className="fill-slate-800 font-bold text-sm"
                                x={labelXExtending}
                                y={labelY}
                                dy="0.3em"
                                textAnchor={centroidX > 0 ? "start" : "end"}
                              >
                                {label}
                              </Text>
                            </>
                          )}
                        </g>
                      </g>
                    );
                  })}
                </g>
              )}
            </Pie>
          </Group>
        </svg>

        {/* render tooltip content */}
        {tooltipData && (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 8}
            left={tooltipLeft + 8}
            style={{
              ...defaultStyles,
              backgroundColor: "#333",
            }}
          >
            <div className="text-base text-white px-2 py-1">
              {Math.floor(tooltipData.sales)} millions in
              <span className="px-1 font-bold">
                {getLabel(tooltipData.region)}
              </span>
            </div>
          </TooltipWithBounds>
        )}
      </>
    );
  }
);

export default SalesByRegionChart;
