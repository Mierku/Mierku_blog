export const useMin = (array) => {
  let min = array[0] // 假定最小值是第一个数
  const index = ref(0)
  for (let j = 0; j < array.length; j++) {
    if (array[j] == undefined) {
      continue
    }
    if (array[j] < min) {
      //  判断的条件
      min = array[j] // 将较小值给min
      index.value = j // 将较小值的下标给index
    }
  }
  return { min, index }
}
