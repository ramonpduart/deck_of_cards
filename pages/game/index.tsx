import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../components/button'
import Card from '../../components/card'
import styles from './styles.module.css'
import CircularProgress from '../../components/loader'

interface ICard {
  code: 'string'
  image: 'string'
  images: Array<'string'>
  suit: 'string'
  value: 'string'
}

interface IGame {
  label?: string
}

export default function Game({ label = '' }: IGame) {
  const INITIAL_DECK = 'new'
  const INITIAL_CARDS = 5
  const MAX_CARDS = 8
  const API = 'http://deckofcardsapi.com/api/deck'
  const [deckId, setDeckId] = useState<string>(INITIAL_DECK)
  const [cards, setCards] = useState<Array<ICard>>([])
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    getCards(INITIAL_CARDS)
  }, [])

  function getCards(numberCards: number) {
    axios
      .get(`${API}/${deckId}/draw/?count=${numberCards}`)
      .then(({ data }) => {
        if (deckId === INITIAL_DECK) {
          setDeckId(data.deck_id)
        }

        setCards([...cards, ...data.cards])
      })
      .catch(() => {
        console.log('Ocorreu um erro ao acessar a api.')
      })
      .finally(() => setLoader(false))
  }

  function newCard() {
    if (cards.length < MAX_CARDS) {
      setLoader(true)
      getCards(1)
    }
  }

  function shuffleCards() {
    setLoader(true)
    const cardsIds: string = cards
      // Percore as cartas retornando apenas o codigo, transformando em um array simples
      .map((row: ICard) => row.code)
      // Transforma o array em uma string separada por virgula
      .join(',')

    // Gera um novo baralho apenas com as cartas viradas
    axios
      .get(`${API}/new/shuffle/?cards=${cardsIds}`)
      .then(({ data }) => {
        // Reordena as cartas
        sortCards(data.deck_id)
      })
      .catch(() => {
        console.log('Ocorreu um erro ao acessar a api.')
      })
  }

  function sortCards(deck_id: string) {
    axios
      .get(`${API}/${deck_id}/draw/?count=${cards.length}`)
      .then(({ data }) => {
        setCards(data.cards)
      })
      .catch(() => {
        console.log('Ocorreu um erro ao acessar a api.')
      })
      .finally(() => setLoader(false))
  }

  if (loader) {
    return <CircularProgress />
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <div>
          <h1 className={styles.title}>Deck Of Cards</h1>
        </div>
        <div>
          <span className={styles.title_name}>Olá {label}</span>
        </div>
      </div>
      <div className={styles.grid}>
        {cards.map((row: ICard, index: number) => (
          <Card
            key={index}
            code={row.code}
            value={row.value}
            image={row.image}
          />
        ))}
      </div>
      <div className={styles.container_buttons}>
        <Button
          label="Nova Carta"
          onClick={newCard}
          disabled={cards.length >= MAX_CARDS}
        />
        <Button label="Embaralhar" onClick={shuffleCards} disabled={false} />
      </div>
    </div>
  )
}
