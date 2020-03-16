import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface ITopics {
  data?: any[];
}

export const Chart = (props: ITopics) => {
  const chartContainer = useRef(null);
  const w = 1200;
  const h = 500;
  const sidePadding = 75;
  const topPadding = 75;
  const svg = d3.select(chartContainer.current);
  const dateFormat = d3.timeParse("%Y-%m-%d");
  let topics: any[] = [];

  useEffect(() => {
    if (props.data && chartContainer.current) {
      const svg = d3.select(chartContainer.current);

      const timeScale = d3
        .scaleTime()
        .domain([
          d3.min(props.data, function(d) {
            return dateFormat(d.startTime);
          }) as Date,
          d3.max(props.data, function(d) {
            return dateFormat(d.endTime);
          }) as Date
        ])
        .range([0, w - 150]);

      //Selecting unique topics from the data
      for (let i = 0; i < props.data.length; i++) {
        topics.push(props.data[i].type);
      }

      //Count number of campaigns for every topic
      const distribution = topics.reduce(
        (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] | 0) + 1 }),
        {}
      );
      const xAxis = d3
        .axisBottom(timeScale)
        .ticks(d3.timeDay)
        .tickSize(-h + topPadding + 20);
    }
  }, [props.data, chartContainer.current]);

  return (
    <svg className="chart" width={1200} height={500}>
      <text
        x={w / 2}
        y={25}
        textAnchor={"middle"}
        fontSize={18}
        fill={"#009FFC"}
      >
        {"Gantt Project Planning"}
      </text>
      <g
        className={"grid"}
        transform={"translate(" + sidePadding + ", " + (h - 50) + ")"}
      ></g>
    </svg>
  );
};
