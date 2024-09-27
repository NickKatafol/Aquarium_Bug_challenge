import { ref, computed, toValue, type Ref, type MaybeRefOrGetter } from 'vue';


export function useLocalStorage(key: MaybeRefOrGetter<string>): Ref<string> {
  const kk = toValue(key)

  return computed<string>({
    get() {
      return localStorage.getItem(kk) || ''
    },
    set(val) {
      let vv = toValue(val)
      localStorage.setItem(kk, vv)
    }
  })
}



