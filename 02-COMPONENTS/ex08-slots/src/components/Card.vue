<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">
        <h3>Card Title</h3>
      </slot>
    </header>

    <div class="card-body">
      <slot>
        <p>Card content goes here</p>
      </slot>
    </div>

    <footer class="card-footer">
      <slot name="footer">
        <p></p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.card-header,
.card-footer {
  background: #f1f5f9;
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
}

.card-body {
  padding: 20px;
}
</style>