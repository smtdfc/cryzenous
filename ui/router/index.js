import { RumiousRouterModule, RumiousRouterStrategies, routerLazy } from 'rumious-router';

export default function(app) {
  const router = app.addModule(RumiousRouterModule, {
    strategy: RumiousRouterStrategies.hash,
    wrappers: {
    },
    routes: {
      '/': {
        components: [
          routerLazy(() => import('../pages/home.jsx'))
        ]
      },
      '/project/create': {
        components: [
          routerLazy(() => import('../pages/project/create.jsx'))
        ]
      },
    }
  });
  
  router.on('error', (d) => console.log(d));
  app.router = router;
  return router;
  
}