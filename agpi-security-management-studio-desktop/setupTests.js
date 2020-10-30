/* eslint-disable @typescript-eslint/no-var-requires */

const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({ adapter: new Adapter() })

global.shallow = Enzyme.shallow
global.mount = Enzyme.mount
global.render = Enzyme.render

global.fetch = jest.fn()

// eslint-disable-next-line no-console
console.error = (message) => {
  throw new Error(message)
}
