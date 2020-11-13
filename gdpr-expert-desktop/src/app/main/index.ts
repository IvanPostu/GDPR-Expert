import { createElement } from 'react'
import { render } from 'react-dom'

import App from '@/app/App'

import 'normalize.css'
import './index.scss'

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept()
}

render(createElement(App, {}, null), document.getElementById('root'))
