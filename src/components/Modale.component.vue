<template>
    <div class="modalBackground" @click.self="$emit('onClose')">
        <slot></slot>
    </div>
</template>
<script setup></script>
<style scoped>
    .modalBackground{
        position: absolute;
        z-index: 1000;
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0, 0.5);
    }
</style>