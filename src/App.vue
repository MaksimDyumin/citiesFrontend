<template>
  <div class="app-container">
    <BaseTree v-model="citiesStore.treeData">
      <template #default="{ node }">
        <span class="tree-node" :class="{ 'changeable-value': node.type === 'Житель' }" @click="changeTreeNode(node)"
          @mouseover="debouncedShowTooltip(node)" @mouseleave="hideTooltip">
          {{ node.label }}
          <span v-if="tooltipNode === node && (node.citydata || node.type === 'Житель')" class="tooltip">
            {{ node.citydata || 'Житель' }}
          </span>
        </span>
      </template>
    </BaseTree>
    <ActionModal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCitiesStore } from './stores/cities';
import { BaseTree } from '@he-tree/vue';
import { useModalStore } from './stores/modal';
import ActionModal from './components/modals/ActionModal.vue';

const citiesStore = useCitiesStore();
const modalStore = useModalStore();
const tooltipNode = ref(null);
const debouncedShowTooltip = debounce(showTooltip, 200);

onMounted(async () => {
  await citiesStore.getCities();
  setInterval(() => {
    hideTooltip()
  }, 1000);
});

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function changeTreeNode(node) {
  if (node.type !== 'Житель') return;
  modalStore.showModal(node);
}

function showTooltip(node) {
  if (node.citydata || node.type === 'Житель') {
    tooltipNode.value = node;
  }
}

function hideTooltip() {
  tooltipNode.value = null;
}
</script>

<style lang="scss" scoped>
.tree-node {
  position: relative;
  display: inline-block;

  &.changeable-value {
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      background-color: rgb(183, 180, 180);
    }
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 4px;
    padding: 6px 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 0.9rem;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 10;
    opacity: 1;
    transition: opacity 0.2s ease;
  }
}
</style>
