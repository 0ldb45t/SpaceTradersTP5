<template>
    <div class="d-flex flex-row w-100 justify-content-center align-items-start flex-grow-0">
        <div class="d-flex flex-column justify-content-start w-40 m-3 mt-0 gap-3">
            <div v-if="agent?.symbol !== '' && readytoMap" class="p-4 text-center align-self-end borderGreen">
                <h4>Position de {{ agent.symbol }} : [ x: {{ shipPosition.x }}, y: {{ shipPosition.y }} ]</h4>
                <h4 class="p-0 m-0">Symbole du systeme: {{ shipPosition?.systemSymbol }}</h4>
                <div v-for="trait in shipPosition.traits">
                    <p>{ Symbole: {{ trait.name }} }</p>
                    <p>{ Description: {{ trait.description }} }</p>
                </div>
                <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>

            </div>
            <div class="data p-5 text-center flex-column borderGreen" v-if="cell.length > 0">
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
        </div>
        <div class=" d-flex justify-content-center align-items-center mr-3">
            <MapComponent v-if="readytoMap" />
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue';
import { useAdminAgentStore, useMapStore, useSystemStore } from '@/store';
import MapComponent from './Map.component.vue';

const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const mapStore = useMapStore();
const agent = agentStore.agent;
const shipPosition = computed(() => systemStore.position);
const readytoMap = computed(() => systemStore.readytoMap);

const cell = computed(() => mapStore.cell);

const onCellHover = (aCell) => {
    cell.value = aCell;
}
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
.vousEtesIci {
    color: red;
}
.borderGreen {
    border: 2px solid green;
}
ul {
    list-style: none;
}
</style>