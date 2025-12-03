<template>
    <div class="w-100 d-flex flex-row justify-content-between mt-3">


        <CreateAgent v-if="localAgent === undefined" :feedback="feedBack" />
        <p v-if='feedBack !== ""'>{{ feedBack }}</p>
        <ShowCurrentLocationPageComponent v-else />
        <div>
            <p v-if="statusData.serverResets !== undefined">
                Cet agent a jusqu'au{{ new Date(statusData.serverResets.next) }} pour faire top1
            </p>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import useSpatialStore from '@/store';
import CreateAgent from './CreateAgent.component.vue';
import { Agent } from '@/models/agent';
import ShowCurrentLocationPageComponent from './ShowCurrentLocationPage.component.vue';

const store = useSpatialStore();


const fetchUrl = store.fetchUrl;
const TOKEN = store.TOKEN;
const SPIKE_TOKEN = store.SPIKE_TOKEN;
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
        return;
    }
    getCurrentAccount();
    fetchDataAgent()

});
const getCurrentAccount = async () => {
    fetch(fetchUrl, optionsMain)
        .then(response => response.json())
        .then(json => statusData.value = json);
};

</script>
<style scoped></style>
