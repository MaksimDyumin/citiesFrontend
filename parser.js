import fs from 'node:fs'


async function main() {
    const citizens = JSON.parse(fs.readFileSync('./citizens.json').toString())
    const cities = JSON.parse(fs.readFileSync('./cities.json').toString())
    const citiesAndcitizens = []

    cities.forEach(city => { citiesAndcitizens.push({ ...city }) });
    for (const citizen of citizens) {
        const groups = citizen.groups
        const cityOfCitizen = groups.find((val) => { return val.type === 'city' ? true : false }).name.split(' ')[0]
        const districtOfCitizen = groups.find((val) => { return val.type === 'district' ? true : false }).name.split(' ')[0]
        const streetOfCitizen = groups.find((val) => { return val.type === 'street' ? true : false }).name.split(' ')[0]
        const indexCity = citiesAndcitizens.findIndex((city) => {
            return city.name === cityOfCitizen
        })
        if (!citiesAndcitizens[indexCity]?.districts) {
            citiesAndcitizens[indexCity].districts = [{ name: districtOfCitizen, streets: [{ name: streetOfCitizen, citizens: [citizen] }] }]
        } else {
            const isDistrictIn = citiesAndcitizens[indexCity].districts.find((district) => district.name === districtOfCitizen)
            if (!isDistrictIn) {
                citiesAndcitizens[indexCity].districts.push({ name: districtOfCitizen, streets: [{ name: streetOfCitizen, citizens: [citizen] }] })
            } else {
                const distIndex = citiesAndcitizens[indexCity].districts.findIndex((district) => {
                    return district.name === isDistrictIn.name
                })
                const dist = citiesAndcitizens[indexCity].districts[distIndex]
                const isStreetIn = dist.streets.find((street) => street.name === streetOfCitizen)
                if (!isStreetIn) {
                    dist.streets.push({ name: streetOfCitizen, citizens: [citizen] })
                } else {
                    isStreetIn.citizens.push(citizen)
                }

            }
        }
    }
    console.log(citiesAndcitizens[0].districts[0].streets);
}

main()