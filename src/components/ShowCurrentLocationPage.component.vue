<template>
    <div class="d-flex flex-row w-100 justify-content-around align-items-start gap-0">
       <LoaderComponent v-if="systemStore.notReadytoDisplayMap" />
        <div v-if="agent?.symbol !== '' && readytoMap"
            class="d-flex flex-column justify-content-start w-25 m-3 mt-0 me-0 gap-3">
            <ShipCurrentPositionActions />
        </div>
        <div class="w-25 d-flex flex-column" v-if="readytoMap">
            <div class="borderGreen w-100 mb-2">
                <MapLegend />
            </div>
            <div class="data text-center flex-column borderGreen w-100 mb-2" v-if="cell.length > 0">
                <PositionDiv />
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-shrink-0 m-0 p-0">
            <MapComponent v-if="readytoMap" />
       </div>
    </div>
</template>
<script setup>
import { onBeforeMount, computed, watch } from 'vue';
import { useAdminAgentStore, useMapStore } from '@/store';
import { useSystemStore } from '@/store/systemStore';
import ShipCurrentPositionActions from './ShipCurrentPositionActions.component.vue';
import MapComponent from './Map.component.vue';
import MapLegend from './MapLegend.component.vue';
import PositionDiv from './PositionDiv.component.vue';
import LoaderComponent from './Loader.component.vue';
const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const mapStore = useMapStore();


const agent = computed(() => agentStore.agent);
const readytoMap = computed(() => systemStore.readytoMap);
const cell = computed(() => mapStore.cell);

onBeforeMount(() => {
    if (agentStore.agentToken !== undefined) {
        systemStore.getSystemData(agentStore.agentToken)
    }
});
watch(
    () => agentStore.agentToken,
    (value) => systemStore.getSystemData(value)
);
</script>
<style scoped>

.textMid {
    font-size: large;
}

</style>