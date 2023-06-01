import { createApp, provide, h } from "vue";

import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

import DefaultLanding from "./components/DefaultLanding.vue";
import AsteroidsList from "./components/AsteroidsList.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  { path: "/", component: DefaultLanding },
  { path: "/asteroids", component: AsteroidsList },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:3000/graphql",
});

//-----
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(router);

app.mount("#app");
