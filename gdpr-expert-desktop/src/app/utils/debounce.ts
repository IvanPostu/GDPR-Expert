// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<Params extends any[]>(
  func: (...args: Params) => void,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
