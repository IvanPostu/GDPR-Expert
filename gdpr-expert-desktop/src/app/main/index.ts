import { createElement } from 'react'
import { render } from 'react-dom'

import App from '@/app/App'

import 'normalize.css'
import './index.scss'
import { ipcRenderer } from 'electron'
import { DownloadOptionType } from '@/electron/downloadApi/DownloadOption'

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept()
}

render(createElement(App, {}, null), document.getElementById('root'))

// const GB = 'http://tegos.kz/android/exclusiv/com.ea.game.fifa15_row.zip'
// const sixtyMb = `http://tegos.kz/android/exclusiv/2_hotel_transylvania_2_the_game.zip`
// const downloadFileOptions: DownloadOptionType = {
//   url: sixtyMb,
// }
// ipcRenderer.on('download-file-status', (event, arg) => {
//   console.log(arg)
// })

// ipcRenderer.send('download-file', downloadFileOptions)
