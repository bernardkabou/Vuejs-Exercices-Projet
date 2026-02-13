<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <slot name="title">
            <h2>Modal Title</h2>
          </slot>
          <button @click="$emit('close')" class="close-btn">×</button>
        </div>

        <div class="modal-body">
          <slot>
            <p>Modal content</p>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  overflow: hidden;
}

.modal-header,
.modal-footer {
  padding: 15px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.modal-footer {
  border-top: 1px solid #e2e8f0;
}

.modal-body {
  padding: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: #475569;
}
</style>