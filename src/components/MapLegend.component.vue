<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
        <div class="w-75 d-flex flex-column justify-content-between">
            <div class="d-flex w-100 flex-row justify-content-between">
                <div class="position rond"></div>
                <p>Votre position</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-warning rond petit"></div>
                <p>FUEL_STATION</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-warning-subtle rond petit"></div>
                <p>ORBITAL_STATION</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-dark-subtle rond petit"></div>
                <p>ASTEROID_BASE</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-success-subtle rond petit"></div>
                <p>ENGINEERED_ASTEROID</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-danger rond petit"></div>
                <p>GAS_GIANT</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-info-subtle rond petit"></div>
                <p>MOON</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-primary rond petit"></div>
                <p>PLANET</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-success rond petit"></div>
                <p>JUMP_GATE</p>
            </div>
            <div class="d-flex w-100 flex-row justify-content-around">
                <div class="bg-dark rond petit"></div>
                <p>ASTEROID</p>
            </div>
        </div>
        <router-link :to="{ name: 'Contrats' }">
            <button class="buttonDetails">Afficher les contrats</button>
        </router-link>
    </div>
</template>
<script setup></script>
<style scoped>
.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
}

.position {
    background-color: rgba(0, 255, 0, 0.7);
    width: 15px;
    height: 15px
}

.rond {
    border-radius: 50%;
}

.petit {
    width: 5px;
    height: 5px
}
</style>