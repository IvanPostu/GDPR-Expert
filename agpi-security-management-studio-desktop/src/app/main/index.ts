import { createElement } from 'react'
import { render } from 'react-dom'

import App from '@/app/App'

import 'normalize.css'
import './index.scss'

render(createElement(App, {}, null), document.getElementById('root'))
