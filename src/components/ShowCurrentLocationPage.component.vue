<template>
    <div class="d-flex flex-row w-100 justify-content-between align-items-start ">
        <div class="d-flex flex-column justify-content-start w-25 m-3 mt-0 gap-3">
            <div v-if="agent?.symbol !== '' && readytoMap" class="p-3 align-self-end borderGreen">
                <h4>Position de {{ agent.symbol }} : [ x: {{ shipPosition.x }}, y: {{ shipPosition.y }} ]</h4>
                <h4 class="p-0 m-0">Symbole du systeme: {{ shipPosition?.systemSymbol }}</h4>
                <router-link to="/currentLocation/contrats">
                    <button>Afficher les contrats</button>
                </router-link>
                <div v-for="trait in shipPosition.traits">
                    <p class="text-end textMid">{ Symbole: {{ trait.name }} }</p>
                    <p class="text-start textMid"> Description: {{ trait.description }} </p>
                    <hr class="borderGreen ms-5 me-5" />
                </div>
                <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>

            </div>

        </div>
        <div class="data p-5 text-center flex-column borderGreen w-25 me-3" v-if="cell.length > 0">
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
        <div class=" d-flex justify-content-center align-items-center mr-3 w-50 flex-shrink-0">
            <MapComponent v-if="readytoMap" />
        </div>

    </div>
</template>
<script setup>
import { onBeforeMount, computed, watch } from 'vue';
import { useAdminAgentStore, useMapStore, useSystemStore } from '@/store';
import MapComponent from './Map.component.vue';

const agentStore = useAdminAgentStore();
const systemStore = useSystemStore();
const mapStore = useMapStore();
const agent = agentStore.agent;
const shipPosition = computed(() => systemStore.position);
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
.vousEtesIci {
    color: red;
}

.borderGreen {
    border: 2px solid green;
}

.textMid {
    font-size: large;
}

button {
    border: 2px solid #3cff00;
    background-color: black;
    color: #3cff00
}
</style>