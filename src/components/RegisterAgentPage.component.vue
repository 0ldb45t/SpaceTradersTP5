<template>
    <div class="truc w-100 d-flex flex-column justify-content-center align-items-center container">


        <CreateAgent v-if="localAgent === undefined" :feedback="feedBack" />
        <p v-if='feedBack !== ""'>{{ feedBack }}</p>
        <AgentComponent v-else />
        <div>
            <p>Cet agent a jusqu'au {{ statusData.resetDate }} pour faire top1</p>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { SPIKE_TOKEN, TOKEN } from '../stores/env';
import { fetchUrl } from "../stores/fetchUrl";
import { Agent, agent } from '@/stores/agent';
import CreateAgent from './CreateAgent.component.vue';
import AgentComponent from './Agent.component.vue';

const feedBack = ref("");
const localAgent = ref({});
const statusData = ref({});
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + SPIKE_TOKEN }
};
const optionsMain = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + TOKEN }
};
const fetchDataAgent = async () => {
    fetch(fetchUrl + "my/agent", options)
        .then(response => response.json())
        .then(json => {
            localStorage.setItem("agent", JSON.stringify(json.data))
            agent.value = new Agent(json.data);
            localAgent.value = new Agent(json.data)
        })
}
const fetchDataShips = async () => {
    fetch(fetchUrl + "my/ships", options)
        .then(response => response.json())
        .then(json => console.log(json));
}
onBeforeMount(() => { getCurrentAccount(); fetchDataAgent() })//fetchDataAgent())
const getCurrentAccount = async () => {
    fetch(fetchUrl, optionsMain)
        .then(response => response.json())
        .then(json => statusData.value = json);
}
/*
<button @click="fetchDataAgent">Get agent Spike</button>
<button @click="fetchDataShips">Get systems data</button>
*/
</script>
<style scoped></style>
