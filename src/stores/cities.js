import { publicClient } from '@/axios/api'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    cities: [],
  }),

  getters: {
    treeData: state => {
      const buildTree = data => {
        const tree = {}

        data.forEach(resident => {
          const {
            personname,
            home,
            streetname,
            districtname,
            cityname,
            countryname,
          } = resident

          if (countryname) {
            const countryNode = (tree[countryname] = tree[countryname] || {
              label: countryname,
              type: 'Страна',
              children: [],
            })

            const cityNode = (countryNode.children = countryNode.children || [])
            let cityEntry = cityNode.find(city => city.label === cityname)
            if (!cityEntry) {
              cityEntry = {
                label: cityname,
                type: 'Город',
                children: [],
              }
              cityNode.push(cityEntry)
            }

            const districtNode = (cityEntry.children = cityEntry.children || [])
            let districtEntry = districtNode.find(
              district => district.label === districtname,
            )
            if (!districtEntry) {
              districtEntry = {
                label: districtname,
                type: 'Район',
                children: [],
              }
              districtNode.push(districtEntry)
            }

            const streetNode = (districtEntry.children =
              districtEntry.children || [])
            let streetEntry = streetNode.find(
              street => street.label === streetname,
            )
            if (!streetEntry) {
              streetEntry = {
                label: streetname,
                type: 'Улица',
                children: [],
              }
              streetNode.push(streetEntry)
            }

            let homeNode
            if (home) {
              const homeList = (streetEntry.children =
                streetEntry.children || [])
              let homeEntry = homeList.find(h => h.label === `Дом ${home}`)
              if (!homeEntry) {
                homeEntry = {
                  label: `Дом ${home}`,
                  type: 'Дом',
                  children: [],
                }
                homeList.push(homeEntry)
              }
              homeNode = homeEntry
            } else {
              homeNode = streetEntry
            }

            const residentsList = homeNode.children || (homeNode.children = [])
            residentsList.push({
              label: personname || 'Неуказанно',
              data: resident,
              type: 'Житель',
              parent: homeNode,
            })
          } else {
            const cityNode = (tree[cityname] = tree[cityname] || {
              label: cityname,
              type: 'Город',
              children: [],
            })

            const districtNode = (cityNode.children = cityNode.children || [])
            let districtEntry = districtNode.find(
              district => district.label === districtname,
            )
            if (!districtEntry) {
              districtEntry = {
                label: districtname,
                type: 'Район',
                children: [],
              }
              districtNode.push(districtEntry)
            }

            const streetNode = (districtEntry.children =
              districtEntry.children || [])
            let streetEntry = streetNode.find(
              street => street.label === streetname,
            )
            if (!streetEntry) {
              streetEntry = {
                label: streetname,
                type: 'Улица',
                children: [],
              }
              streetNode.push(streetEntry)
            }

            let homeNode
            if (home) {
              const homeList = (streetEntry.children =
                streetEntry.children || [])
              let homeEntry = homeList.find(h => h.label === `Дом ${home}`)
              if (!homeEntry) {
                homeEntry = {
                  label: `Дом ${home}`,
                  type: 'Дом',
                  children: [],
                }
                homeList.push(homeEntry)
              }
              homeNode = homeEntry
            } else {
              homeNode = streetEntry
            }

            const residentsList = homeNode.children || (homeNode.children = [])
            residentsList.push({
              label: personname || 'Неуказанно',
              data: resident,
              type: 'Житель',
              parent: homeNode,
            })
          }
        })

        return Object.values(tree)
      }

      return buildTree(state.cities)
    },
  },

  actions: {
    async getCities() {
      try {
        const response = await publicClient.get('peoples/')
        this.cities = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
})
