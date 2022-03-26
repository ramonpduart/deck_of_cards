import React from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

interface ICard {
  key: number
  code: string
  value: string
  image: string
}

export default function Card({ key, code, value, image }: ICard) {
  return (
    <div key={key} className={styles.card}>
      <h3 className={styles.title}>{code}</h3>
      <Image src={image} alt={code} width={150} height={150} />
      <span className={styles.value}>Valor: {value}</span>
    </div>
  )
}
