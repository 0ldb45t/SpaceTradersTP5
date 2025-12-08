<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
        <router-link :to="{ name: 'Contrats' }">
            <button class="buttonDetails">Afficher les contrats</button>
        </router-link>
        <table class="w-50 d-flex flex-column justify-content-between text-center mt-3">
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>Votre position</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="position rond"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>ORBITAL_STATION</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-warning rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>FUEL_STATION</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-warning-subtle rond petit"></div>
                </td>

            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>ASTEROID_BASE</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-dark-subtle rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>ENGINEERED_ASTEROID</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-success-subtle rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>GAS_GIANT</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-danger rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>MOON</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-info-subtle rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>PLANET</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-primary rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>JUMP_GATE</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-success rond petit"></div>
                </td>
            </tr>
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>ASTEROID</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="bg-dark rond petit"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup></script>
<style scoped>
.buttonDetails {
    border: 2px solid #3cff00;
    background-color: green;
    color: #3cff00;
    font-size: larger;
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
    height: 5px;
    align-self: center;
    vertical-align: middle;
    margin-right: 6px
}
</style>