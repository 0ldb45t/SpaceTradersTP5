<template>
        <div class="modale d-flex flex-column align-items-center">
            <div class="modalHeader w-100 justify-content-between no=wrap d-flex flex-row ms-4 me-4 p-3">
                <h1>Soute de {{ ship.symbol }}</h1>
                <h1 @click="$emit('onClose')" style="cursor:pointer">X</h1>
            </div>
            <h3>Cargo: {{ ship.cargo.units }} / {{ ship.cargo.capacity }}</h3>
            <ul>
                <li v-for="item in ship.cargo.inventory" v-if="ship.cargo.inventory.length > 0">{{ item.symbol }} : {{ item.units }} unités</li>
                <li v-else>La soute est vide pour le moment!</li>
            </ul>
        </div>
</template>
<script setup>
const props = defineProps({ ship: { type: Object, required: true } });
const ship = props.ship;
</script>
<style scoped>
.modale {
    z-index: 1000;
    color: wheat;
    background-color: rgba(0, 255, 0, 0.897);
    color: black;
    position: fixed;
    top:400px;
    bottom:400px;
    left:50px;
    right:50px;
    margin:auto;
    width: 50%;
    overflow: scroll;
}
</style>