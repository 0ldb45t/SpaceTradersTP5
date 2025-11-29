<template>
    <div class="truc w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="rounded-5">
            Sélectionner un item de navigation dans le menu Direction : )
        </h1>
        <button @click="fetchDataAgent">Get agent Spike</button>
        <button @click="fetchDataShips">Get systems data</button>
        <CreateAgent v-if="localAgent === undefined" />
        <AgentComponent :agent="localAgent" v-else />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { SPIKE_TOKEN, TOKEN } from '../stores/env';
import { fetchUrl } from "../stores/fetchUrl";
import { Agent } from '@/stores/agent';
import CreateAgent from './CreateAgent.component.vue';
import AgentComponent from './Agent.component.vue';


const checkAgent = () => {
    return localStorage.getItem("agent") === null;
}

let localAgent = checkAgent()
    ? undefined
    : new Agent(JSON.parse(localStorage.getItem("agent")));

const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};
const fetchDataAgent = async () => {
    fetch(fetchUrl + "my/agent", options)
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("agent", JSON.stringify(json.data))
            localAgent = json.data.agent;
        })
}
const fetchDataShips = async () => {
    fetch(fetchUrl + "my/ships", options)
        .then(response => response.json())
        .then(json => console.log(json));
}
</script>
<style scoped>
.truc {
    height: 100vh;
    background-image: url("/home.jpg");
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