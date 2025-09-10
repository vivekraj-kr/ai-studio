import { renderHook, act } from '@testing-library/react'
import { useGeneration } from '../../app/hooks/useGeneration'

// Mock the dependencies
jest.mock('../../app/lib/api')
jest.mock('../../app/lib/imageUtils')
jest.mock('../../app/lib/storage')

import { generateImage } from '../../app/lib/api'
import { processImageFile } from '../../app/lib/imageUtils'
import { addToHistory } from '../../app/lib/storage'

const mockGenerateImage = generateImage as jest.MockedFunction<typeof generateImage>
const mockProcessImageFile = processImageFile as jest.MockedFunction<typeof processImageFile>
const mockAddToHistory = addToHistory as jest.MockedFunction<typeof addToHistory>

describe('useGeneration hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with correct default state', () => {
    const onSuccess = jest.fn()
    const { result } = renderHook(() => useGeneration(onSuccess))

    expect(result.current.isGenerating).toBe(false)
    expect(result.current.error).toBe(null)
    expect(typeof result.current.generate).toBe('function')
  })

  it('should handle successful generation', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const mockImageResult = { dataUrl: 'data:image/jpeg;base64,test' }
    const mockResponse = {
      id: 'test-id',
      imageUrl: 'test-url',
      prompt: 'test prompt',
      style: 'editorial',
      createdAt: '2023-01-01T00:00:00.000Z'
    }

    mockProcessImageFile.mockResolvedValue(mockImageResult)
    mockGenerateImage.mockResolvedValue(mockResponse)
    mockAddToHistory.mockReturnValue([mockResponse])

    const onSuccess = jest.fn()
    const { result } = renderHook(() => useGeneration(onSuccess))

    await act(async () => {
      await result.current.generate(mockFile, 'test prompt', 'editorial')
    })

    expect(mockProcessImageFile).toHaveBeenCalledWith(mockFile)
    expect(mockGenerateImage).toHaveBeenCalledWith({
      imageDataUrl: 'data:image/jpeg;base64,test',
      prompt: 'test prompt',
      style: 'editorial'
    })
    expect(mockAddToHistory).toHaveBeenCalledWith(mockResponse)
    expect(onSuccess).toHaveBeenCalledWith(mockResponse)
    expect(result.current.isGenerating).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should handle generation error', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const errorMessage = 'Generation failed'

    mockProcessImageFile.mockRejectedValue(new Error(errorMessage))

    const onSuccess = jest.fn()
    const { result } = renderHook(() => useGeneration(onSuccess))

    await act(async () => {
      await result.current.generate(mockFile, 'test prompt', 'editorial')
    })

    expect(result.current.isGenerating).toBe(false)
    expect(result.current.error).toBe(errorMessage)
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('should not start generation if already generating', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    // Mock a slow image processing
    mockProcessImageFile.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ dataUrl: 'test' }), 100))
    )

    const onSuccess = jest.fn()
    const { result } = renderHook(() => useGeneration(onSuccess))

    // Start first generation
    act(() => {
      result.current.generate(mockFile, 'test prompt', 'editorial')
    })

    expect(result.current.isGenerating).toBe(true)

    // Try to start second generation while first is still running
    await act(async () => {
      await result.current.generate(mockFile, 'test prompt', 'editorial')
    })

    // Should only have been called once
    expect(mockProcessImageFile).toHaveBeenCalledTimes(1)
  })
}) 