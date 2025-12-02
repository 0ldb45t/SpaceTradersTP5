<template>
    <div class="main">
        <div class="container h-100 mb-5">
            <HeaderComponent />
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';
import HeaderComponent from './components/Header.component.vue';

</script>
<style>
body,
html {
    height: 100%;
    background-color: black;
        color: rgba(0, 255, 0, 0.897);
    
        font-family: "Agdasima", sans-serif;
        font-weight: 400;
        font-size: large;
        font-style: normal;

}
</style>
