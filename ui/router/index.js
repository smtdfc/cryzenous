import { RumiousRouterModule, RumiousRouterStrategies, routerLazy } from 'rumious-router';
import {ProjectViewWrapper} from '@components/wrappers/ProjectViewWrapper.jsx';

export default function(app) {
  const router = app.addModule(RumiousRouterModule, {
    strategy: RumiousRouterStrategies.hash,
    wrappers: {
      "/project/view/:id/*":[
        ProjectViewWrapper
      ]
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
      '/project/view/:id/overview': {
        components: [
          routerLazy(() => import('../pages/project/view/overview.jsx'))
        ]
      },
    }
  });
  
  router.on('error', (d) => console.log(d));
  app.router = router;
  return router;
  
}