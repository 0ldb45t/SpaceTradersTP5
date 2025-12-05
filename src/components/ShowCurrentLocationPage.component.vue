<template>
    <div class="d-flex flex-row w-100 justify-content-center align-items-start flex-grow-0">
        <div class="d-flex flex-column justify-content-start w-40 m-3 mt-0 gap-3">
            <div v-if="agent?.symbol !== ''" class="p-4 text-center align-self-end borderGreen">
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
            <MapComponent v-if="readytoMap" :astres="systemData" :position="shipPosition"
                @displayData="(cell) => { onCellHover(cell) }" />
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue';
import useSpatialStore from '@/store';
import MapComponent from './Map.component.vue';

const store = useSpatialStore();
let agent = store.agent;
const fetchUrl = store.fetchUrl;
const ships = ref({});
const shipPosition = ref({});
const systemData = ref({});
const systemFacts = ref({});
let readytoMap = ref(false);

const cell = ref({});
const fetchDataShips = (agentToken) => {
    const options = {
        method: 'GET',
        headers: { Accept: 'application/json', Authorization: 'Bearer ' + agentToken }
    };
    fetch(fetchUrl + "my/ships", options)
        .then(response => {
            if (response.ok)
                return response.json()

        })
        .then(json => {
            ships.value = json.data;
        })
        .then(() => fetchDataCurrentSystem(agentToken));
}
const fetchDataSystem = (agentToken) => {
    const options = {
        method: 'GET',
        headers: { Accept: 'application/json', Authorization: 'Bearer ' + agentToken }
    };
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
const fetchDataCurrentSystem = (agentToken) => {
    const options = {
        method: 'GET',
        headers: { Accept: 'application/json', Authorization: 'Bearer ' + agentToken }
    };
    let shipData = ships.value[0].nav;
    fetch(fetchUrl + `systems/${shipData.systemSymbol}/waypoints/${shipData.waypointSymbol}`, options)
        .then(response => {
            if (response.ok)
                return response.json()
        })
        .then(json => {
            shipPosition.value = json.data;
        })
        .then(() => fetchDataSystem(agentToken))
}
const onCellHover = (aCell) => {
    cell.value = aCell;
}
onBeforeMount(() => {
    if (store.agentToken !== undefined)
        fetchDataShips(store.agentToken)
});
watch(
    () => store.agentToken,
    (value) => fetchDataShips(value)
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