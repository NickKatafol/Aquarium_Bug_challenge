<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCounterDown } from '../composables/useCounterDown'

const { hours, min, sec } = useCounterDown(20)

</script>

<template>
  <div class="counter-wrapper" :class="[sec.includes('-') ? 'out-time' : 'in-time']">
    <div>{{ hours }}</div>
    <div>{{ min }}</div>
    <div>{{ sec }}</div>
  </div>
</template>

<style scope>
.counter-wrapper {
  width: fit-content;
  display: flex;
  justify-content: center;
  padding: 4px;
}

.counter-wrapper div {
  margin: 0 6px;
}

.in-time {
  border: greenyellow 3px solid;
}

.out-time {
  border: red 3px solid;
  background: yellow;
}
</style>
