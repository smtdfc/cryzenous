import { RumiousRouterModule, RumiousRouterStrategies, routerLazy } from 'rumious-router';
import {ProjectViewWrapper} from '@components/wrappers/ProjectViewWrapper.jsx';

export default function(app) {
  const router = app.addModule(RumiousRouterModule, {
    strategy: RumiousRouterStrategies.hash,
    wrappers: {
      '/project/view/:id/*':[
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
      '/project/view/:id/deployment': {
        components: [
          routerLazy(() => import('../pages/project/view/deployment.jsx'))
        ]
      },
      '/project/view/:id/task': {
        components: [
          routerLazy(() => import('../pages/project/view/tasks.jsx'))
        ]
      },
      '/project/:id/task/create': {
        components: [
          routerLazy(() => import('../pages/project/task/create.jsx'))
        ]
      },
      '/project/:project_id/task/:task_id/edit': {
        components: [
          routerLazy(() => import('../pages/project/task/edit.jsx'))
        ]
      },

    }
  });
  
  router.on('error', (d) => console.log(d));
  app.router = router;
  return router;
  
}