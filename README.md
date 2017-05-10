#raging-goblin

<!--- bit --->
__raging-goblin__ is the UI application for www.stepinto.io.  The site implements Angular 4, and is written entirely in
TypeScript.  Continuous integration and testing is provided by Travis CI, which fails all builds that do not include
100% unit test coverage.  End-to-end testing is implemented using Protractor.

Future development includes:
- Implementation of a simple user login and commenting system
- Implementation of behavior-driven testing utilizing Gherkin language to drive E2E testing
- Compliance with WCAG 2.0 standards for accessibility.
<!--- /bit --->

## Running the Application

Ideal, the application should be run locally with Docker.  Note that, should you wish to switch from running in Docker
to NPM/Yarn or vice-versa, you must first delete the `node_modules` directory.

Once the application is running, it will be available on `http://localhost:7001`.

### Using Docker (recommended)

Ensure that Docker v17 or higher is installed and running. In the app root, run:

```shell
docker-compose up
```

Wait for the image to build the container to attach.  To run tests:

```shell
./docker-test.sh
```

### NPM/Yarn Commands

The application can also be run with `npm` or `yarn` directly using the following commands:

* `start`: Starts the application locally; it can seen at http://localhost:7001/
* `test`: Runs unit tests one time
* `tdd`: Runs unit tests in watch mode; changes to any component will automatically execute tests
* `build`: Runs webpack to bundle the application, but does not start the dev server
* `ci`: Runs tests and builds the application

