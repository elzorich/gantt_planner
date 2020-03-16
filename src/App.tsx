import React, { useState } from "react";
import { Gantt } from "./components/Gantt";
import { Campaign } from "./components/TaskEdit";

const MOCK_TOPICS: Campaign[] = [
  {
    campaign: "conceptualize",
    type: "development",
    startTime: "2020-2-28", //year/month/day
    endTime: "2020-3-1",
    details: "This actually didn't take any conceptualization",
    contents: [
      { name: "test", contentDate: "2020-2-28" },
      { name: "test2", contentDate: "2020-3-03" }
    ],
    color: "#00bee0"
  },

  {
    campaign: "sketch",
    type: "development",
    startTime: "2020-3-1",
    endTime: "2020-3-6",
    details: "No sketching either, really",
    contents: [
      { name: "test", contentDate: "2020-3-1" },
      { name: "test2", contentDate: "2020-3-6" }
    ],
    color: "#00bee0"
  },

  {
    campaign: "color profiles",
    type: "development",
    startTime: "2020-3-6",
    details: "No sketching either, really",
    contents: [
      { name: "test", contentDate: "2020-3-6" },
      { name: "test2", contentDate: "2020-3-9" }
    ],
    endTime: "2020-3-9",
    color: "#4bdc9d"
  },

  {
    campaign: "HTML",
    type: "coding",
    startTime: "2020-3-2",
    endTime: "2020-3-6",
    details: "all three lines of it",
    contents: [
      { name: "test", contentDate: "2020-3-2" },
      { name: "test2", contentDate: "2020-3-6" }
    ],
    color: "#ecc955"
  },

  {
    campaign: "write the JS",
    type: "coding",
    startTime: "2020-3-6",
    endTime: "2020-3-9",
    color: "grey",
    contents: [
      { name: "test", contentDate: "2020-3-6" },
      { name: "test2", contentDate: "2020-3-9" }
    ],
    details: "No sketching either, really"
  },

  {
    campaign: "advertise",
    type: "promotion",
    startTime: "2020-3-9",
    endTime: "2020-3-12",
    details: "This counts, right?",
    contents: [
      { name: "test", contentDate: "2020-3-9" },
      { name: "test2", contentDate: "2020-3-12" }
    ],
    color: "#c80101"
  },

  {
    campaign: "spam links",
    type: "promotion",
    startTime: "2020-3-12",
    endTime: "2020-3-14",
    color: "#c80101",
    contents: [
      { name: "test", contentDate: "2020-3-12" },
      { name: "test2", contentDate: "2020-3-14" }
    ],
    details: "No sketching either, really"
  },
  {
    campaign: "BMW",
    type: "celebration",
    startTime: "2020-3-8",
    endTime: "2020-3-13",
    details: "All the things",
    contents: [
      { name: "test", contentDate: "2020-3-8" },
      { name: "test2", contentDate: "2020-3-13" }
    ],
    color: "#4c70ea"
  },

  {
    campaign: "John Reed",
    type: "celebration",
    startTime: "2020-3-13",
    endTime: "2020-3-16",
    color: "green",
    contents: [
      { name: "test", contentDate: "2020-3-13" },
      { name: "test2", contentDate: "2020-3-16" }
    ],
    details: "No sketching either, really"
  }
];

function App() {
  const [topics, setTopics] = useState<Campaign[]>(MOCK_TOPICS);

  console.log("topics", topics);

  return (
    <div className="App">
      <header className="App-header"></header>
      <Gantt data={topics} setTopics={setTopics} />
    </div>
  );
}

export default App;
