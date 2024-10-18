// import { simpleInit } from '@/utils/gl';
import worldMap from '@surbowl/world-geo-json-zh';
import { type Ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

export function useMap(canvasRef: Ref<HTMLCanvasElement | undefined>) {
    console.log(worldMap)

    onMounted(() => {
        // simpleInit(canvasRef.value!, {});
    });
    onBeforeUnmount(() => {
        //
    });
}
