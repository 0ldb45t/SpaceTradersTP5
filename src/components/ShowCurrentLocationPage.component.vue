<template>
    <div class="d-flex flex-column pt-5 mb-2 w-40 m-3 gap-2">
        <div v-if="agent?.symbol !== ''" class="p-5 text-center align-self-end borderGreen">
            <h4>Position de {{ agent.symbol }} : [ x: {{ shipPosition.x }}, y: {{ shipPosition.y }} ]</h4>
            <h4 class="p-0 m-0">Symbole du systeme: {{ ships[0]?.nav.systemSymbol }}</h4>
            <div v-for="trait in shipPosition.traits">
                <p>{ Symbole: {{ trait.name }} }</p>
                <p>{ Description: {{ trait.description }} }</p>

            </div>
            <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>

        </div>
        <div class="data p-5 text-center flex-column borderGreen" v-if="cell.length > 0">
            <strong>
                <h4>
                    'Vous visez : '
                </h4>
                <div v-for="item in cell">
                    <p :class="{ vousEtesIci: item.vousEtesIci }">{{ item.vousEtesIci }}</p>
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
    <div class="w-100 mb-5">
        <MapComponent v-if="readytoMap" :astres="systemData" :position="shipPosition"
            @displayData="(cell) => { onCellHover(cell) }" />
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import useSpatialStore from '@/store';
import MapComponent from './Map.component.vue';

const store = useSpatialStore();
let agent = store.agent;
const fetchUrl = store.fetchUrl;
const SPIKE_TOKEN = store.SPIKE_TOKEN;
const ships = ref({});
const shipPosition = ref({});
const systemData = ref({});
const systemFacts = ref({});
let readytoMap = ref(false);
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};

const cell = ref({});
const fetchDataShips = async () => {
    fetch(fetchUrl + "my/ships", options)
        .then(response => {
            if (response.ok)
                return response.json()

        })
        .then(json => {
            console.log(ships);
            ships.value = json.data;
        })
        .then(() => fetchDataCurrentSystem());
}
const fetchDataSystem = () => {
    let shipData = ships.value[0].nav;
    fetch(fetchUrl + `systems/${shipData.systemSymbol}`, options)
        .then(response => {
            if (response.ok)
                return response.json()
        })
        .then(json => {
            systemData.value = json.data.waypoints;
            systemFacts.value = json.data;
            readytoMap.value = true;
        })
}
const fetchDataCurrentSystem = () => {
    let shipData = ships.value[0].nav;
    fetch(fetchUrl + `systems/${shipData.systemSymbol}/waypoints/${shipData.waypointSymbol}`, options)
        .then(response => {
            if (response.ok)
                return response.json()
        })
        .then(json => {
            shipPosition.value = json.data;
            console.log(shipPosition);
        })
        .then(() => fetchDataSystem())
}
const onCellHover = (aCell) => {
    cell.value = aCell;
}
onBeforeMount(() => {
    fetchDataShips()
});
watch(
    () => store.agentChanged,
    () => {
        agent = store.getAgent();
    },
    { deep: true }
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