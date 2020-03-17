import React, { useEffect, useState } from "react";
import { TaskEdit, Campaign } from "./TaskEdit";
import "./Gantt.css";
import * as d3 from "d3";

interface IProps {
  data: Campaign[];
  setTopics: (topics: Campaign[]) => void;
}

interface Contents {
  name: string;
  contentDate: string;
  ySide: number;
  color: string;
}

export const Gantt = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>();

  const handleOpen = (campaign: Campaign) => {
    setOpen(true);
    setCampaign(campaign);
  };

  useEffect(() => {
    d3.select(".viz > *").remove();
    draw(props.data);
  }, [props.data]);

  const draw = (props: Campaign[]) => {
    const w = 1800;
    const h = 500;
    d3.select(".viz")
      .append("svg")
      .attr("height", h)
      .attr("width", w)
      .attr("id", "svg-viz");
    const dateFormat = d3.timeParse("%Y-%m-%d");
    let topics: any[] = [];
    let contents: Contents[] = [];
    const svg = d3.select("#svg-viz");

    // Define timescale for the chart, based on the min and max date from the data
    const timeScale = d3
      .scaleTime()
      .domain([
        d3.min(props, d => dateFormat(d.startTime)) as Date,
        d3.max(props, d => dateFormat(d.endTime)) as Date
      ])
      .range([0, w - 150]);

    //Selecting unique topics from the data
    for (let i = 0; i < props.length; i++) {
      topics.push(props[i].type);
    }

    //Count number of campaigns for every topic
    const distribution = topics.reduce(
      (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] | 0) + 1 }),
      {}
    );

    //Add key and color property for every content for YAxis positioning and association with the topic
    for (let i = 0; i < props.length; i++) {
      for (let n = 0; n < props[i].contents.length; n++) {
        //If user changes the color of campaign, add the same color to the content
        if (props[i].contents[n].color) {
          const newContent = { ...props[i].contents[n] };
          newContent.color = props[i].color;
          contents.push(newContent);
        } else {
          props[i].contents[n].ySide = props.indexOf(props[i]);
          props[i].contents[n].color = props[i].color;
          contents.push(props[i].contents[n]);
        }
      }
    }

    const makeGrid = (
      theSidePad: string | number,
      theTopPad: number,
      w: number,
      h: number
    ) => {
      const xAxis = d3
        .axisBottom(timeScale)
        .ticks(d3.timeDay)
        .tickSize(-h + theTopPad + 20);

      const grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + (h - 50) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("fill", "#3da0df")
        .attr("font-size", 11);
    };

    const vertLabels = (theGap: number, theTopPad: number) => {
      let prevGap = 0;

      // Data for the axis
      const yAxisDist = Object.entries(distribution);
      const axisText = svg
        .append("g")
        .selectAll("text")
        .data(yAxisDist)
        .enter()
        .append("text")
        .text(d => d[0])
        .attr("x", 10)
        .attr("y", (d, i) => {
          if (i > 0) {
            const n: any = yAxisDist[i - 1][1];
            const b: any = d[1];
            for (let j = 0; j < i; j++) {
              prevGap += n;
              return (b * theGap) / 2 + prevGap * theGap + theTopPad;
            }
            return (b * theGap) / 2 + prevGap * theGap + theTopPad;
          } else {
            const c: any = d[1];
            return (c * theGap) / 2 + theTopPad;
          }
        })
        .attr("font-size", 14)
        .attr("text-anchor", "start");
    };

    const drawRects = (
      taskArr: Campaign[],
      theGap: any,
      theTopPad: number,
      theSidePad: number,
      theBarHeight: any,
      w: number,
      h: number
    ) => {
      const bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(taskArr)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * theGap + theTopPad - 2)
        .attr("width", d => w - theSidePad / 2)
        .attr("height", theGap)
        .attr("fill", "#3da0df")
        .attr("opacity", 0.1);

      const rectangles = svg
        .append("g")
        .selectAll("rect")
        .data(taskArr)
        .attr("class", "wrapper")
        .enter();

      //Drawing campaign rectangles
      const innerRects = rectangles
        .append("rect")
        .attr("class", "campaign")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", d => timeScale(new Date(d.startTime)) + 67)
        .attr("y", (d, i) => i * theGap + theTopPad)
        .attr(
          "width",
          d => timeScale(new Date(d.endTime)) - timeScale(new Date(d.startTime))
        )
        .attr("height", theBarHeight)
        .attr("fill", d => d.color)
        .on("click", d => handleOpen(d)); // passing campaign data to the state);

      //Entering list of contents for every campaign
      const contentsBlock = svg
        .append("g")
        .attr("class", "contents-block")
        .selectAll(".campaign")
        .data(contents)
        .enter();

      //Drawing contents rectangles
      const contentsRect = contentsBlock
        .append("rect")
        .attr("class", "content")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", d => timeScale(new Date(d.contentDate)) + 67)
        .attr("y", (d, i) => d.ySide * theGap + theTopPad + theBarHeight)
        .attr("width", 30)
        .attr("height", theBarHeight)
        .attr("stroke", "#fff")
        .attr("fill", d => d.color);

      //Inserting name of the campaign
      const rectText = rectangles
        .append("text")
        .text(d => d.campaign)
        .attr(
          "x",
          d =>
            (timeScale(new Date(d.endTime)) -
              timeScale(new Date(d.startTime))) /
              2 +
            timeScale(new Date(d.startTime)) +
            theSidePad
        )
        .attr("y", (d, i) => i * theGap + 14 + theTopPad)
        .attr("font-size", 11)
        .attr("text-anchor", "middle")
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      //Inserting name of the contents
      const contentText = contentsBlock
        .append("text")
        .text(d => d.name)
        .attr("x", d => timeScale(new Date(d.contentDate)) + theSidePad + 12)
        .attr("y", d => d.ySide * theGap + 14 + theTopPad + theBarHeight)
        .attr("font-size", 11)
        .attr("text-anchor", "middle")
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");
    };

    const makeGant = (tasks: any[], pageWidth: number, pageHeight: number) => {
      const barHeight = 20;
      const gap = barHeight * 2;
      const topPadding = 50;
      const sidePadding = 70;

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding);
    };
    makeGant(props, w, h);
  };

  return (
    <>
      <div className="viz" />
      {campaign && (
        <TaskEdit
          campaignData={campaign}
          data={props.data}
          isOpen={open}
          onChildClick={setOpen}
          setTopics={props.setTopics}
        />
      )}
      <br />
    </>
  );
};
