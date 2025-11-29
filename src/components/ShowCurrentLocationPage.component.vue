<template>
    <h1>Position du vaisseau de :{{ nomAgent }}</h1>
    <p>Symbole du systeme: {{ ships[0]?.nav.systemSymbol }}</p>
    <p>Symbole du WayPoint: {{  ships[0]?.nav.systemSymbol }}</p>
    <p>Position du WayPoint: { x: {{systemData.x}}, y: {{systemData.y}} }</p>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { SPIKE_TOKEN, TOKEN } from '../stores/env';
import { fetchUrl } from '@/stores/fetchUrl';
const ships = ref({});
const systemData = ref({});
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};
const route = useRoute();
const nomAgent = route.params.nomAgent;
const fetchDataShips = () => {
    fetch(fetchUrl + "my/ships", options)
        .then(response => {
            if (response.ok)
                return response.json()

        })
        .then(json => {
            console.log(ships);
            ships.value = json.data;
        })

    .then(()=>fetchDataCurrentSystem())
}
const fetchDataCurrentSystem = () => {
    fetch(fetchUrl + `systems/${ships.value[0].nav.systemSymbol}/waypoints/${ships.value[0].nav.waypointSymbol}`, options)
        .then(response => {
            if (response.ok)
                return response.json()

        })
        .then(json => {
            systemData.value = json.data;
            console.log(systemData);
        })
}
onBeforeMount(() => {
    fetchDataShips()
}
);
//onCreated(() => fetchDataCurrentSystem())


</script>