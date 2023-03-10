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
# Define and access relational data
Use the belongsTo and hasMany helpers to define named relationships on your models
Use relationships in route handlers to return a model or collection that's associated with other models
Mirage uses simple foreign keys to keep track of relational data

 ```js
import { createServer, hasMany, belongsTo } from "miragejs"

createServer({
  models: {
    movie: Model.extend({
      castMembers: hasMany(),
    }),
    castMember: Model.extend({
      movie: belongsTo(),
    }),
  },
})

// Now Mirage knows about the relationship between these two models, which can be useful when writing route handlers:
routes(){
  // ...
this.get("/movies/:id/cast-members", (schema, request) => {
  let movie = schema.movies.find(request.params.id)

  return movie.castMembers
})
}
 ```

 # Serializers
 Mirage also has a Serializer layer that can help you emulate the kinds of transforms that are commonly applied to APIs, like whether your JSON object keys are camelCased or snake_cased, or how related data gets included in a response.

`include: ['list']` tells Mirage that every time it encounters a Reminder model in the response of a route handler, it should include its associated List (if it has one).

Second, `embed`: true tells Mirage how to serialize the included resources. By default they are side-loaded but this API expects them to be embedded, as shown in the JSON snippet above.

https://miragejs.com/docs/main-concepts/serializers/