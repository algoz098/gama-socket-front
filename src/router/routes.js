const routes = [
  // { path: '/src/*'}, // Ignore or pass on to server 
  // { path: '/.quasar/*' }, // Ignore or pass on to server 

  {
    path: '/admin',
    component: () => import('layouts/admin.vue'),
    children: [
      { path: '', component: () => import('pages/admin/index.vue') },
      { path: 'configuration', component: () => import('pages/admin/configuration.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '*', component: () => import('pages/Index.vue') },
    ]
  },
]

export default routes
