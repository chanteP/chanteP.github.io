import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import ViteSSG from 'vite-ssg';
import { setup } from '@css-render/vue3-ssr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    ssr: {
        noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

    ssgOptions: {
        script: 'async',
        // https://www.naiveui.com/zh-CN/os-theme/docs/vite-ssge
        async onBeforePageRender(_, __, appCtx) {
            const { collect } = setup(appCtx.app);
            (appCtx as any).__collectStyle = collect;
            return undefined;
        },
        async onPageRendered(_, renderedHTML, appCtx) {
            return renderedHTML.replace(/<\/head>/, `${(appCtx as any).__collectStyle()}</head>`);
        },
    },


  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";`,
      },
    },
  },
});
