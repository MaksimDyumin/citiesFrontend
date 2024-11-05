<template>
  <ModalWrapper>
    <div class="action-container">
      <form @submit.prevent="confirmChanges">
        <div class="form-field">
          <label>Имя жителя</label>
          <input type="text" placeholder="Имя жителя" disabled :value="modalStore.modalData.data.personname" />
        </div>
        <div class="form-field">
          <label>Улица</label>
          <input v-model="editableData.streetname" type="text" placeholder="Название улицы" />
        </div>
        <div class="form-field">
          <label>Дом</label>
          <input v-model="editableData.home" type="text" placeholder="Номер дома" />
        </div>
        <div class="form-field">
          <label>Район</label>
          <input v-model="editableData.districtname" type="text" placeholder="Название района" />
        </div>
        <div class="form-field">
          <label>Город</label>
          <input v-model="editableData.cityname" type="text" placeholder="Название города" />
        </div>
        <div class="form-field">
          <label>Страна</label>
          <input v-model="editableData.countryname" type="text" placeholder="Название страны" />
        </div>
        <button type="submit" class="confirm-button">Подтвердить</button>
      </form>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useModalStore } from '@/stores/modal';
import ModalWrapper from '@/components/ModalWrapper.vue';


const modalStore = useModalStore();
const editableData = ref({
  streetname: '',
  home: '',
  districtname: '',
  cityname: '',
  countryname: ''
});

onMounted(() => {
  if (modalStore.modalData && modalStore.modalData.data) {
    editableData.value = {
      streetname: modalStore.modalData.data.streetname || null,
      home: modalStore.modalData.data.home || null,
      districtname: modalStore.modalData.data.districtname || null,
      cityname: modalStore.modalData.data.cityname || null,
      countryname: modalStore.modalData.data.countryname || null
    }
  }
})

function confirmChanges() {
  if (modalStore.modalData && modalStore.modalData.data) {
    modalStore.modalData.data.streetname = editableData.value.streetname;
    modalStore.modalData.data.home = editableData.value.home ? `д. ${editableData.value.home}` : null
    modalStore.modalData.data.districtname = editableData.value.districtname;
    modalStore.modalData.data.cityname = editableData.value.cityname;
    modalStore.modalData.data.countryname = editableData.value.countryname;
  }
  modalStore.hideModal()
}
</script>

<style lang="scss" scoped>
.action-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .modal-header {}
}

.form-field {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-field input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1976d2;
    outline: none;
  }
}

.confirm-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
}

.delete-container {
  margin-top: 20px;
}

.delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #e53935;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c62828;
  }
}
</style>
