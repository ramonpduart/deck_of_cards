import React, { useState } from 'react'
import Game from './game/index'
import Start from './start'

const MainApp: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [mode, setMode] = useState<string>('0')

  if (mode === '0') {
    return (
      <Start
        name={name}
        setName={(e) => setName(e)}
        setMode={(e) => setMode(e)}
      />
    )
  } else {
    return <Game label={name} />
  }
}

export default MainApp
