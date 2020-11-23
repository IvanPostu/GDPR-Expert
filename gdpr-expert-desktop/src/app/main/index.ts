/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createElement } from 'react'
import { render } from 'react-dom'

import App from '@/app/App'

import 'normalize.css'
import './index.scss'
// import { downloadStatusConsumer } from '../store/Downloads/downloadStatus'

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept()
}

render(createElement(App, {}, null), document.getElementById('root'))
