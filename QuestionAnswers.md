# Which routes are already set up and what are their paths?

DashboardRoute > /
LearningRoute > /learn
RegistrationRoute > /register
LoginRoute > /login
NotFoundRoute > error

# What is the concern of the AuthApiService object?

Adds user and handles login

# What is the concern of the UserContext?

Provides user credentials globally and handles login/logout

# Does the PrivateRoute make use of the UserContext?

If the route is private and the user is idle it signs them out

# What does the /cypress/integration/day-0.1-purpose.spec.js file test?

It checks for the H1 title and specific header to fullfill the user story of stating the name and description of the app

## Which elements on the page are being checked in and what for?

h1 header and the p text to make sure they match
