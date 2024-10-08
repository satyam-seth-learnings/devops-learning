# AM Blog

AM Blog is a simple blogs site, consisting of a "**Blogs**" page to display all posts, an "**About**" page, and "**New Blog**" page to add new posts if the user is logged in.<br>
I created a simple sign up and sign in pages, and for authentication I used **JWT** (JSON Web Tokens). The logged in user can delete there own blogs individually.

I used **Node.js** with **Express** framework to mange routing, requests, server-side logic and responses.

> You can find more information about **Express** [here](https://expressjs.com).

To output the dynamic data that come from database I used a view engine **EJS**

## EJS :

`Embedded JavaScript templating`

-**How dose EJS work?**

The view files live on the server and we want to render one through the browser that view file is passed into the EJS view engine to be processed, the engine looks for any kind of dynamic content, variables, loops... etc. Then whenever it finds those it figures out the resulting HTML code for those parts and in the end it spits out a valid HTML page based on the template we wrote and then the HTML page with the resulting data inside it will be returned to the browser, and this whole process is called **server-side** rendering.

> You can find more information about **EJS** [here](https://ejs.co).

## Database

I used **MongoDB** to handle data, with **Mongoose** I created a Schema for the blogs, it's simple, consisting of: title, snippet and body, with a JSON object timestamps -generated and saved automatically in the database- to sort blogs by creation date.

## MVC approach

It stands for **Model**, **View**, **Controller**. It's a method of structuring the code and files to make the code more modular, reusable and easier to maintain.

**Models** are how to describe the data structure and use them to interact with the database.

**Views** are how to make HTML templates that the a user will see.

**Controllers** is the thing that forms the link between models and views, it use models to get data and then pass that data into a view.

The idea behinde this approach is to make the code easier to manage and to undestand, so I splitted the code into different areas of files and then each area of file has its own job to do, so the route file matches incoming requests and it passes those requests to the correct controller function. A controller communicates with the appropriate model to get dtat into a view, then the view renders that data into it's template and it get sent to the browser.

## Authentication and validation :

for user registration, login and proper data entry verification process I used:

- **JWT**:
  JSON Web Token is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.<br>
  You can find more information about **JWT** [here](https://jwt.io).

- **Validator**:
  It is a third-party validation package, this package has different functions inside it that we can use to validate differnt things and one of those things is to validate an E-mail. I used "isEmail " instead of creating my own function to validate the E-mail.<br>
  You can find more information about **Validator** [here](https://www.npmjs.com/package/validator).
  
## Installation

- Clone the project or download it.
- Run `npm install` in project folder.
- The app needs to connect to **mongodb** database via **MongoDB URI** in the **.env** file.

- Create a database named `blog` if needed.

- Run the project with `node app.js`.
- The App will run on [http://localhost:3000](http://localhost:3000/) in the browser.
