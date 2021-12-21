import { createRouter, createWebHistory } from 'vue-router'

const lazyLoadRoute = (pageName) => {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${pageName}`)
}

const lazyLoadLayout = (pageName) => {
  return () => import(/* webpackChunkName: "[request]" */ `@/layouts/${pageName}`)
}

const routes = [
  {
    path: '/login',
    meta: { title: 'Login' },
    component: lazyLoadLayout('AuthLayout'),
    children: [
      {
        path: '',
        name: 'login',
        component: lazyLoadRoute('Auth/Login'),
        meta: { title: 'Login' }
      }
    ]
  },

  {
    path: '/',
    component: lazyLoadLayout('MainLayout'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: lazyLoadRoute('Dashboard'),
        meta: { title: 'Dashboard' }
      },

      {
        path: '/project',
        component: lazyLoadRoute('Base'),
        meta: { title: 'Project' },
        children: [
          {
            path: '',
            name: 'project',
            component: lazyLoadRoute('Project')
          },

          {
            path: 'new',
            name: 'project-new',
            component: lazyLoadRoute('Project/new'),
            meta: { title: 'New Project' }
          },

          {
            path: ':id/edit',
            name: 'project-edit',
            component: lazyLoadRoute('Project/_id'),
            meta: { title: 'Edit Project' }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'is-active',
  routes
})

export default router
