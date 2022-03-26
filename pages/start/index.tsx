import React from 'react'
import Button from '../../components/button'
import Input from '../../components/inputs/Input'
import styles from './styles.module.css'

interface IStart {
  name: string
  setName: (e: string) => void
  setMode: (e: string) => void
}

export default function Start({ name, setName, setMode }: IStart) {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Deck Of Cards</h1>
      </div>
      <div className={styles.row}>
        <Input
          name="name"
          label="Informe seu nome:"
          value={name}
          onChange={(e: string) => setName(e)}
        />
      </div>
      <div className={styles.row}>
        <Button
          label="Ver Cartas"
          onClick={() => setMode('1')}
          disabled={false}
        />
      </div>
    </div>
  )
}
