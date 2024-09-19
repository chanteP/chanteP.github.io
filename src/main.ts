// import { createApp } from 'vue'
import { ViteSSG } from 'vite-ssg/single-page';
import './styles/style.scss';
import App from './App.vue';

export const createApp = ViteSSG(App);
