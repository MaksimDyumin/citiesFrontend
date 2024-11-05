import { publicClient } from '@/axios/api'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    citizens: [],
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

          const countryNode = getOrCreateNode(tree, countryname, 'Страна')

          const cityNode = getOrCreateChildNode(countryNode, cityname, 'Город')

          const districtNode = getOrCreateChildNode(
            cityNode,
            districtname,
            'Район',
          )

          const streetNode = getOrCreateChildNode(
            districtNode,
            streetname,
            'Улица',
          )

          const homeNode = home
            ? getOrCreateChildNode(streetNode, `Дом ${home}`, 'Дом')
            : streetNode

          addResident(homeNode, personname, resident)
        })

        return Object.values(tree)
      }

      const getOrCreateNode = (tree, label, type) => {
        if (!tree[label]) {
          tree[label] = { label, type, children: [] }
        }
        return tree[label]
      }

      const getOrCreateChildNode = (parent, label, type) => {
        const node = parent.children.find(n => n.label === label)
        if (node) {
          return node
        }
        const newNode = { label, type, children: [] }
        parent.children.push(newNode)
        return newNode
      }

      const addResident = (node, label, data) => {
        node.children.push({
          label: label || 'Неуказанно',
          data,
          type: 'Житель',
          parent: node,
        })
      }

      return buildTree(state.citizens)
    },
  },

  actions: {
    async getCities() {
      try {
        const response = await publicClient.get('peoples/')
        this.citizens = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
})
