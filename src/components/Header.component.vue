<template>
  <div class="entete mt-5 d-flex flex-row align-items-center">
    <h1 class="p-1 d-inline">TRADERS IN SPACE</h1>
    <div>
      <p>Test: {{ agent?.symbol }}</p>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import useSpatialStore from '@/store';
const store = useSpatialStore();
let agent = store.agent;
console.log(agent);
watch(
  () => agent.symbol,
  () => {
    agent = store.getAgent();
  },
  { deep: true }
);
</script>
<style scoped>
h1 {
  font-size: 90;
  margin: 0;
}

.entete {
  background-color: rgba(0, 255, 0, 0.897);
  color: black;
}
</style>
