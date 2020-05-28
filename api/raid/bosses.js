const path = require('path')
const raid_bosses = require(path.join(
	__dirname,
	'../../public/raid-bosses.json'
))

module.exports = (req, res) => {
	res.json(raid_bosses)
}
