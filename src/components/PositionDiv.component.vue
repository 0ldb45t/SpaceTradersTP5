<template>
    <div class="data text-center flex-column w-100 mb-2" v-if="cell.length > 0">
        <strong>
            <h4>
                Vous visez :
            </h4>
            <div v-for="(item, i) in cell">
                <p v-if="i === 0" :class="{ vousEtesIci: item.vousEtesIci }">{{ item.vousEtesIci }}</p>
                <p>
                    {{ item.symbol }} : {{ item.type }} :
                </p>
                <p>
                    [x:{{ item.x }}, y:{{ item.y }}]
                </p>
            </div>
        </strong>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useMapStore, useSystemStore } from '@/store';

const systemStore = useSystemStore();
const mapStore = useMapStore();

const cell = computed(() => mapStore.cell);

</script>