const e=`---
title: "Experimenting With tldraw's Infinite Canvas"
date: "2026-02-25"
---

[Github Repository](https://github.com/sanassi/infinite-canvas) (private for now, I need to remove API keys from the git history).

\`tldraw\` is a useful and highly customizable infinite canvas React component and React SDK.

You can try it here: [\`Project Link\`](https://infinite-canvas.sanassicisse.workers.dev/).

# App Idea

Took inspiration from Reddit's \`r/place\` [link](https://www.reddit.com/r/place/).

I'm building a simple drawing app where users can submit artworks,  
wait for review (moderated by an admin user), and if approved the artwork  
is displayed on a global canvas.

Users can also click on artworks on the global canvas and see who created it,  
when, and upvote/downvote the artwork.

# Stack

## Auth

As usual, user authentication is done via \`Auth0\`.  
I'll try to squeeze as much as I can from the free tier.

## Database

No reason why I shouldn't use PostgreSQL for this.

## Frontend

As usual, a TypeScript + React project using Vite.

## Backend

Chose to build a .NET ASP Web API.  
Why? Because it has been a while since I worked with C#, and the Entity Framework ORM  
works like a charm for my needs here.  
I can define SQL tables and relations directly with C# classes and programmatically add  
constraints.

# Implem

## First: Drawing Stuff on the Frontend

The main purpose of the app is to draw on a canvas. After a ton of research, I've settled  
on using [TlDraw](https://tldraw.dev/), an infinite canvas library which comes with a highly  
customizable React component library and extensive documentation.

### The main behavior of the frontend is as follows:

- Attach a callback when the \`<TlDraw/>\` canvas component [mounts](https://tldraw.dev/docs/editor) that will fetch approved artworks to display.
- Store the initial canvas state (snapshot) using the lib's editor state and localStorage (doc [example](https://tldraw.dev/examples/snapshots)).
- Let the user draw on the canvas as they please.
- When ready, they click on a save button with an \`onClick\` callback that will:
  - Compute the diff of the editor state (get the artwork [shapes](https://tldraw.dev/sdk-features/shapes) that were added).
  - Do a backend API call to persist the new shape in \`Pending\` mode, waiting to be approved.

Then later for \`admin\` users:

- Log in and go to the profile page to approve/reject pending artworks.

### Routing

To implement multiple pages for the app (\`/login\`, \`/profile\`, etc...), I'm using \`react-router\` and its  
\`BrowserRouter\` component, under which I define the main routes of my app.

\`\`\`jsx
Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chooseUsername" element={<ChooseUsername />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
. . .
\`\`\`

## Adding basic authentication to the frontend

Auth0 makes it easy and free (although with a ton of restrictions) to secure React Single Page Applications (SPA).  
Useful tutorials can be found on their [docs](https://auth0.com/docs/quickstart/spa/react).

For my app, I'm using JWT-based authentication for the frontend and later for the backend.

To allow some pages to be accessible to non-authenticated users, I wrap routes that need to be secured  
in a custom \`<ProtectedRoute/>\` component (routes passed as \`React.JSX.Element\` children).  
In it, I use the Auth0 React hook \`useAuth0\`, which returns info about the user (whether the user is authenticated or a full \`User\` object with useful data).  
If the user is authenticated, then the route is returned, otherwise the user is redirected to the login page.

## Hooking up a Backend

The backend also needs users to be authenticated when making requests.  
Auth0 provides a way to add authentication to APIs. The docs also include an example for [ASP.NET Core apps](https://auth0.com/docs/quickstart/backend/aspnet-core-webapi); it's not exactly what I've used but looks close enough.

When making API calls, the frontend will add an Auth0-generated access token as \`Bearer <token>\` in the request authorization headers, which will be decoded and verified by the backend.

### Role Based Access Control

Auth0 also comes with [PostLogin](https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-api-object) actions (limited to 5 for the free tier...).  
Those actions enable users to add custom claims to access tokens issued when a user logs in. Those claims can include role, username, etc.

The role claim is useful here to restrict access to some API routes to only certain users (admins).  
I've tagged multiple API endpoints with the ASP.NET tag [\`[Authorize]\`](https://learn.microsoft.com/en-us/aspnet/core/mvc/security/authorization/simple?view=aspnetcore-10.0), with the \`admin\` role for my special users :).

### Data persistence

As mentioned earlier, I'm using PostgreSQL as a database.  
The .NET ecosystem has the Entity Framework ORM. I've been able to build a somewhat clean data access layer with it. It is also remarkably flexible (I've only had to update the connection string when deploying the app later on).

The Npgsql docs provide an [example](https://www.npgsql.org/efcore/index.html?tabs=onconfiguring) to configure a DB connection and get started quickly.

For privacy's sake, I won't disclose the structure of my DB schemas (but the project is simple enough you can imagine what it looks like!).

One of my favorite features is the handling of database migrations, with the \`dotnet ef migrations [cmd]\` command.

# Deploying the App

The main goal was to keep it super cheap to host and run.  
So AWS was not going to work since my free tier access and credits expired earlier in March (rip Bezos).

For the backend, I've decided to use [Fly.io](https://fly.io/dashboard/sanassi-cisse/new-launch?tab=cli). It's a pay-as-you-go service with low prices, built to efficiently deploy Docker containerized applications.  
Fly.io also comes with a Grafana dashboard set up and ready to use, along with a nice Cost Explorer page.  
I would also recommend setting up [Github Actions](https://fly.io/docs/launch/continuous-deployment-with-github-actions/) to auto-deploy the app on merges to main (assuming the CI tests passed successfully).

The setup via the web UI was broken (or perhaps I am terrible at deploying stuff, who knows), so I would recommend launching your apps via the CLI instead.

For the frontend, [Cloudflare Pages](https://pages.cloudflare.com/) is free and was super easy to set up.

Finally, my Postgres DB is provided by [Supabase](https://supabase.com/pricing). Its free tier is more than enough for my toy web app.

# Technical Difficulties

## Free Tier Restrictions

Most of the hard work for this project was developing within free tier features, especially with Auth0.  
The free tier enables only a single tenant for all your projects, so no separated Dev, Prod, or Staging environments.  
A ton of workarounds and excessive use of Post Login Actions had to be made to make the app usable.

Maybe next time I'll look into using a self-hosted authentication service, or maybe developing my own (who knows what the future holds).

# Conclusion

This was super fun to do and took around 2 weeks to complete (I mean to have an MVP) (I also took a ton of breaks).

It would have been more challenging to reimplement the canvas myself, but TlDraw was so nice to use that I don't really mind. Also, they give out Hobby licenses pretty quickly, so thanks to them.
`;export{e as default};
