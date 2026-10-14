import type { RouteRecordRaw } from 'vue-router';

import Main from '@/views/main/Index.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Main,
    },
];
