# Vue - Routing

In this project I am learning about routing on Vue.js

## Learned things

- alias allow to have some paths for the same component
- vue-router allows to have multiples router-view tags on the same component
- Also you can have name routes for use on before feature
- Global route guards like beforeEach and afterEach
  - beforeEach normally used to protect the routes
  - afterEach normally used to send analytics data
- Specific route guard do you need to use beforeEnter that you can use on router config or inside the component.
- Also you have beforeRouteLeave that is usually used to confirm changes before leave a page.
- Meta data: Is to pass extra data to the route. An use case is for mark routes than needs authentication. Then you can add a property in meta to mark a route likes need auth
- Separate router in other file to order
