export function getUrlParameter(source: string, key: string): string {
  const urls = source.substr(1)
  const arrUrls = urls.split('&')

  for (let i = 0; i < arrUrls.length; i++) {
    const [k, v] = arrUrls[i].split('=')
    if (k === key) return v
  }

  return ''
}
