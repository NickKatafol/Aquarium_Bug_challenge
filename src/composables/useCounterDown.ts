import { ref, computed, toValue, type Ref, type MaybeRefOrGetter, watch, watchEffect, onUnmounted } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'


export function useCounterDown(minutesBeforeDeadLine: MaybeRefOrGetter<number>): { hours: Ref<string>, min: Ref<string>, sec: Ref<string> } {
  let deadLineMS: number = new Date(new Date().getTime() + toValue(minutesBeforeDeadLine) * 60 * 1000).getTime()
  // const deadLine = new Date(`01/01/${new Date().getFullYear() + 1} 00:00:00`)

  let LS: Ref<string> = useLocalStorage('deadLine')

  if (LS.value)
    deadLineMS = Number(LS.value)
  else
    LS.value = String(deadLineMS)

  const nowMS = ref<number>(new Date().getTime())

  const interval = setInterval(() => {
    nowMS.value = new Date().getTime()
  }, 1000);
  onUnmounted(() => clearInterval(interval));

  let restMs = computed(() => Number(LS.value) - nowMS.value)

  const hours = computed(() => {
    let dd = String(Math.floor(Math.abs(restMs.value) / 1000 / 60 / 60)).padStart(2, '0')
    return restMs.value > 0 ? dd : '-' + dd
  })
  const min = computed(() => {
    let dd = String(Math.floor((Math.abs(restMs.value) / 1000 / 60 / 60 - Math.abs(+hours.value)) * 60)).padStart(2, '0')
    return restMs.value > 0 ? dd : '-' + dd
  })
  const sec = computed(() => {    
    let dd = String(Math.floor(((Math.abs(restMs.value) / 1000 / 60 / 60 - Math.abs(+hours.value)) * 60 - Math.abs(+min.value)) * 60)).padStart(2, '0')
    return restMs.value > 0 ? dd : '-' + dd
  })

  return { hours, min, sec }
}



