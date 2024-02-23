import { RouteRecordRaw } from 'vue-router';

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') },
//       {path: 'account', component: () => import('pages/AccountPage.vue')},
//       {path: 'cart', component: () => import('pages/CartPage.vue')},
//       {path: 'qr-generator', component: () => import('pages/QRGeneratorPage.vue')}
//     ],
    
//   },
//   {path: '/login', component: () => import('pages/LoginPage.vue')},

//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue'),
//   },
// ];

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {path: 'account', component: () => import('pages/AccountPage.vue')},
      {path: 'cart', component: () => import('pages/CartPage.vue')},
      {path: 'history', component: () => import('pages/HistoryPage.vue')},
      {path: 'qr-generator', component: () => import('pages/QRGeneratorPage.vue')}
    ],
    
  },
  {path: '/', component: () => import('pages/LoginPage.vue')},

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
