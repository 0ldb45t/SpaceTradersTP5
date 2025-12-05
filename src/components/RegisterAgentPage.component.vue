<template>
    <div class="w-100 d-flex flex-column justify-content-between mt-3 gap-2">
        <CreateAgent v-if="localAgent.symbol === undefined" :feedback="feedBack" />
        <p v-if='feedBack[0] !== ""'>{{ feedBack[0] }}</p>
        <ShowCurrentLocationPageComponent v-if="localAgent.symbol !== undefined" />
        <div v-if="statusData.serverResets !== undefined" class="text-center">
            <p>
                Cet agent a jusqu'au {{ new Date(statusData.serverResets.next) }} pour faire top1
            </p>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useSpatialStore } from '@/store';
import CreateAgent from './CreateAgent.component.vue';
import { Agent } from '@/models/agent';
import ShowCurrentLocationPageComponent from './ShowCurrentLocationPage.component.vue';

const store = useSpatialStore();


const fetchUrl = store.fetchUrl;
const TOKEN = store.TOKEN;

const feedBack = store.subscriptionFeedBack;
const localAgent = ref({});
const statusData = ref({});
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + store.agentToken }
};
const optionsMain = {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + TOKEN }
};
const fetchDataAgent = async () => {
    fetch(fetchUrl + "my/agent", options)
        .then(response => {
            if (response.ok)
                return response.json();
        })
        .then(json => {
            localStorage.setItem("agent", JSON.stringify(json.data))
            localAgent.value = new Agent(json.data)
            store.setAgent(localAgent.value);
        })
}

onBeforeMount(() => {
    if (localStorage.getItem("agent") !== null) {
        localAgent.value = JSON.parse(localStorage.getItem("agent"));
        store.setAgent(localAgent.value);
    }
    else if (store.agentToken !== null) {
        fetchDataAgent()
    }
    getCurrentAccount();
});
const getCurrentAccount = async () => {
    fetch(fetchUrl, optionsMain)
        .then(response => response.json())
        .then(json => statusData.value = json);
};
watch(
    () => store.agentToken,
    () => localAgent.value = store.agent
);
</script>
<style scoped></style>
