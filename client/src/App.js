import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code')

const theme = {
  dark: {
    backgroundColor: '#191414',
    albumBackgroundColor: '#181818',
    buttonBackgroundColor: '#1DB954',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#ffffff',
    textColor: '#b3b3b3',
  },
  light: {
    backgroundColor: '#ffffff',
    albumBackgroundColor: '#f4f4f4',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#191414',
    textColor: '#1c1c18',
  }
}

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark')
  return (
    <ThemeProvider theme={theme[currentTheme]}>
      {code ? <Dashboard code={code} currentTheme={currentTheme}/> : <Login currentTheme={currentTheme}/>}
    </ThemeProvider> 
  )
}

export default App;
