import { ref } from 'vue'

export function calculateScoreTable() {
  const headers = [
    { title: '', key: 'position' },
    { title: 'Name', key: 'name' },
    { title: 'Spiele', key: 'matches' },
    { title: 'Punktzahl', key: 'score' }
  ]

  const items = ref([
    { name: 'Player 1', position: 1, matches: 3, score: '1350' },
    { name: 'Player 2', position: 2, matches: 3, score: '1105' },
    { name: 'Player 3', position: 3, matches: 3, score: '960' }
  ])

  return {
    headers,
    items
  }
}