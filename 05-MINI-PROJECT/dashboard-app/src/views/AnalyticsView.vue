<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center text-gray-900">
      <h1 class="text-2xl font-bold">Analytics & Reports</h1>
      <div class="flex gap-2 text-gray-900">
        <select class="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
        <button class="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition flex items-center">
          <Download class="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-900">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold mb-6">Revenue Overview</h2>
        <div class="h-80">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold mb-6">Sales by Category</h2>
        <div class="h-80 flex justify-center">
          <Doughnut :data="categoryData" :options="pieOptions" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-gray-900">
      <h2 class="text-lg font-bold mb-6">Daily Transactions</h2>
      <div class="h-80 text-gray-900">
        <Bar :data="transactionData" :options="chartOptions" />
      </div>
    </div>

    <!-- Top Products Requirement -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-gray-900">
      <h2 class="text-lg font-bold mb-6">Top Selling Products</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Sales</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="product in topProducts" :key="product.id">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span class="text-sm font-medium">{{ product.title }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm">{{ product.sales }} units</td>
              <td class="px-6 py-4 text-sm font-bold text-right text-primary-600">${{ product.revenue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Download } from 'lucide-vue-next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const topProducts = [
  { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack', sales: 450, revenue: '49,455' },
  { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts', sales: 380, revenue: '12,500' },
  { id: 3, title: 'Mens Cotton Jacket', sales: 320, revenue: '17,920' },
  { id: 4, title: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor', sales: 120, revenue: '119,880' },
]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6' }
    },
    x: {
      grid: { display: false }
    }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
}

const revenueData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      borderColor: '#0ea5e9',
      borderWidth: 3,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#0ea5e9',
      tension: 0.4,
      fill: true,
      data: [3500, 4200, 3800, 5100, 4800, 6200, 5800]
    }
  ]
}

const transactionData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Transactions',
      backgroundColor: '#0ea5e9',
      data: [45, 52, 48, 61, 55, 68, 62]
    }
  ]
}

const categoryData = {
  labels: ['Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing"],
  datasets: [
    {
      backgroundColor: ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981'],
      data: [40, 20, 15, 25]
    }
  ]
}
</script>
