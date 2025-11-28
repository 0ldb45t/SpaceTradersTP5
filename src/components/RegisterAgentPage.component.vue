<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="position-fixed rounded-5">
            Sélectionner un item de navigation dans le menu Direction : )
        </h1>
        <button @click="fetchData">Get datas</button>
        <hr/><br/><br/>
        <CreateAgent v-if="localAgent == undefined"/>
        <AgentComponent :agent="localAgent" v-else/>
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { TOKEN } from '../stores/env';
import { fetchUrl } from "../stores/fetchUrl";
import { Agent } from '@/stores/agent';
import CreateAgent from './CreateAgent.component.vue';
import AgentComponent from './Agent.component.vue';
//localStorage.setItem("agent", JSON.stringify(new Agent()));
let localAgent = JSON.parse(localStorage.getItem("agent")) ;
console.log(localAgent);

const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + TOKEN }
};
const fetchData = async () => {
    fetch(fetchUrl, options)
        .then(response => response.json())
        .then(json => console.log(json))
}
</script>
<style scoped>
div {
    height: 100vh;
    /*background-image: url("/home.jpg");
    /*source : https://www.flickr.com/photos/nasawebbtelescope/52259221868/in/album-72177720300469752*/
    background-position: center;
    background-size: cover;
    margin-top: -5%;
}

h1 {
    color: rgba(150, 255, 241, 0.7);
    padding: 20px;
    background-color: rgba(12, 87, 87, 0.2);
    border: 5px solid rgba(0, 37, 37, 0.7);
    text-shadow: #551d57 1px 0 10px;
}
</style>