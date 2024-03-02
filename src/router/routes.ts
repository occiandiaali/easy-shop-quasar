import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {path: '/onboard', component: () => import('components/OnBoardComponent.vue')},
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {path: 'cart', component: () => import('pages/CartPage.vue')},
      {path: 'history', component: () => import('pages/HistoryPage.vue')},
      {path: 'qr-generator', component: () => import('pages/QRGeneratorPage.vue')}
    ],
    
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
