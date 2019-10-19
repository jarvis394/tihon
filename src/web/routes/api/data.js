const express = require('express')
const router = express.Router()
const shopData = require('../../../configs/data/shop')
const guildShopData = require('../../../configs/data/guildShop')
const promoData = require('../../../configs/data/promo')

router.get('/itemsShop', async (_, res) => await res.json(shopData))
router.get('/guildShop', async (_, res) => await res.json(guildShopData))
router.get('/promo', async (_, res) => await res.json(promoData))

module.exports = router
