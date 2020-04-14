import { MetadataStorage, storage } from '@rimo/metadata'

/**
 * Metadata test
 */
describe('Metadata test', () => {
  it('should be global', () => {
    expect(storage).toBe(MetadataStorage.getInstance())
  })
})
