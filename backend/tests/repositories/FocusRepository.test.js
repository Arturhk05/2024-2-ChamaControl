const connection = require('../../config/db')
const FocusRepository = require('../../api/repositories/FocusRepository')

jest.mock('../../config/db', () => ({
  query: jest.fn()
}))

describe('FocusRepository', () => {
  let focusRepository

  beforeEach(() => {
    focusRepository = new FocusRepository()
    jest.clearAllMocks()
  })

  describe('getCountByYear', () => {
    it('deve retornar a soma de focos por ano', async () => {
      const mockResults = [{ 'sum(quantidade_focos)': 1000 }]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getCountByYear(2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        'SELECT sum(quantidade_focos) FROM focos WHERE ano = ?',
        [2023],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getCountByYear(2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getMonthlyFocusByEstate', () => {
    it('deve retornar focos mensais por estado', async () => {
      const mockResults = [
        { estado: 'SP', quantidade_focos: 100, mes: 1, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getMonthlyFocusByEstate(1, 2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT estado, sum(quantidade_focos)'),
        [1, 2023],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getMonthlyFocusByEstate(1, 2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getMonthlyFocusByRegion', () => {
    it('deve retornar focos mensais por região', async () => {
      const mockResults = [
        { regiao: 'Sudeste', quantidade_focos: 200, mes: 1, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getMonthlyFocusByRegion(1, 2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT regiao, sum(quantidade_focos)'),
        [1, 2023],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getMonthlyFocusByRegion(1, 2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getFocusByRegion', () => {
    it('deve retornar focos por região em um ano específico', async () => {
      const mockResults = [
        { regiao: 'Sudeste', quantidade_focos: 500, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getFocusByRegion(2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT regiao, sum(quantidade_focos)'),
        [2023],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getFocusByRegion(2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getYearFocusFromRegion', () => {
    it('deve retornar focos de uma região específica por ano', async () => {
      const mockResults = [
        { mes: 1, regiao: 'Sudeste', quantidade_focos: 100, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getYearFocusFromRegion('Sudeste', 2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT mes, regiao, sum(quantidade_focos)'),
        [2023, 'Sudeste'],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getYearFocusFromRegion('Sudeste', 2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getYearFocusFromEstate', () => {
    it('deve retornar focos de um estado específico por ano', async () => {
      const mockResults = [
        { mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getYearFocusFromEstate('SP', 2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT mes, estado, sum(quantidade_focos)'),
        [2023, 'SP'],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getYearFocusFromEstate('SP', 2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getAllYearsFocusFromEstate', () => {
    it('deve retornar todos os focos de um estado ao longo dos anos', async () => {
      const mockResults = [
        { mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getAllYearsFocusFromEstate('SP')
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT mes, estado, sum(quantidade_focos)'),
        ['SP'],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getAllYearsFocusFromEstate('SP')).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })

  describe('getFocusFromBiomes', () => {
    it('deve retornar focos por bioma em um ano específico', async () => {
      const mockResults = [
        { bioma: 'Amazônia', quantidade_focos: 150, ano: 2023 }
      ]
      connection.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults)
      })

      const result = await focusRepository.getFocusFromBiomes(2023)
      expect(result).toEqual(mockResults)
      expect(connection.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT bioma, sum(quantidade_focos)'),
        [2023],
        expect.any(Function)
      )
    })

    it('deve rejeitar com erro quando a query falha', async () => {
      const mockError = new Error('Erro de banco de dados')
      connection.query.mockImplementation((query, params, callback) => {
        callback(mockError)
      })

      await expect(focusRepository.getFocusFromBiomes(2023)).rejects.toThrow('Erro ao obter dados: Erro de banco de dados')
    })
  })
})
