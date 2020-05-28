const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const RAID_BOSS_ENDPOINT = 'https://thesilphroad.com/raid-bosses'

const RAID_BOSSES = {
	'Tier 5': [],
	'Tier 4': [],
	'Tier 3': [],
	'Tier 2': [],
	'Tier 1': [],
}

const scrapeRaidBossesPage = async () => {
	const response = await fetch(RAID_BOSS_ENDPOINT)
	const body = await response.text()
	return body
}

const getRaidBosses = async () => {
	const page = await scrapeRaidBossesPage()
	const $ = cheerio.load(page)
	const new_raid_bosses = { ...RAID_BOSSES }

	Object.keys(new_raid_bosses).forEach((tier) => {
		$(`.raid-boss-tier-wrap:contains('${tier}')`)
			.nextUntil('.raid-boss-tier-wrap')
			.each(function () {
				new_raid_bosses[tier].push($(this).find('.boss-name').text())
			})
	})

	console.log('Fetched Raid Bosses', new_raid_bosses)
	return new_raid_bosses
}

const saveData = async (filename, data) => {
	fs.writeFile(filename, data, (err) => {
		if (err) throw err
	})
}

const raidBosses = async () => {
	try {
		const raid_bosses = await getRaidBosses()
		const raid_boss_file_path = `../data/raid-bosses.json`

		await saveData(
			`${__dirname}/${raid_boss_file_path}`,
			JSON.stringify(raid_bosses)
		)

		console.log(`file saved to: ${raid_boss_file_path}`)
	} catch (error) {
		console.log('There was an error', error)
	}
}

module.exports = raidBosses
