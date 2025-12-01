
<template>
    <div class="h-100">
        <div class="container h-100">
            <HeaderComponent />
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/Header.component.vue';

</script>
<style>
body,
html {
    height: 100%;
    background-image: url("/home.jpg");
    background-position: center;
    background-size: cover;
}
</style>
