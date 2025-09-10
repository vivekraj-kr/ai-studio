import { generateImage } from '../../app/lib/api'

// Mock fetch globally
global.fetch = jest.fn()

const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('API utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should generate image successfully', async () => {
    const mockResponse = {
      id: 'test-id',
      imageUrl: 'test-url',
      prompt: 'test prompt',
      style: 'editorial',
      createdAt: '2023-01-01T00:00:00.000Z'
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await generateImage({
      imageDataUrl: 'data:image/jpeg;base64,test',
      prompt: 'test prompt',
      style: 'editorial'
    })

    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageDataUrl: 'data:image/jpeg;base64,test',
        prompt: 'test prompt',
        style: 'editorial'
      }),
    })
  })

  it('should handle API errors', async () => {
    const errorResponse = { message: 'Generation failed' }

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => errorResponse,
    } as Response)

    await expect(generateImage({
      imageDataUrl: 'data:image/jpeg;base64,test',
      prompt: 'test prompt',
      style: 'editorial'
    })).rejects.toThrow('Generation failed')
  })

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(generateImage({
      imageDataUrl: 'data:image/jpeg;base64,test',
      prompt: 'test prompt',
      style: 'editorial'
    })).rejects.toThrow('Network error')
  })
}) 