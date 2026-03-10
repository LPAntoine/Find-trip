import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IconText from './components/IconText'

function App() {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(false)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Find-trip</h1>
      <IconText
        icon="🧭"
        text="Découvrir ma prochaine destination"
        selected={selected}
        onClick={() => setSelected((prev) => !prev)}
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App