import React, { useMemo, useCallback } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { withTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { Manufacturer } from "../../types";
import { ReleasePerYear } from "../../hooks/useNumOfReleaseByYear";

interface TooltipData {
  all: ReleasePerYear;
  manufacturer?: ReleasePerYear | null;
}

interface ReleaseTrendChartProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  manufacturer: Manufacturer;
  data: Record<Manufacturer, Array<ReleasePerYear>>;
}

const ReleaseTrendChart = withTooltip<ReleaseTrendChartProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    manufacturer,
    data,
  }: ReleaseTrendChartProps & WithTooltipProvidedProps<TooltipData>) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = useMemo(
      () =>
        scaleBand<string>({
          range: [margin.left, innerWidth],
          domain: data[Manufacturer.All].map((data) => data.year),
          padding: 0.4,
        }),
      [data, innerWidth, margin.left]
    );
    const yScale = useMemo(
      () =>
        scaleLinear({
          domain: [
            0,
            Math.max(...data[Manufacturer.All].map((d) => d.releases))!,
          ],
          range: [innerHeight, margin.bottom],
        }),
      [data, innerHeight, margin.bottom]
    );

    const handleTooltip = useCallback(
      (d: ReleasePerYear) =>
        (
          event:
            | React.TouchEvent<SVGRectElement>
            | React.MouseEvent<SVGRectElement>
        ) => {
          const { x, y } = localPoint(event) || { x: 0, y: 0 };
          showTooltip({
            tooltipData: {
              all: d,
              manufacturer:
                manufacturer !== Manufacturer.All
                  ? data[manufacturer].find((item) => item.year === d.year)
                  : null,
            },
            tooltipLeft: x,
            tooltipTop: y,
          });
        },
      [data, manufacturer, showTooltip]
    );

    if (innerHeight < 0) return null;

    return (
      <div>
        <svg
          width={width}
          height={height}
          onMouseLeave={hideTooltip}
          aria-label="Number of game released by year"
          aria-description={`Showing number of game released by all manufacturers ${
            manufacturer !== Manufacturer.All ? `and ${manufacturer}` : ""
          }`}
        >
          <Group role="list">
            {data[manufacturer].map((d) => {
              const year = d.year;
              const barWidth = xScale.bandwidth();
              const barHeight = innerHeight - (yScale(d.releases) ?? 0);
              const barX = xScale(year);
              const barY = innerHeight - barHeight;
              return (
                <Bar
                  className="fill-sky-500 opacity-75"
                  data-testid={`bar-${manufacturer}-${year}`}
                  height={barHeight}
                  key={`bar-${manufacturer}-${year}`}
                  role="listitem"
                  width={barWidth}
                  x={barX}
                  y={barY}
                />
              );
            })}
          </Group>

          <Group role="list">
            {data[Manufacturer.All].map((d) => {
              const year = d.year;
              const barWidth = xScale.bandwidth();
              const barHeight = innerHeight - (yScale(d.releases) ?? 0);
              const barX = xScale(year);
              const barY = innerHeight - barHeight;
              return (
                <Bar
                  className="fill-sky-500 opacity-40 hover:fill-violet-400 hover:opacity-60"
                  data-testid={`bar-all-${year}`}
                  height={barHeight}
                  key={`bar-all-${year}`}
                  onMouseMove={handleTooltip(d)}
                  onTouchMove={handleTooltip(d)}
                  onTouchStart={handleTooltip(d)}
                  role="listitem"
                  width={barWidth}
                  x={barX}
                  y={barY}
                />
              );
            })}
          </Group>

          <AxisLeft
            scale={yScale}
            left={margin.left}
            tickLabelProps={{ className: "text-xs" }}
            label="Number of releases"
            labelClassName="text-xs text-slate-800"
          />
          <AxisBottom
            scale={xScale}
            top={height - margin.bottom}
            tickLabelProps={{ className: "text-xs" }}
            label="Timeline"
            labelClassName="text-xs text-slate-800"
          />

          {/* render tooltip pointer */}
          {tooltipData && (
            <circle
              className="fill-sky-800 stroke-white stroke-2"
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              pointerEvents="none"
            />
          )}
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
              <div>
                <span className="pr-1 font-bold">Overal releases:</span>
                {tooltipData.all.releases}
              </div>
              {tooltipData.manufacturer && (
                <>
                  <div>
                    <span className="pr-1 font-bold">
                      {manufacturer} releases:
                    </span>
                    {tooltipData.manufacturer.releases}
                  </div>
                </>
              )}
              <div className="mt-2">
                <span className="pr-1 font-bold">Year: </span>
                {tooltipData.all.year}
              </div>
            </div>
          </TooltipWithBounds>
        )}
      </div>
    );
  }
);

export default ReleaseTrendChart;
