# auth-doge

## Demo

https://www.loom.com/share/37784027fc174b108a9f704d63a92494

This is an example app which showcases:

- NextJS with server side rendering
- JWT authentication with one-time login codes
- BaseWeb components
- NodeJS with Express server and Mongoose (with MongoDB Cloud Atlas)
- Client side and server-side protected routes

## Why?

This project is intended as a good starting-off point for building modern MVP web apps and can be extended to more complex projects.

I couldn't find any simple real-world examples of JWT authentication anywhere, so I made this one.

## How to use

```
git clone https://github.com/colinricardo/auth-doge.git
```

### API

To run in development:

```
yarn && yarn dev
```

This will pull in the `.env` configuration and start the API on http://localhost:5000.

To run the API using the Heroku CLI, make sure you have the Heroku CLI installed, then:

```
yarn && heroku local
```

This will install the necessary packages and then use the Heroku CLI to start the app. This will pull in the `.env` file, and start the API on http://localhost:5000

At the moment there are only local and production environments (on Heroku).

### Web app

```
yarn && yarn dev
```

This will start the app on http://localhost:3000

## Deployment

The web app is deployed on [Vercel](https://vercel.com) (previously Zeit Now): https://auth-doge.now.sh

The API is deployed on [Heroku](https://heroku.com/): https://auth-doge-api.herokuapp.com

## Why Vercel and Heroku?

I'm kind of sick of Google Cloud Platform -- it requires additional configuration files, which makes code less portable, and it's also pretty slow to deploy new code.

Vercel provides very good NextJS support with very minimal configuration.

Heroku is quick and easy to get up and running, and again, requires minimal configuration.

## Deploying yourself

### API

The API can be deployed anywhere that can run a NodeJS app. For simplicity, it's deployed on Heroku, and doing so requires only that you set the correct environment variables in production (on the Heroku dashboard). These are:

```
CORS_ORIGIN_WHITELIST: List of URLs allowed by CORS, e.g. ["https://auth-doge.now.sh"]
JWT_SECRET: Secret string for verifying Json Web Tokens, e.g. "secretdoge"
MONGODB_URI: A MongoDB URI string. For example, using MongDB Atlas.
```

### Web app

Since the web app uses server side rendering in some places, it also needs to be deployed somewhere that can run a NodeJS app (that is, static hosting won't work properly). For simplicity, it's deployed on Vercel, and doing so requires only that you set the correct envrionment variables in production (on the Vercel dashboard).

These are:

```
API: The URL and API path for where the API is hosted (e.g. "https://auth-doge-api.herokuapp.com/api/v1").
```

## Notes

`deployApi.sh` is just a utility script to deploy only the API to Heroku (rather than the entire git project). This is because when we push the entire repo to Heroku it gets confused.

Of course, the `api` and `app` folders could just be split into two separate repos.

