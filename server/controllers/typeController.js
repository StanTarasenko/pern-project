const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res) {
      const itemId = req.params.id;
  
      try {
        const itemToDelete = await Type.findByPk(itemId);
  
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

module.exports = new TypeController()
