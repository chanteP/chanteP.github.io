<script setup lang="ts">
import { watch, onMounted, ref, type Ref, computed } from 'vue';
import * as echarts from 'echarts';
import worldMap from '@surbowl/world-geo-json-zh';

const $wrapper = ref<HTMLElement>();

const ColorLand = '#f0f0f0';
const ColorLandBorder = '#aaa';

function getMapOptions() {
    let option = {

        // geo: {
        //     componentType: 'geo',
        // },
        visualMap: {
            min: 0,
            max: 10000,
            left: 'left',
            top: 'bottom'
        },
        series: [
            {
                name: '世界地图',
                type: 'map',
                map: 'world',
                roam: 'move', // 是否允许缩放和拖动
                zoom: 10,
                selectedMode: false,
                // 地图陆地颜色
                itemStyle: {
                    normal: {
                        areaColor: ColorLand, // 陆地颜色
                        borderColor: ColorLandBorder // 地图边界颜色
                    },
                    emphasis: {
                        areaColor: '#ffebf0' // 鼠标悬浮时的陆地颜色
                    }
                },
                select: {
                    disable: true,
                },
                label: {
                    show: false,
                },
                // 高亮
                emphasis: {
                    disabled: true,
                }
            }
        ],
    };
    return option;
}


onMounted(() => {
    const chart = echarts.init($wrapper.value);

    // @ts-expect-error
    echarts.registerMap('world', worldMap);
    chart.setOption(getMapOptions());
});

</script>

<template>
    <div ref="$wrapper" class="map-wrapper"></div>
</template>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
