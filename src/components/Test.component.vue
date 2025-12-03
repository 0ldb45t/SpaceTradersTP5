<template><Map v-if="show":astres="astres"/></template>
<script setup>
import { onMounted, ref } from 'vue';
import Map from './Map.component.vue';
import { fetchUrl } from '@/test/fetchUrl';
import { SPIKE_TOKEN } from '@/test/env';
const optionsMain = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};
const astres = ref();
const show = ref(false);
onMounted(() =>{
    fetch(fetchUrl + "systems", optionsMain)
    .then(reponse => reponse.json())
    .then(json => console.log(json))
    fetch(fetchUrl + "systems/X1-YN57", optionsMain)
    .then(response => response.json())
    .then(json => {astres.value = json.data.waypoints;
        show.value = true;
    })
});
</script>