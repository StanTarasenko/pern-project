const { Basket, BasketDevice, User } = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
  async create(req, res, next) {
    try {
      let { userId, devices } = req.body;
      const userExists = await User.findByPk(userId);

      if (!userExists) {
        return next(ApiError.badRequest('User not found'));
      }

      const basket = await Basket.create({ userId });

      if (devices) {
        devices = JSON.parse(devices)
        devices.forEach((device) =>
          BasketDevice.create({
            title: device.name,
            deviceId: device.id,
            basketId: basket.id,
          })
        )
      } 

      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const baskets = await Basket.findAll();
      return res.json(baskets);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
      const { id } = req.params;
      const basket = await Basket.findOne({
        where: { id },
        include: [{ model: BasketDevice, as: 'devices' }],
      });
      return res.json(basket);
  }

  async addDevicesToBasket(req, res, next) {
    try {
      const { basketId, devices } = req.body;
      const basket = await Basket.findByPk(basketId);

      if (!basket) {
        return next(ApiError.badRequest('Basket not found'));
      }

      if (devices) {
        const parsedDevices = JSON.parse(devices);

        parsedDevices.forEach(async (device) => {
          await BasketDevice.create({
            title: device.name,
            deviceId: device.id,
            basketId: basket.id,
          });
        });
      }

      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
