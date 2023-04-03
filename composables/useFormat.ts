import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
//这句就是将语言转换成中文
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const useNumFormat = (num: number) => {
  if (num >= 10000) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + '亿'
    return (num / 10000).toFixed(1) + '万'
  }
  return num + ''
}

export const useTimeFormat = (date: string) => {
  return dayjs().to(dayjs(date))
}
export const useDateFormat = (date: string) => {
  return dayjs(date).format('YYYY年MM月DD日')
}
