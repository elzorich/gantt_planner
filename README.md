This project is build with the help of D3 library to make all the necessary calculations for the Gantt grid coordinates. 

## Structure and further improvements
Overall structure consists of App, Gantt and TaskEdit components.
In the App component we're defining mock data and passing it further to the Gantt chart as well as tracking the state of changed campaigns by the user. In the Gantt component we have visual representation of a GANTT diagram. All the coordinate calculations are made in the helpers.ts file.

In TaskEdit component we have possibility to change campaign data. The possible improvement for it would be using state management overall the application. Also there is a space for improvement as Single-responsibility Principle, this means that in this component we can only pass Campaign data for editing, and needed handlers. And at the higher level component we can already decide what to do with this data. This will allow us to make TaskEdit component reusable in other parts of the application. Which means that we need a common wrapper component over the Gantt and TaskEdit components that will control the data from Redux\Mobx, or using Reacts Context API.

With the use of plain D3.js it is convinient to manage all the coordinates calculations, there is also a possibility to use plain inline svg elements, but it needs more investigation how to properly use it with React. As the main disadvantage of using plain D3.js approach it could be hardly maintanable if the team suddenly needs to parallelize the work on this chart, then it won't be manageble. 
