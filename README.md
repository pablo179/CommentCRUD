# Comments CRUD Tec Interview
Ths is a Comment section made with React (Nextjs). It allows users to CRUD comments. It uses a REST API to store the comments. The API is made with Express and MYSQL.

## Dependencies
- Node.js
- NPM
- You should be able to run docker compose commands
    - If you are using Windows or Mac, you may need to install Docker Desktop
    - If you are using Linux, you may need to install Docker and Docker Compose

# Setup the project
1. Clone the repository
2. Run `npm install` in the root folder
3. Remove the `.example` from the `client/.env.local.example` file
4. Remove the `.example` from the .env.example file
        - Notes: the .env file in the root folder contains the server configuration in this case we upload this file since is not a security risk, this corresponds to the docker database.
        - Also for this example we upload the .env.local file in the client folder, this file contains the client configuration, in this case the API URL.

## How to run the project
1. Run `npm run dev` in the root folder
2. Make sure in the logs that the database is up and running
3. Go to `http://localhost:3000` in your browser

## How to run the project without nodemon
1. Run `npm run start` in the root folder
2. Go to `http://localhost:3000` in your browser

## About the project

### Client
 - Stack: React, Nextjs, TailwindCSS, Typescript, Jest
 - The client is a simple comment section where you can CRUD comments
 - About my development process:
    - I changed the styles from the live paring sesion based on this design: https://dribbble.com/shots/17196663-Comments
    - I decided to use the context API to handle the state of the comments, this way I can easily share the state between components, since send it to hooks folder would create a lot of prop drilling and different states.
    - I created a useLoading hook to handle the loading state of the app, this way I can easily show a loading spinner when the app is fetching data. This is also reusable. (To see the loading spinner you can add a throttle in the network tab of the browser)
    - I decided to use an uncontrolled state to handle the comment creation, since only have two inputs and I don't need more functionality than the default behavior.
    - Edit a comment has a controlled state since I need to show the current value of the comment. I don't think is a good practice to have anonymous functions in the render method, so I created a function to handle the change of each input and save and delete the comment.
    - Spinner showed after clicking delete is weird right now since is showed on all the comments, I would add other type of loading status and place it above the comments render.

### Server
- Stack: Express, MYSQL, Jest
- The server is a simple REST API that allows you to CRUD comments
- About my development process:
    - I seperated some files by responsibility, like database configuration, app setup and config export ,this way I can easily find the code that I need to modify.
    - I created a single route and controller to handle the comments, I know by experience that is better have a single controller file by entity instead of having multiple controllers since more entities can came and can be a problem, this way I can easily find the code that I need to modify.
    - I created a pool connection to the database, this way I can easily handle the connection to the database and avoid creating a new connection every time that I need to query the database.

