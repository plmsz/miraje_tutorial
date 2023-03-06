Mirage runs in the browser. It intercepts any XMLHttpRequest or fetch requests your JavaScript app makes and lets you mock the response.

# Shared server in react app
https://miragejs.com/quickstarts/react/develop-an-app/

# Static GET
1 - create a server
2 - create a route

```js
import { createServer } from "miragejs"

createServer({
    routes() {
        this.get("/movies", () => {
            return {
                movies: [
                    { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 },
        ],
      }
    })
  },
})
```
# Static POST
- Route handlers should faithfully recreate important details of production server endpoints, like unique IDs

```js
 import { createServer } from "miragejs"

createServer({
    routes() {
    this.namespace = "api"

    // Responding to a POST request
    this.post("/movies", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      attrs.id = Math.floor(Math.random() * 100)

      return { movie: attrs }
    }
    )
  },
})
```
# Dynamic requests
If you broken the referential integrity of our application data (change tabs for eg), it  will no longer behaves the same way our production API will.
Let's fix this by using Mirage's data layer.
We'll start by defining a Reminder model, which will tell Mirage to create a reminders collection for us in its in-memory database:

```js
import { createServer, Model } from "miragejs"

createServer({
  models: {
    movie: Model,
  },

  routes() {
    this.namespace = "api"

    this.get("/movies", (schema, request) => {
      return schema.movies.all()
    })
  },
})
```

# Seeds 
 ```js
 createServer({
  models: {
    movie: Model,
  },

  routes() {
    this.namespace = "api"

    this.get("/movies", (schema, request) => {
      return schema.movies.all()
    })
  },

  seeds(server) {
    server.create("movie", { name: "Inception", year: 2010 })
    server.create("movie", { name: "Interstellar", year: 2014 })
    server.create("movie", { name: "Dunkirk", year: 2017 })
  },
})
 ```
 # Dynamic segments
 Use :segmentName to define a dynamic segment in the URL for a route handler
 Access dynamic segments via request.params.segmentName
 Use schema.* methods like destroy() to maintain data integrity
 
 ```js
 this.delete("/movies/:id", (schema, request) => {
  let id = request.params.id

  return schema.movies.find(id).destroy()
})
 ```