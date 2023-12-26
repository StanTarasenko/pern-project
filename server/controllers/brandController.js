const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({ name })
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
      const itemId = req.params.id;
  
      try {
        const itemToDelete = await Brand.findByPk(itemId);
  
        if (!itemToDelete) {
          return res.status(404).json({ message: 'Item not found' });
        }
  
        await itemToDelete.destroy();
  
        res.json({ message: 'Item deleted successfully', deletedItem: itemToDelete });
      } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
}

module.exports = new BrandController();
