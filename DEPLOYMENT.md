# Deploying Freelancer's Calendar
The purpose of this document is to specify the **requirements** for a
successful deployment. This is not a tutorial on deployment. There are a lot of
options available, and keeping a guide up-to-date would be an excercise in
frustration.

The main requirements are as follows:
 - A server than can deploy the site over HTTPS

 - A mongoDB instance

 - A Google Developer account (required for authentication, but can be changed if
 you are willing to do a little coding)

## Deploying over HTTPS

A simple option is to add HTTPS to the Node.js server.
The api and examples may be found on 
[nodejs.org](https://nodejs.org/api/https.html)

A slightly more complicated but better option would be to use Nginx. Nginx
setups are outside the context of this document, but effectively the steps
are as follows:

1. Setup Nginx and enable HTTPS
2. Proxy route to the localhost port specified in `serv/index.js`

(optional)
 Proxy only the `/api` and `/auth` routes and use Nginx to serve your static
files.

## MongoDB Instance

MongoDB has [guides](https://docs.atlas.mongodb.com/) for hosting instances on
several platforms. Place your Connection String URI in the config folder,
[example](serv/config/dev.example.js), and update the variable name if desired
(the URI is only used in `serv/index.js`).


## Google Developer Account
By default the application allows login through google, which requires a host
to set up the developer api keys.

Google has a brief tutorial
[here](https://support.google.com/cloud/answer/6158849?hl=en). Once configured,
add the keys to the config folder (see example above).
