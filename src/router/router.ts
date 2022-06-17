import { createRouter, createWebHistory } from 'vue-router';
import { animations } from '../animationsList/animationsList';

const generateRoutes = () => {
	const routes = [];
	for (const i of animations) {
		const route = {
			path: '/' + i.route,
			name: i.name,
			component: () => {
				return import(`../components/animationsComponents/${i.name}.vue`);
			},
		};
		routes.push(route);
	}
	console.log(routes);
	return routes;
};

generateRoutes();

const router = createRouter({
	history: createWebHistory(),
	routes: generateRoutes(),
});

export default router;
