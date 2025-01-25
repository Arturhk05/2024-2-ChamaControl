const FocusService = require('../services/FocusService.js')

class FocusController {
  constructor () {
    this.focusService = new FocusService()

    this.getMonthlyFocusByEstate = this.getMonthlyFocusByEstate.bind(this)
    this.getMonthlyFocusByRegion = this.getMonthlyFocusByRegion.bind(this)
    this.getYearFocusFromRegion = this.getYearFocusFromRegion.bind(this)
    this.getYearFocusFromEstate = this.getYearFocusFromEstate.bind(this)
    this.getFocusByRegion = this.getFocusByRegion.bind(this)
    this.getAllYearsFocusFromEstate = this.getAllYearsFocusFromEstate.bind(this)
  }

  async getMonthlyFocusByEstate (req, res) {
    const { month, year } = req.params

    try {
      const data = await this.focusService.getMonthlyFocusByEstate(parseInt(month, 10), parseInt(year, 10))
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getMonthlyFocusByRegion (req, res) {
    const { month, year } = req.params

    try {
      const data = await this.focusService.getMonthlyFocusByRegion(parseInt(month, 10), parseInt(year, 10))
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getFocusByRegion (req, res) {
    const { year } = req.params

    try {
      const data = await this.focusService.getFocusByRegion(parseInt(year, 10))
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getYearFocusFromRegion (req, res) {
    const { region, year } = req.params

    try {
      const data = await this.focusService.getYearFocusFromRegion(region, parseInt(year, 10))
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getYearFocusFromEstate (req, res) {
    const { estate, year } = req.params

    try {
      const data = await this.focusService.getYearFocusFromEstate(estate, parseInt(year, 10))
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAllYearsFocusFromEstate (req, res) {
    const { estate } = req.params

    try {
      const data = await this.focusService.getAllYearsFocusFromEstate(estate)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = FocusController
