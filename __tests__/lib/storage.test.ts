import { loadHistory, addToHistory, clearHistory } from '../../app/lib/storage'
import { Generation } from '../../app/types'

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should load empty history initially', () => {
    const history = loadHistory()
    expect(history).toEqual([])
  })

  it('should add generation to history', () => {
    const generation: Generation = {
      id: 'test-1',
      imageUrl: 'test-url',
      prompt: 'test prompt',
      style: 'editorial',
      createdAt: '2023-01-01T00:00:00.000Z'
    }

    const updatedHistory = addToHistory(generation)
    
    expect(updatedHistory).toHaveLength(1)
    expect(updatedHistory[0]).toEqual(generation)
  })

  it('should limit history to 5 items', () => {
    // Add 6 generations
    for (let i = 1; i <= 6; i++) {
      addToHistory({
        id: `test-${i}`,
        imageUrl: 'test-url',
        prompt: `test prompt ${i}`,
        style: 'editorial',
        createdAt: '2023-01-01T00:00:00.000Z'
      })
    }

    const history = loadHistory()
    expect(history).toHaveLength(5)
    expect(history[0].id).toBe('test-6') // Most recent first
    expect(history[4].id).toBe('test-2') // Oldest in the list
  })

  it('should clear history', () => {
    // Add a generation first
    addToHistory({
      id: 'test-1',
      imageUrl: 'test-url',
      prompt: 'test prompt',
      style: 'editorial',
      createdAt: '2023-01-01T00:00:00.000Z'
    })

    expect(loadHistory()).toHaveLength(1)
    
    clearHistory()
    
    expect(loadHistory()).toHaveLength(0)
  })
}) 