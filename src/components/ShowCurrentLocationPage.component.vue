<template>
    <div class="d-flex flex-row pt-5 justify-content-between mb-2 w-100">
        <div class="p-5 text-center align-self-end borderGreen">
            <h1>Position de : {{ agent.symbol }}</h1>
            <p>Symbole du systeme: {{ ships[0]?.nav.systemSymbol }}</p>
            <p>Symbole du WayPoint: {{ ships[0]?.nav.systemSymbol }}</p>
            <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>
            <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>
            <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>

        </div>
        <div class="data p-5 w-25 text-center flex-column align-self-end borderGreen" v-if="cell.length > 0">
            <strong>
                <p>
                    'Vous visez : '
                </p>
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
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import useSpatialStore from '@/store';
import MapComponent from './Map.component.vue';

const store = useSpatialStore();
const agent = store.agent;
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

const route = useRoute();
const nomAgent = route.params.nomAgent;
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
            console.log(systemFacts);
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
onBeforeMount(async () => {
    fetchDataShips()
});
</script>
<style scoped>
.vousEtesIci {
    color: red;
}

.borderGreen {
    border: 2px solid green;
}
</style>