Current project is build with the help of D3 library to make all the necessary calculations for the Gantt grid coordinates. 

## Structure and further improvements
Overall structure consists of App, Gantt and TaskEdit components.
In the App component we're defining mock data and passing it further to the Gantt chart as well as tracking the state of changed campaigns by the user. In the Gantt component we have main calculations for the chart grid and its bars (campaigns and contents). Also there are useState hooks for opening Dialog to edit campaign and track campaign changes.

In TaskEdit component we have possibility to change campaign data. Ofcourse, the improvement for it would be implementation of the reactive form and using state management overall the application. Also there is a space for improvement here as Single-responsibility Principle, this means that in this component we can only pass Campaign data for editing, and needed handlers. And at the higher level component we can already decide what to do with this data. This will allow us to make TaskEdit component reusable in other parts of the application. Which means that we need a common wrapper component over the Gantt and TaskEdit components that will control the data from Redux\Mobx, or using Reacts Context API. But due to the lack of experience with state management, it was implemented with the help of UseState.

Using plain D3.js is convinient to manage all the coordinates, there is also a possibility to use plain inline svg elements and make all the calculations separately, but it needs more investigation how to render it with React. As the main disadvantage of using plain D3.js approach it could be hardly maintanable if the team suddenly need to parallelize the work on this chart, then it won't be manageble. 






This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
