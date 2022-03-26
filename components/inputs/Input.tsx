import React from 'react'
import styles from './styles.module.css'

interface InputProps {
  onChange: (str: string) => void
  label: string
  name: string
  value?: string
}

function Input({ onChange, name, label, value = '' }: InputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        onChange={(event) => onChange(event.target.value)}
        id={name}
        value={value}
        className={styles.input}
      />
    </div>
  )
}

export default Input
