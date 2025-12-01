<template>
    <div class="card">
        <h1>Position de : {{ nomAgent }}</h1>
        <p>Symbole du systeme: {{ ships[0]?.nav.systemSymbol }}</p>
        <p>Symbole du WayPoint: {{ ships[0]?.nav.systemSymbol }}</p>
        <p>Position du WayPoint: { x: {{ shipPosition.x }}, y: {{ shipPosition.y }} }</p>
        <MapComponent v-if="readytoMap" :astres="systemData" :position="shipPosition" />
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { SPIKE_TOKEN, TOKEN } from '../stores/env';
import { fetchUrl } from '@/stores/fetchUrl';
import MapComponent from './Map.component.vue';
const ships = ref({});
const shipPosition = ref({});
const systemData = ref({});
let readytoMap = ref(false);
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};

const route = useRoute();
const nomAgent = route.params.nomAgent;

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
            console.log(systemData);
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
onBeforeMount(async () => {
    fetchDataShips()
});


</script>