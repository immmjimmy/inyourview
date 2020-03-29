# In Your View

With the growing number of people utilizing remote work, our group decided to make a hack that would allow remote interviewing. We aimed to provide equal employment opportunity for all candidates. In order to do so, we enabled features that would make it more difficult for interview bias to occur. With In Your View, we hope to expand job opportunities for everyone across the globe.

Checkout our devpost here: https://devpost.com/software/in-your-view

## Getting Started

These following set of instructions will deploy the web application on your local machine for development and demonstration purposes.

### Prerequisites

 * Node.js and npm ( https://docs.npmjs.com/downloading-and-installing-node-js-and-npm )
 * Firebase Account and Project keys ( https://firebase.google.com/docs/web/setup ) 
 * Twillio Account and API access keys ( https://www.twilio.com/docs/sms#build-your-app )
 * MongoDB Atlas Account and Database access keys ( https://www.mongodb.com/cloud/atlas )

### Installing

A step by step series of examples that tell you how to get a development env running

1. Install project dependencies from package.json. This will install all specified packages that are necessary to run the application. Npm will automatically take care of that for you. 

```
cd yourFileSystem/inyourview
npm install
```

2. Create environment file (.env) that will hold all secret. Create a file called ".env" and place it in the "/inyourview" directory with the following contents. If you have trouble finding the keys, refer back to the tutorials above on setting up your accounts. 

```
TWILIO_ACCOUNT_SID=<your key>
TWILIO_API_KEY_SID=<your key>
TWILIO_API_KEY_SECRET=<your key>
FIREBASE_API_KEY=<your key>
FIREBASE_DATABASE_URL=<your key>
MONGO_CONNECT_USER=<your key>
MONGO_CONNECT_PASS=<your key>
```

for example
```
...
TWILIO_ACCOUNT_SID=ISN3Sdsdl3ljdpgithgprwp123notrealkey
...
```

## Running in Development

The final step is to run the React application.

```
npm start
```

React will run a series of scripts that will launch your application. By default, it will open a webpage to localhost:3000 after it has finished. 

## Built With
* [React] (https://reactjs.org/) - Our favorite frontend framework
* [Typescript] (https://www.typescriptlang.org/) - We love type checking
* [ExpressJS] (https://expressjs.com/) - NodeJS + ExpressJS = <3 
* [Firepad] (https://firepad.io/docs/) - Fun collaborative code editing framework
* [Bootstrap] (https://getbootstrap.com/) - Never looked back :)
* [MongoDB] (https://www.mongodb.com/cloud/atlas) - It was nice knowing you tables, bye SQL
* [Twillio] (https://www.twilio.com/docs) - Twillio has so many apis :O
* [DotEnv] (https://www.npmjs.com/package/dotenv) - Don't tell Jimmy I almost commited the api keys
* [Jest] (https://jestjs.io/) - it ain't much but it's honest work


## Acknowledgments

Thank you LA HACKS and all its sponsors and volunteers for hosting this event in such circumstances!
