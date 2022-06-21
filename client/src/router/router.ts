import { createRouter, createWebHistory } from "vue-router";
import { animations } from "../animationsList/animationsList";

const generateRoutes = () => {
  const routes = [];
  for (const i of animations) {
    const route = {
      path: "/" + i.route,
      name: i.route,
      component: () => {
        return import(`../components/animationsComponents/${i.route}.vue`);
      },
      meta: {
        description: i.description,
      },
    };
    routes.push(route);
  }
  return routes;
};

generateRoutes();

const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes(),
});

export default router;
