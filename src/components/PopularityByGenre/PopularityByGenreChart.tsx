import React, { useCallback, useMemo } from "react";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";
import { TooltipWithBounds, withTooltip, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { Genre } from "../../types";

interface GenrePopularity {
  genre: Genre;
  releases: number;
}

interface PopularityByGenreChartProps {
  data: GenrePopularity[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const PopularityByGenreChart = withTooltip<
  PopularityByGenreChartProps,
  GenrePopularity
>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
  }: PopularityByGenreChartProps &
    WithTooltipProvidedProps<GenrePopularity>) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = useMemo(
      () =>
        scaleLinear({
          domain: [0, Math.max(...data.map((d) => d.releases))],
          range: [margin.left, innerWidth],
        }),
      [data, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleBand({
          domain: data.map((d) => d.genre),
          range: [margin.bottom, innerHeight],
          padding: 0.1,
        }),
      [data, innerHeight, margin.bottom]
    );

    const handleTooltip = useCallback(
      (d: GenrePopularity) =>
        (
          event:
            | React.TouchEvent<SVGRectElement>
            | React.MouseEvent<SVGRectElement>
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

    if (innerWidth < 0) return null;

    return (
      <>
        <svg
          width={width}
          height={height}
          aria-label="Popularity by genre chart"
          aria-description="Sorted by number of released in descending order."
        >
          {data.map((d, i) => (
            <Group key={i}>
              <Bar
                x={margin.left}
                y={yScale(d.genre) || 0}
                width={xScale(d.releases)}
                height={yScale.bandwidth()}
                className="fill-sky-200 hover:fill-violet-300"
                onMouseMove={handleTooltip(d)}
                onTouchMove={handleTooltip(d)}
                onTouchStart={handleTooltip(d)}
                onMouseLeave={hideTooltip}
              />
            </Group>
          ))}
          <AxisLeft
            scale={yScale}
            left={margin.left}
            stroke="transparent"
            tickStroke="transparent"
            tickLabelProps={() => ({
              className: "text-xs font-semibold fill-slate-800",
              textAnchor: "end",
              verticalAnchor: "middle",
            })}
          />
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
              Released {tooltipData.releases} games in
              <span className="px-1 font-bold">{tooltipData.genre}</span>
            </div>
          </TooltipWithBounds>
        )}
      </>
    );
  }
);

export default PopularityByGenreChart;
