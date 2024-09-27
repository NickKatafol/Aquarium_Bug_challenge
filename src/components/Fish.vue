<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useRandomNumber } from '../composables/useRandomNumber'
import type {IFishSet} from '../views/ChallengeView.vue'

const pr = defineProps<{fishSet: IFishSet}>()
const {fishSet} = toRefs(pr)

const leftStart = ref('2%')
const leftEnd = ref(`${useRandomNumber(2, 85)}%`)
const topStart = ref('2%')
const topEnd = ref(`${useRandomNumber(2, 85)}%`)

function onAfterEnter() {
}

async function onAfterLeave() {
  leftStart.value = leftEnd.value
  leftEnd.value = (`${useRandomNumber(2, 85)}%`)
  topStart.value = topEnd.value
  topEnd.value = (`${useRandomNumber(2, 85)}%`)
}

const transitionCSS = computed( () => `
<style type="text/css">
.${fishSet.value.fishName + fishSet.value.id}-enter-active  {
  transition: all 5s linear ;
}
.${fishSet.value.fishName + fishSet.value.id}-leave-active {
  transition: all 1ms linear;
}
.${fishSet.value.fishName + fishSet.value.id}-enter-from {
  left: ${leftStart.value} ;
  top: ${topStart.value} ;
}
</style>
`)


</script>

<template>
    <Transition @after-enter="onAfterEnter" 
                @after-leave="onAfterLeave" 
                :name="fishSet.fishName + fishSet.id"
    >
      <div class="fish">
        <img class="fish__img" 
             :src="`/img/${fishSet.fishName}.png`"
        >
        <div v-html="transitionCSS"></div>
      </div>
    </Transition>
</template>

<style scoped>
.fish {
  position: absolute;
  top: v-bind(topEnd);
  left: v-bind(leftEnd);
  width: 50px;
  height: 30px;
  overflow: hidden;
}

.fish__img {
  width: 50px;
  height: 30px;
  background-size: cover;
}

</style>
