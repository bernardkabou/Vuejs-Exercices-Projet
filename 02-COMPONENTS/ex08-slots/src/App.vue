<template>
  <div class="app">
    <h1>Slots Demo</h1>

    <!-- BaseCard (default slot + fallback) -->
    <BaseCard>
      <p>This is custom content inside BaseCard.</p>
    </BaseCard>

    <BaseCard />
    

    <!-- Card with named slots -->
    <Card>
      <template #header>
        <h2>Custom Card Header</h2>
      </template>

      <p>This is the main content of the card.</p>
      <p>You can put anything here.</p>

      <template #footer>
        <button>Confirm</button>
        <button>Cancel</button>
      </template>
    </Card>


    <!-- UserList with scoped slot -->
    <h2>User List (Scoped Slot)</h2>
    <UserList :users="users">
      <template #default="{ user, index }">
        <div class="custom-user">
          <span class="index">{{ index + 1 }}.</span>
          <img :src="user.avatar" :alt="user.name" />
          <div>
            <strong>{{ user.name }}</strong>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </template>
    </UserList>


    <!-- Modal -->
    <button @click="modalOpen = true">Open Modal</button>

    <Modal :is-open="modalOpen" @close="modalOpen = false">
      <template #title>
        <h2>Confirm Action</h2>
      </template>

      <p>Are you sure you want to proceed?</p>

      <template #footer>
        <button @click="modalOpen = false">Cancel</button>
        <button @click="confirmAction">Confirm</button>
      </template>
    </Modal>


    <!-- Tabs -->
    <h2>Tabs Example</h2>
    <TabContainer>
      <template #labels>
        <button @click="activeTab = 1">Tab 1</button>
        <button @click="activeTab = 2">Tab 2</button>
        <button @click="activeTab = 3">Tab 3</button>
      </template>

      <TabItem :active="activeTab === 1">
        <p>Content of Tab 1</p>
      </TabItem>

      <TabItem :active="activeTab === 2">
        <p>Content of Tab 2</p>
      </TabItem>

      <TabItem :active="activeTab === 3">
        <p>Content of Tab 3</p>
      </TabItem>
    </TabContainer>


    <!-- DataTable with scoped slots -->
    <h2>Data Table</h2>
    <DataTable :data="tableData" :columns="['name', 'email', 'status', 'actions']">

      <template #cell-status="{ value }">
        <span :class="`status-${value}`">{{ value }}</span>
      </template>

      <template #cell-actions="{ row }">
        <button @click="editUser(row)">Edit</button>
        <button @click="deleteUser(row)">Delete</button>
      </template>

    </DataTable>


    <!-- PageLayout -->
    <h2>Page Layout</h2>
    <PageLayout>
      <template #header>
        <h3>Page Header</h3>
      </template>

      <template #sidebar>
        <p>Sidebar content</p>
      </template>

      <p>This is the main content area.</p>

      <template #footer>
        <p>Page Footer</p>
      </template>
    </PageLayout>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import BaseCard from './components/BaseCard.vue'
import Card from './components/Card.vue'
import Modal from './components/Modal.vue'
import UserList from './components/UserList.vue'
import DataTable from './components/DataTable.vue'
import TabContainer from './components/TabContainer.vue'
import TabItem from './components/TabItem.vue'
import PageLayout from './components/PageLayout.vue'

const modalOpen = ref(false)
const activeTab = ref(1)

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?img=2' }
])

const tableData = ref([
  { name: 'Alice', email: 'alice@example.com', status: 'active' },
  { name: 'Bob', email: 'bob@example.com', status: 'inactive' },
  { name: 'Charlie', email: 'charlie@example.com', status: 'active' }
])

function confirmAction() {
  alert('Action confirmed!')
  modalOpen.value = false
}

function editUser(user) {
  alert(`Editing: ${user.name}`)
}

function deleteUser(user) {
  alert(`Deleting: ${user.name}`)
}
</script>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", system-ui, sans-serif;
  color: #0f172a;
}

h1 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e293b;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

button {
  cursor: pointer;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  border: none;
  background: #2563eb;
  color: white;
  transition: 0.2s;
}

button:hover {
  background: #1d4ed8;
}

.custom-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.custom-user img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.status-active {
  color: #16a34a;
  font-weight: 600;
}

.status-inactive {
  color: #dc2626;
  font-weight: 600;
}
</style>