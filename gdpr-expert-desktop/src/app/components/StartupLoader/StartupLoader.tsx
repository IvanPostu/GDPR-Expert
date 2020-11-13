import React, { Component, PropsWithChildren, ReactElement } from 'react'
import StartupLoaderView from './StartupLoaderView'
import { ipcRenderer, remote } from 'electron'
import { startupTime, delay } from '@/app/constants/startup'

type StartupLoaderPropType = PropsWithChildren<unknown> & {
  onComplete: () => void
}

type StartupLoaderStateType = {
  progress: number
}

const DELAY = delay * 1000
const STARTUP_TIME = startupTime * 1000
const PERCENT = 100 / STARTUP_TIME

export class StartupLoader extends Component<StartupLoaderPropType, StartupLoaderStateType> {
  private _interval: ReturnType<typeof setInterval> | null

  constructor(props: StartupLoaderPropType) {
    super(props)
    this._interval = null

    this.state = {
      progress: 0,
    }
  }

  componentDidMount(): void {
    this._interval = setInterval(() => {
      this.setState((prevState) => {
        const newProgress = prevState.progress + DELAY
        if (newProgress > STARTUP_TIME) {
          clearInterval(this._interval as ReturnType<typeof setInterval>)
          this.props.onComplete()
        } else {
          return { progress: newProgress }
        }
      })
    }, DELAY)
  }

  componentWillUnmount(): void {
    const nativeWindow = remote.getCurrentWindow()
    ipcRenderer.send('to-default-size')
    nativeWindow.maximize()
  }

  render(): ReactElement {
    return <StartupLoaderView progressPercentage={this.state.progress * PERCENT} />
  }
}
