import { toValue } from "vue";

export function useRandomNumber(min:number, max: number): number {
  const minV = toValue(min)
  const maxV = toValue(max)

  return Math.floor(Math.random()*(maxV-minV) + minV)
}