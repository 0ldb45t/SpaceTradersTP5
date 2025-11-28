<template>
    <div class="bg-info">
        <h1>Créer votre agent:</h1>
        <label>Quel est le nom de votre agent? </label>
        <input v-model="symbol" />
        <p>{{ symbol }}</p>
        <button @click="postAgentRequest">Créer votre agent.</button>
    </div>
</template>
<script setup>
import { fetchUrl } from '@/stores/fetchUrl';
import { TOKEN, MAIL } from '@/stores/env';
import { ref } from 'vue';
const symbol = ref("");

const postAgentRequest = () => (
    fetch(`${fetchUrl}register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: 'Bearer ' + TOKEN },
            body: `{"faction":"COSMIC", "symbol":"${symbol.value}", "email":"${MAIL}"}`
        }
    )
        .then(response => {
            if(response.ok)
                return response.json()
        })
        .then(jsonItem => {
            localStorage.setItem("agent", JSON.stringify(jsonItem.data.agent))
            console.log(jsonItem)
        })
);
</script>
<style scoped>
.truc {
    background-color: rgb(168, 95, 0);
    display: flex;

}
</style>