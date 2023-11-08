import { localPoint } from "@visx/event";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { TooltipWithBounds, withTooltip, defaultStyles } from "@visx/tooltip";
import { useCallback, useMemo } from "react";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { Wordcloud } from "@visx/wordcloud";

interface WordCloudChartProps {
  width: number;
  height: number;
  data: WordData[];
}

export interface WordData {
  text: string;
  value: number;
}

interface Word extends WordData {
  size: number;
  x: number;
  y: number;
  font: string;
}

const fixedValueGenerator = () => 0.6;

const WordCloudChart = withTooltip<WordCloudChartProps, Word>(
  ({
    width,
    height,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    data,
  }: WordCloudChartProps & WithTooltipProvidedProps<Word>) => {
    const fontScale = useMemo(
      () =>
        scaleLog({
          // Array was already sorted
          domain:
            data.length !== 0
              ? [data[data.length - 1].value, data[0].value]
              : [0, 0],
          range: [10, 32],
        }),
      [data]
    );

    const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

    const handleTooltip = useCallback(
      (w: Word) =>
        (
          event:
            | React.TouchEvent<SVGTextElement>
            | React.MouseEvent<SVGTextElement>
        ) => {
          const { x, y } = localPoint(event) || { x: 0, y: 0 };
          showTooltip({
            tooltipData: w,
            tooltipLeft: x,
            tooltipTop: y,
          });
        },
      [showTooltip]
    );

    if (data.length === 0) {
      return <div className="py-4">No results.</div>;
    }

    return (
      <>
        <Wordcloud
          words={data}
          width={width}
          height={height}
          fontSize={fontSizeSetter}
          fontWeight={"bold"}
          font={"sans-serif"}
          spiral="rectangular"
          rotate={0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => {
              return (
                <Text
                  key={w.text}
                  textAnchor={"middle"}
                  transform={`translate(${w.x}, ${w.y})`}
                  fontSize={w.size}
                  fontFamily={w.font}
                  className={`fill-sky-500 opacity-${
                    (i / 20) * 100
                  } hover:fill-violet-400 hover:font-bold hover:opacity-100`}
                  onMouseMove={handleTooltip(w as Word)}
                  onTouchMove={handleTooltip(w as Word)}
                  onTouchStart={handleTooltip(w as Word)}
                  onMouseLeave={hideTooltip}
                >
                  {w.text}
                </Text>
              );
            })
          }
        </Wordcloud>

        {/* render tooltip content */}
        {tooltipData && (
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop + 32}
            left={tooltipLeft + 32}
            style={{
              ...defaultStyles,
              backgroundColor: "#333",
            }}
          >
            <div className="text-base text-white px-2 py-1">
              <div className="font-bold">{tooltipData.text}</div>
              <div>Critic score: {tooltipData.value}</div>
            </div>
          </TooltipWithBounds>
        )}
      </>
    );
  }
);

export default WordCloudChart;
