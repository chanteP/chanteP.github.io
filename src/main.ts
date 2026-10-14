import { ViteSSG } from 'vite-ssg';
import './styles/style.scss';
import App from './App.vue';
import { routes } from './router';

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes });
