Current chart is build with the help of D3 library to make all the necessary calculations for the Gantt grid coordinates. 

## Structure and further improvements
Overall structure consists of App, Gantt and TaskEdit components.
In the App component we're defining mock data and passing it further to the Gantt chart as well as tracking the state of changed campaigns by the user. In the Gantt component we have visual representation of a GANTT diagram. Also there are useState hooks for opening Dialog to edit campaign and track campaign changes. All calculations for the chart are made in helpers.ts file.

In TaskEdit component we have possibility to change campaign data. The improvement for it would be use of the state management overall the application. Also there is a space for improvement following Single-responsibility Principle, this means that in this component we can only pass Campaign data for editing, and needed handlers. And at the higher level component we can already decide what to do with this data. This will allow us to make TaskEdit component reusable in other parts of the application. Which means that we need a common wrapper component over the Gantt and TaskEdit components that will control the data from Redux\Mobx, or using Reacts Context API.

Use of D3.js is convenient to manage all the bars axis calculations, there is also a possibility to use plain inline svg elements with React, but it needs more investigation. One of the possible drawbacks of using plain D3.js for the chart could be hard maintance in the future if the team suddenly need to parallelize the work on this chart, then it would be challenging to manage. 
