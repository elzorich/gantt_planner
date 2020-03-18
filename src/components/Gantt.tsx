import React, { useEffect, useState } from "react";
import { TaskEdit } from "./TaskEdit";
import "./Gantt.css";
import * as d3 from "d3";
import { Campaign } from "../types";
import { draw } from "../helpers";

interface GanttProps {
  data: Campaign[];
  setTopics: (topics: Campaign[]) => void;
}

/**
 * Visual representation of a GANTT diagram.
 * @param data Actual campaign data
 * @param setTopics Handler to update contents on change.
 */
export const Gantt = (props: GanttProps) => {
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>();

  const handleOpen = (campaign: Campaign) => {
    setOpen(true);
    setCampaign(campaign);
  };

  useEffect(() => {
    d3.select(".viz > *").remove();
    draw(props.data, handleOpen);
  }, [props.data]);

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
