<h1 align="center">
  <a href="https://formify.vercel.app/" target="_blank">
    <img src="public/images/logo.svg" width="130" alt="Formify" />
  </a>
</h1>

<p align="center">
  <a href="https://github.com/Basharath/Formify/blob/master/LICENSE" target="blank">
    <img src="https://img.shields.io/github/license/Basharath/Formify" alt="Formify licence" />
  </a>
  <a href="https://github.com/Basharath/Formify/fork" target="blank">
    <img src="https://img.shields.io/github/forks/Basharath/Formify" alt="Formify forks"/>
  </a>
  <a href="https://github.com/Basharath/Formify/stargazers" target="blank">
    <img src="https://img.shields.io/github/stars/Basharath/Formify" alt="Formify stars"/>
  </a>
  <a href="https://github.com/Basharath/Formify/issues" target="blank">
    <img src="https://img.shields.io/github/issues/Basharath/Formify" alt="Formify issues"/>
  </a>
  <a href="https://github.com/Basharath/Formify/pulls" target="blank">
    <img src="https://img.shields.io/github/issues-pr/Basharath/Formify" alt="Formify pull-requests"/>
  </a>
</p>

<p align="center">
  <a href="https://www.producthunt.com/products/formify?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-formify" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=356112&theme=light&period=daily" alt="Formify - Create&#0044;&#0032;manage&#0032;and&#0032;embed&#0032;forms&#0032;on&#0032;static&#0032;sites&#0032;with&#0032;no&#0032;code | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

Formify is an open source application that lets you create, manage and embed contact forms on any site without writing code.

## How formify works?

1. Visit [formify.vercel.app](https://formify.vercel.app)
2. Create an account by signing up
3. Create a form and copy the script
4. Embed the script on any site
5. Whenever somebody submits the form you can see the data in the submissions of Formify dashboard

**Sample script that get's copied on clicking the code icon**

```js
<script src="https://formify.vercel.app/script.min.js"></script>
<script>
  const fields = 'name,email,message'.split(',').filter((f) => f);
  const formURL = 'https://formify.vercel.app/api/forms/submissions?id=<ID-of-the-form>';
  const heading = 'Contact/feedback';
  formifyInit(fields, formURL, heading);
</script>
```

**To embed forms as components on react based sites, use [`formify-form`](https://github.com/Basharath/Formify-form) npm library**

```js
import { Form } from 'formify-form';

const App = () => {
  return (
    <div>
      <Form
        formFields={['name', 'email', 'message']}
        formURL="https://formify.vercel.app/api/forms/submissions?id=<ID from formify>"
        formTitle="Share your feedback"
      />
    </div>
  );
};
```

## Video demo

To see all the above instructions lively, check this demo video below.

<p align="center">
  <a href="https://www.youtube.com/watch?v=ddXu8QpzpO8">
    <img alt="FormEasy video demo" src="https://img.youtube.com/vi/ddXu8QpzpO8/0.jpg" width="480" height="360"  />
  </a>
</p>

## Tech stack used in formify

- NextJS
- TypeScript
- PlanetScale MySQL database
- Prisma ORM
- Tailwind CSS

## To get started with formify setup locally

1. Clone the repo

```bash
git clone https://github.com/Basharath/Formify.git
```

2. Install the dependencies

```bash
cd Formify
npm install
```

3. Set the environment variables as given in `.env.example` and rename the file to `.env`

```
PLANETSCALE_PRISMA_DATABASE_URL=mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>?sslaccept=strict
JWT_PRIVATE=<Secret key>
SERVER=<URL of the site>
EMAIL_ID=<Email ID for sending notifications>
EMAIL_PASS=<Passsword for the above Email>

# Firebase config variables
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGINGSENDERID=
NEXT_PUBLIC_APPID=
FIREBASE_SERVICE_ACCOUNT_KEY=<Account key as a string>
```

- To get `PLANETSCALE_PRISMA_DATABASE_URL` sign up and create a database on planetscale.com and get the connection URL for Prisma.
- Put any secret text for `JWT_PRIVATE` which is used to sign JWT tokens
- `SERVER` is the URL of the site you will be creating. This is used to give the location for the script source.
- `EMAIL_ID` is the email using which the notification emails will be sent
- `EMAIL_PASS` is the password for the above email
- For social logins create a firebase project and get the config details

4. After all the above environment variables are set, run the below command(s).

```bash
npx prisma db push
npx prisma generate # This runs automatically in the previous command
```

This pushes the Prisma schema to the database and generates schema types to use with the Prisma client

5. Once all the above steps are done, start the dev server by running the following command

```bash
npm run dev
```

Formify app starts running locally with your set database and other details

## License

Formify is distributed using the MIT License. Check the [License details](https://github.com/Basharath/FormEasy/blob/master/LICENSE).
