<template>
    <div class="h-100 mb-5">
        <HeaderComponent />
        <RouterView />
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/Header.component.vue';
import { useAdminAgentStore } from './store'
const store = useAdminAgentStore();
store.setLocalStorageToken(JSON.parse(localStorage.getItem("newAgentToken")));
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
.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
}
</style>
