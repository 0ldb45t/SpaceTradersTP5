<template>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
       <h3 style="text-decoration: underline;">Légende de la carte:</h3>
        <table class="w-50 d-flex flex-column justify-content-between text-center mt-3">
            <tr class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p class="text-light">Position de {{ store.ships[0].symbol }}</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div class="position"></div>
                </td>
            </tr>
            <tr v-for="astre in store.mapDataMap" class="d-flex w-100 flex-row justify-content-between">
                <td>
                    <p>{{ astre[0] }}</p>
                </td>
                <td class="d-flex align-content-center justify-content-center align-items-center">
                    <div :class="astre[1]" class="rond petit"></div>
                </td>
            </tr>

        </table>
    </div>
</template>
<script setup>
import { useSystemStore } from '@/store/systemStore';
const store = useSystemStore();
</script>
<style scoped>


.position {
    background-color: rgba(0, 255, 0, 0.7);
    width: 15px;
    height: 15px
}

.rond {
    border-radius: 50%;
    margin-bottom: 7px
}

.petit {
    width: 5px;
    height: 5px;
    align-self: center;
    vertical-align: middle;
    margin-right: 6px;
}
</style>