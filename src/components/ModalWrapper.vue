<template>
  <Transition mode="in-out">
    <div v-if="modalStore.isModalShow" class="modal-container">
      <div @click="modalStore.hideModal()" class="modal-layout"></div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';


const modalStore = useModalStore()
</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin full-width-height {
  width: 100%;
  height: 100%
}

.modal-container {
  @include flex-center;
  @include full-width-height;
  overflow: hidden;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;

  .modal-layout {
    @include full-width-height;
    background-color: #000;
    opacity: 0.7;
    z-index: 4;
    position: fixed;
  }

  .modal-content {
    @include flex-center;
    z-index: 4;
    display: flex;
    background-color: #fff;
  }
}
</style>
