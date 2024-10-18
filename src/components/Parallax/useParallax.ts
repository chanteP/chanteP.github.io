import { ComponentInternalInstance, Ref, getCurrentInstance, inject, onMounted, provide, ref, watch } from 'vue';
import { useEventListener } from '@vueuse/core';

interface ParallaxBoxOptions {
    name: string;
}

interface Box {
    el?: HTMLElement;
    options?: ParallaxBoxOptions;

    top?: number;
    bottom?: number;

    height: Ref<number>;
    // page scrollTop
    current: Ref<number>;
    // box offset,[-boxH, docH]
    currentOffset: Ref<number>;
    // -1～2
    showPercent: Ref<number>;
}

const injectParallaxKey = Symbol('parallax');

const registeredBoxes: Map<string, Box> = new Map();

interface ParallaxContainerInject {
    current: Ref<number, number>;
    docHeight: Ref<number>;
}

function getScrollTop() {
    return globalThis.document?.documentElement.scrollTop || globalThis.document?.body.scrollTop || 0;
}

function getDocHeight() {
    return globalThis.document?.documentElement.clientHeight ?? 0;
}

function scrollTo(target: string) {
    if (registeredBoxes.has(target)) {
        const box = registeredBoxes.get(target);

        window.scrollTo({
            top: box?.top ?? 0,
            behavior: 'smooth',
        });
    }
}

export function useParallax() {
    const current = ref(0);
    const docHeight = ref(getDocHeight());

    function update(e: Event) {
        current.value = getScrollTop();
        docHeight.value = getDocHeight();
    }

    provide<ParallaxContainerInject>(injectParallaxKey, {
        current,
        docHeight,
    });

    useEventListener('scroll', update, { passive: true });
    useEventListener('resize', update, { passive: true });

    window.addEventListener('hashchange', (e) => {
        e.preventDefault();
        const target = location.hash.slice(1);
        // location.hash = '';
        history.replaceState('', document.title, location.origin);
        scrollTo(target);
    });

    onMounted(() => {
        const target = location.hash.slice(1);
        scrollTo(target);
    });
}

export function injectParallax(wrapperRef: Ref<HTMLElement | undefined>, options: ParallaxBoxOptions): Box {
    const injectData = inject<ParallaxContainerInject>(injectParallaxKey);
    if (!injectData) {
        throw new Error('no parallax inject');
    }
    const { current, docHeight } = injectData;

    const box: Box = {
        options,

        current,
        currentOffset: ref<number>(0),
        height: ref<number>(0),
        showPercent: ref<number>(0),
    };
    registeredBoxes.set(options.name, box);

    function setResize() {
        if (!wrapperRef?.value) {
            console.warn(`no el found`);
            return;
        }
        const el = wrapperRef.value;
        box.el = el;

        const rect = el.getBoundingClientRect();
        const currentScrollTop = getScrollTop();
        if (!rect) {
            return;
        }

        box.top = rect.top + currentScrollTop;
        box.bottom = rect.bottom + currentScrollTop;
        box.height.value = rect.height;
    }

    function updateOffset() {
        const docH = docHeight.value;
        const boxH = box.height.value;
        const top = box.top!;

        if (top >= current.value + docH) {
            // over bottom
            box.currentOffset.value = -boxH;
            box.showPercent.value = -1;
        } else if (top <= current.value - boxH) {
            // over top
            box.currentOffset.value = boxH;
            box.showPercent.value = 1;
        } else {
            const offset = current.value - top;
            box.currentOffset.value = offset;
            box.showPercent.value = offset / boxH;
        }
    }

    onMounted(() => {
        setResize();
        updateOffset();
    });

    watch(() => docHeight.value, setResize);

    watch(() => [current.value, docHeight.value], updateOffset);

    return box;
}

export const floatKey = Symbol('float');
export type FloatOffsetData = { currentOffset: Ref<number>; showPercent: Ref<number> };
