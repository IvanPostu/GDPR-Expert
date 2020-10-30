// src/react.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
const remote = require('electron').remote

const Index = () => {
  const onClickHandler = React.useCallback(() => {
    console.log(remote)
    const nativeWindow = remote.getCurrentWindow()
    if (!nativeWindow.isMaximized()) {
      nativeWindow.maximize()
    } else {
      nativeWindow.unmaximize()
    }
    console.log(2)

  }, [])

    return <div>Hello React! <button onClick={onClickHandler}>Test</button></div>;
};

ReactDOM.render(<Index />, document.getElementById('app'));