<template>
    <nav class="text-sm flex items-center space-x-2">
      <NuxtLink to="/">
        <span class="text-gray-600 hover:underline">Tableau de bord</span>
      </NuxtLink>
      <span v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center space-x-2">
        <span >
            <i class="uil uil-angle-right-b text-md"></i>
        </span>
        <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.to" class="text-gray-600 hover:underline">
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="font-semibold">{{ crumb.label }}</span>
      </span>
    </nav>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  
  const route = useRoute()
  console.log(route);
  
  const breadcrumbs = computed(() => {
    const matched = route.matched.filter(r => r.meta?.breadcrumb)
    return matched.map(r => ({
      label: r.meta.breadcrumb,
      to: r.path
    }))
  })
  </script>
  