const path = require('path')
const raid_bosses = require(path.join(__dirname, '../../data/raid-bosses.json'))

module.exports = (req, res) => {
	res.json(raid_bosses)
}
