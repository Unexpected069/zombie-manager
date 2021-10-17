# zombie-manager
A simple full-stack application using React/React-Native/Node with GraphQL for the API 

Scenario:
We've got the zombies under control, but we need to keep track of them. That's where you come in. We need you to build an app for us. We need you to build a zombie manager. We can quarantine zombies in three locations: the hospital, the school, and the warehouse. We need the app to keep track of where each zombie is being held, how many zombies are in each location, and we need to be able to move zombies between the locations.


To run this project, you need to add the back-end and front-end dependencies. In the root of the project server, run the following command:

Navigate to the server directory

$ cd client

and run the following command:

$ npm install

To run the server

$ npm start

=======================================

Navigate to the client directory

$ cd client

and run the following command:

$ npm install

To run the android

npx react-native run-android

To run the ios

npx react-native run-ios --simulator="nameofyoursimulator"

Fill out your own ip address or localhost
const client = new ApolloClient({ uri: 'http://YOURIPADDRESS:4800/graphql' });

File located at client/app/App.js line number 15.
