<template>
    <div class="h-100 mb-5">
        <HeaderComponent />
       <div class="w-100 d-flex flex-column justify-content-between mt-3 gap-2"
            v-if="systemStore.readyToFetchSystemData">
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import HeaderComponent from './components/Header.component.vue';
import { Agent } from './models/agent';
import { useAdminAgentStore } from './store'
import { useSystemStore } from './store/systemStore';
const store = useAdminAgentStore();
const systemStore = useSystemStore();
const fetchUrl = store.FETCH_URL;
const options = {
    method: "GET",
    headers: { Authorization: "Bearer " + store.agentToken },
};
store.setLocalStorageToken(JSON.parse(localStorage.getItem("newAgentToken")));
const fetchDataAgent = async () => {
    fetch(fetchUrl + "my/agent", {
        method: "GET",
        headers: { Authorization: "Bearer " + store.agentToken.value },
    })
        .then(response => {
            if (response.ok)
                return response.json();
        })
        .then(json => {
            localStorage.setItem("agent", JSON.stringify(json.data))
            store.agent = new Agent(json.data);
            store.setAgent(store.agent);

            systemStore.readyToFetchSystemData = true;
        })
}
onBeforeMount(() => {
    fetchDataAgent()
});
</script>
<style>
body,
html {
    height: 100%;
    background-color: black;
    color: rgba(0, 255, 0, 0.897);
    font-weight: 400;
    font-style: normal;
        font-family: "Agdasima", sans-serif;
    font-size: large;
}
.borderGreen {
    border: 2px solid green;
}
.borderGreen:hover {
    border: 2px solid rgb(0, 197, 0);
    background-color: #0f3f00;
}
.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
}
.buttonDetails:hover {
    border: 2px solid #3cff00;
    background-color: rgb(0, 233, 0);
    color: #0f3f00;
}
</style>
