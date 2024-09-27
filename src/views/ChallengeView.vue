<script setup lang="ts">
import { ref, computed, shallowRef, ComponentPublicInstance, onMounted, nextTick } from 'vue';
import Fish from '../components/Fish.vue'
import markdown from 'markdown-it'
import {projectDescription, bugsDescription} from '../assets/texts/texts.ts'

const md = markdown({html: false})
const projectDescription_ = md.render(projectDescription)
const bugsDescription_ = md.render(bugsDescription)

const fishCloud: string[] = ['ghostFish', 'goldFish', 'guppie', 'purpleFish', 'tropicalFish', 'tuna']
const fishFlock = ref<IFishSet[]>([])

function onAddFish() {
  fishFlock.value.push(new FishSet(fishCloud))
}

async function onDeleteFish(ev: Event) {
  if (ev?.target?.dataset.fishInd) {
    fishFlock.value = fishFlock.value.filter(item => String(item.id) !== ev?.target?.dataset?.fishInd)
  }
}

</script>
<script lang="ts">
export interface IFishSet {
  fishName: string
  id: number
}

export class FishSet implements IFishSet {
  fishName
  id = FishSet.useRandomNumber(0, 100000)

  constructor(fishCloud: string[]) {
    this.fishName = fishCloud[FishSet.useRandomNumber(0, fishCloud.length)]
  }

  static useRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }
}
</script>

<template>
  <main class="challenge-wrapper">
    <nav>
      <h3>Aquarium</h3>
    </nav>

    <div class="aquarium" @click="onDeleteFish">
      <Fish v-for="fishSet of fishFlock" 
            :key="fishSet.id" :fishSet
            :data-fish-ind="fishSet.id" 
      />
    </div>

    <div class="fish-panel">
      <div>
        <div class="fish-panel_list-title">Fish Flock:</div>
        <ul>
          <li v-for="(fishSet, ind) of fishFlock" :key="'fishFlock' + ind">
            {{ fishSet.fishName }}
          </li>
        </ul>
      </div>
      <div>
        <button @click="onAddFish">Add the random fish</button>
      </div>
    </div>
  </main>

  <section>
    <h4>The Project description</h4>
    <div v-html="projectDescription_"></div>
  </section>

  <section>
    <h4>The bugs description</h4>
    <div v-html="bugsDescription_"></div>
  </section>

  <section>
    <h4>The target behavior</h4>
    <video controls src="../assets/video/AquariumVideo.webm"></video>
  </section>
</template>

<style scoped>
.challenge-wrapper {
  width: 100%;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.aquarium {
  position: relative;
  padding-bottom: 63%;
  background: url("/img/bg.jpg") no-repeat center center;
  opacity: 0.7;
  background-size: contain;
}

.aquarium > :hover {
  cursor: pointer;
}

.fish-panel {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.fish-panel_list-title {
  color: hsla(160, 100%, 37%, 1);
  text-decoration: underline;
}

section {
  margin-top: 20px;
  border-top: gray 1px solid;
}

video {
  width: 100%;
}
</style>
