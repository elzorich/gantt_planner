import React, { useState } from "react";
import { Gantt } from "./components/Gantt";
import { Campaign } from "./types";
import "./App.css";

const MOCK_TOPICS: Campaign[] = [
  {
    id: 1,
    campaign: "conceptualize",
    type: "Topic1",
    startTime: "2020-02-28", //year/month/day
    endTime: "2020-03-01",
    contents: [
      { name: "test1", contentDate: "2020-02-28" },
      { name: "test2", contentDate: "2020-02-29" }
    ],
    color: "#34a853"
  },

  {
    id: 2,
    campaign: "sketch",
    type: "Topic1",
    startTime: "2020-03-01",
    endTime: "2020-03-06",
    contents: [
      { name: "test3", contentDate: "2020-03-01" },
      { name: "test4", contentDate: "2020-03-06" }
    ],
    color: "#00bee0"
  },

  {
    id: 3,
    campaign: "color profiles",
    type: "Topic1",
    startTime: "2020-03-06",
    contents: [
      { name: "test5", contentDate: "2020-03-06" },
      { name: "test6", contentDate: "2020-03-09" }
    ],
    endTime: "2020-03-09",
    color: "#4bdc9d"
  },

  {
    id: 4,
    campaign: "TypeScript",
    type: "Topic2",
    startTime: "2020-03-02",
    endTime: "2020-03-06",
    contents: [
      { name: "test7", contentDate: "2020-03-02" },
      { name: "test8", contentDate: "2020-03-06" }
    ],
    color: "#ecc955"
  },

  {
    id: 5,
    campaign: "JS",
    type: "Topic2",
    startTime: "2020-03-06",
    endTime: "2020-03-09",
    color: "grey",
    contents: [
      { name: "test9", contentDate: "2020-03-06" },
      { name: "test10", contentDate: "2020-03-09" }
    ]
  },

  {
    id: 6,
    campaign: "Add advertising",
    type: "Topic3",
    startTime: "2020-03-09",
    endTime: "2020-03-12",
    contents: [
      { name: "test11", contentDate: "2020-03-09" },
      { name: "test12", contentDate: "2020-03-12" }
    ],
    color: "#c143c1"
  },

  {
    id: 7,
    campaign: "Google campaign",
    type: "Topic3",
    startTime: "2020-03-12",
    endTime: "2020-03-14",
    color: "#c80101",
    contents: [
      { name: "test12", contentDate: "2020-03-12" },
      { name: "test14", contentDate: "2020-03-14" }
    ]
  },
  {
    id: 8,
    campaign: "Deploy",
    type: "Topic4",
    startTime: "2020-03-08",
    endTime: "2020-03-13",
    contents: [
      { name: "test15", contentDate: "2020-03-08" },
      { name: "test16", contentDate: "2020-03-13" },
      { name: "testY", contentDate: "2020-03-12" }
    ],
    color: "#4c70ea"
  },

  {
    id: 9,
    campaign: "John Reed",
    type: "Topic4",
    startTime: "2020-03-13",
    endTime: "2020-03-16",
    color: "green",
    contents: [
      { name: "test17", contentDate: "2020-03-13" },
      { name: "test18", contentDate: "2020-03-16" }
    ]
  }
];

function App() {
  const [topics, setTopics] = useState<Campaign[]>(MOCK_TOPICS);

  return (
    <div className="App">
      <header className="App-header"></header>
      <h2>Gantt Project Planning</h2>
      <Gantt data={topics} setTopics={setTopics} />
    </div>
  );
}

export default App;
