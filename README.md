<h1 align="center">Formify</h1>

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

Formify is an open source application that lets you create, manage and embed contact forms on any site without writing code.

This project is done as a part of [PlanetScale](https://planetscale.com/) and [HashNode](https://hashnode.com/) hackathon.

## How formify works?

1. Visit [formify.vercel.app](https://formify.vercel.app)
2. Create an account by signing up
3. Create a form and copy the script
4. Embed the script on any site
5. Whenever somebody submits the form you can see the data in the submissions of Formify dashboard

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
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<Google auth client ID>
```

- To get `PLANETSCALE_PRISMA_DATABASE_URL` sign up and create a database on planetscale.com and get the connection URL for Prisma.
- Put any secret text for `JWT_PRIVATE` which is used to sign JWT tokens
- `SERVER` is the URL of the site you will be creating. This is used to give the location for the script source.
- To get `NEXT_PUBLIC_GOOGLE_CLIENT_ID` visit [Google cloud credentials](https://console.cloud.google.com/apis/credentials) and create a new credentials for the website and get the client ID.

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
