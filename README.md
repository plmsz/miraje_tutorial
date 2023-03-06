Mirage runs in the browser. It intercepts any XMLHttpRequest or fetch requests your JavaScript app makes and lets you mock the response.

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