import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isModalShow = ref(false)
  const modalData = ref(null)

  function showModal(data) {
    modalData.value = data
    isModalShow.value = true
  }

  function hideModal() {
    modalData.value = null
    isModalShow.value = false
  }

  return { isModalShow, modalData, showModal, hideModal }
})
