**Dashboard Project**

**Overview**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).\
It is a web application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** and deployed in Vercel through a simple CI/CD Github workflow.

It fetches and displays data from the JSONPlaceholder API, specifically the `/users` and `/posts` endpoints, showcasing proficiency in frontend development, state management, and UI/UX design.
[design here ](https://www.figma.com/proto/ie5W119HaEr232YFWWP8dj/Untitled?node-id=307-236&t=5dpgcGce4j6NisRU-1) 

**Getting Started**

```bash

npm i

```

then run it locally with 

```bash

npm run dev

```

Alternatively you can see the project here

https://dashboard-qkcpb901n-gian-carlo-bandrils-projects.vercel.app/

**Architecture Decisions**

**\
File Structure**\
From the src folder the structure of the project has the default ```app``` folder, a ```components``` folder, a ```context```, ```hooks``` and ```interfaces\```
The components are placed in three different locations based on their scope: 

1.  For very specific components with low reusability a ```component``` folder is placed inside the page folder to be used within its immediate context.
2.  Complex but reusable components are placed inside the ```/components``` folder
3.  Blocks of UI components such as text input are placed in the ```UI``` folder within the components folder

The same though has been brought for the interfaces as each interface is generally within the file that use them. Generic interfaces that defines, for example the result of external apis that might be reused through out many files, have been put in the interface folder.

**State Management**

Ideally for a project of this size and given that NextJS handles fetching and caching out of the box in Server Rendered Components, it would have been fine to keep the states self contained in their components and to rely on composition or a bit of prop drilling to pass down the data. However for the sake of showcasing ContextAPI and useReducer was used to manage the state with the intention of keeping it simple and within the natural capacity of React. The contexts folder contains the modules of each reducer. Each module contains the actions the state and the reducer of a specific part of the application. This is similar to the Duck pattern used in redux.

**Deployment, CI/CD**

The code is saved in Github where 3 Workflows are set: 

1.  A prebuild for the stage branch
2.  A build for the main branch
3.  A third workflow that should create a new Pull request from stage to master whenever the PR from stage is merged. This is failing though because GH don't allow new empty PRs.**\
    **

**What to improve**

**Use Redux**
Although Context + UseReducer was used for simplicity Redux offer more functionality and control, assuming that the application would scale to have a more complex state structure. By using Redux persist we would be able to persist the state, the state management with the API call would be more reliable and debugging would be much easier through Redux Devtools\

**Add Testing**
It would be good to be able to add a workflow that prevent me to merge to stage if testing fails

**Other**
The dashboard is built with the assumption that would be used on desktop environment and therefore the responsiveness was not made a priority
The dashboard is navigable for visually impaired people and has been tested with VoiceOver from macOS but still need more testing
