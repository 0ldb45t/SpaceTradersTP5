<template>
  <div class="entete mt-5 d-flex flex-row align-items-center">
    <h1 class="p-1 d-inline">TRADERS IN SPACE</h1>
    <div>
      <p>Test: {{ agent.symbol }}</p>
    </div>
  </div>
</template>

<script setup>
  import useSpatialStore from '@/store';
  const store = useSpatialStore();
  const agent = store.agent;
  console.log(agent);
</script>
<style scoped>
h1 {
  font-size: 90;
  margin:0;
}

.entete {
  background-color: rgba(0, 255, 0, 0.897);
  color: black;
}
</style>
