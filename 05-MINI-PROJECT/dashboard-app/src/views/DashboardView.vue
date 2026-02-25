<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <button class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition">
        Download Report
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Sales"
        value="$24,500"
        :icon="DollarSign"
        :trend="12.5"
        colorClass="bg-blue-50 text-blue-600"
      />
      <StatsCard
        title="New Users"
        value="1,240"
        :icon="Users"
        :trend="5.2"
        colorClass="bg-purple-50 text-purple-600"
      />
      <StatsCard
        title="Active Orders"
        value="45"
        :icon="ShoppingBag"
        :trend="-2.4"
        colorClass="bg-orange-50 text-orange-600"
      />
      <StatsCard
        title="Conversion Rate"
        value="3.2%"
        :icon="TrendingUp"
        :trend="0.5"
        colorClass="bg-green-50 text-green-600"
      />
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
        <h2 class="text-lg font-bold mb-6">Sales Trends</h2>
        <div class="h-[300px]">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold mb-6">Recent Orders</h2>
        <div class="space-y-4">
          <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Package class="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">#{{ order.id }}</p>
                <p class="text-xs text-gray-500">{{ order.customer }}</p>
              </div>
            </div>
            <span :class="`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(order.status)}`">
              {{ order.status }}
            </span>
          </div>
        </div>
        <button class="w-full mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700">
          View All Orders
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Package
} from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import StatsCard from '@/components/dashboard/StatsCard.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales ($)',
    data: [12000, 19000, 15000, 22000, 18000, 24500],
    borderColor: '#0ea5e9',
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    fill: true,
    tension: 0.4
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
    x: { grid: { display: false } }
  }
}

const recentOrders = [
  { id: 'ORD-001', customer: 'Alice Johnson', status: 'Completed', amount: '$120.00' },
  { id: 'ORD-002', customer: 'Bob Smith', status: 'Processing', amount: '$85.50' },
  { id: 'ORD-003', customer: 'Charlie Brown', status: 'Pending', amount: '$240.00' },
  { id: 'ORD-004', customer: 'Diana Prince', status: 'Completed', amount: '$310.00' },
  { id: 'ORD-005', customer: 'Ethan Hunt', status: 'Shipped', amount: '$45.00' },
]

function getStatusClass(status) {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-700'
    case 'Processing': return 'bg-blue-100 text-blue-700'
    case 'Pending': return 'bg-yellow-100 text-yellow-700'
    case 'Shipped': return 'bg-purple-100 text-purple-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
</script>
