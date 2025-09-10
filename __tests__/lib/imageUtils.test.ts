import { validateFile } from '../../app/lib/imageUtils'

describe('Image utilities', () => {
  it('should validate valid JPEG file', () => {
    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    const result = validateFile(validFile)
    
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should validate valid PNG file', () => {
    const validFile = new File(['test'], 'test.png', { type: 'image/png' })
    
    const result = validateFile(validFile)
    
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should reject invalid file type', () => {
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    
    const result = validateFile(invalidFile)
    
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Please select a PNG or JPG file')
  })

  it('should reject oversized file', () => {
    // Create a file that's larger than the limit (assuming 10MB limit)
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
    
    const result = validateFile(largeFile)
    
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('File too large')
  })
}) 