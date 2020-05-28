const { raidBosses } = require('./scrape')

const run = async () => {
	await raidBosses()
}

run()
