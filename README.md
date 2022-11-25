# raging-goblin

Whoa...it's like mildly distressing archaeology...

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

### Requirements ###

- Node 6+
- NPM 4+
- Yarn 0.22+ (_optional_)

Once the application is running, it will be available on `http://localhost:7001`.

- `start`: Starts the application locally
- `test`: Runs unit tests one time
- `tdd`: Runs unit tests in watch mode; changes to any component will automatically execute tests
- `build`: Runs webpack to bundle the application, but does not start the dev server
- `ci`: Runs tests and builds the application
