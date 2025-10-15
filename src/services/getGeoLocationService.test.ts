import GetGeoLocationService from './getGeoLocationService'

// Mock de navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

describe('GetGeoLocationService', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks()
  })

  it('debería resolver con coordenadas cuando la geolocalización es exitosa', async () => {
    // Arrange: Configurar el mock para simular éxito
    const mockPosition = {
      coords: {
        latitude: 40.4168,
        longitude: -3.7038
      }
    }
    
    mockGeolocation.getCurrentPosition.mockImplementation((successCallback: any) => {
      successCallback(mockPosition)
    })

    // Act: Llamar a la función
    const result = await GetGeoLocationService()

    // Assert: Verificar el resultado
    expect(result).toEqual({
      lat: 40.4168,
      lon: -3.7038
    })
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
  })

  it('debería rechazar con error cuando la geolocalización falla', async () => {
    // Arrange: Configurar el mock para simular error
    const mockError = new Error('Ubicación no disponible')
    
    mockGeolocation.getCurrentPosition.mockImplementation((successCallback: any, errorCallback: any) => {
      errorCallback(mockError)
    })

    // Act & Assert: Verificar que la promesa se rechaza
    await expect(GetGeoLocationService()).rejects.toThrow('Ubicación no disponible')
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
  })

  it('debería rechazar cuando geolocalización no está soportada', async () => {
    // Arrange: Mock navigator sin geolocation
    const originalGeolocation = global.navigator.geolocation
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    })

    // Act & Assert: Verificar que se rechaza con el mensaje correcto
    await expect(GetGeoLocationService()).rejects.toThrow(
      'La geolocalización no está soportada por este navegador.'
    )

    // Cleanup: Restaurar geolocalización
    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
    })
  })

  it('debería llamar getCurrentPosition con los callbacks correctos', () => {
    // Arrange: Configurar el mock
    mockGeolocation.getCurrentPosition.mockImplementation(() => {})

    // Act: Llamar la función (no esperamos resolución)
    GetGeoLocationService()

    // Assert: Verificar que se llamó con 2 argumentos (success y error callbacks)
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function), // success callback
      expect.any(Function)  // error callback
    )
  })

  it('debería manejar coordenadas con decimales', async () => {
    // Arrange: Coordenadas con muchos decimales
    const mockPosition = {
      coords: {
        latitude: 40.41685063734567,
        longitude: -3.703790234578923
      }
    }
    
    mockGeolocation.getCurrentPosition.mockImplementation((successCallback: any) => {
      successCallback(mockPosition)
    })

    // Act
    const result = await GetGeoLocationService()

    // Assert: Las coordenadas deben mantenerse exactas
    expect(result.lat).toBe(40.41685063734567)
    expect(result.lon).toBe(-3.703790234578923)
  })
})