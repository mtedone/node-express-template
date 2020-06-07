# Node.JS Express Template

This project provides a skeleton that provide the basis to start a Web Server with Express.

The template is modular and provide the following capabilities/libraries already setup:

- It is modular. the `app.js` file is what does the work of setting up Express. `index.js` simply starts the web server on `process.env.PORT`
- It is already set up to allow for routes. To create a new route, simply:
  - Add a new `<route.js>` file under the `routes` folder. You can use the `/routers/home.js` file for an example.
  - Add the new route in `app.js`
  - Et voila'. You are ready to go
- It packs the npm `jsonwebtoken` library and under the `middleware` folder provides an `auth.js` file which provides an `auth` function which verifies a JWT token. You need to fill the blanks
- It comes with the npm module `bcryptjs` to hash sensitive information
- It comes with `Jest` installed as a dev-dependency and an a test to validate the jtw methods under the `tests` folder. You can build from that
- It comes with `supertest` as a dev-dependency to test Express from Jest

If you'd like to contribute, please fork the repository and issue a PR. For any problems please raise an issue.

# How to start

- From the command line enter the command `npm install`
- Create a `config` folder under the root of this project and a dev.env file under it with the value: `PORT=3000` (or whatever other value you this opportune). This will be used by both `npm run dev` and `npm run test`
- To run the server in local mode, from the root of the project, type the command: `npm run dev`
- To run the tests, from the root of the project, type the command: `npm run test`
- To start in debug mode, from the root of the project, type the command: `npm dev-debug`
