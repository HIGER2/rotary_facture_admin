

<script lang="ts" setup>

// Définir les types pour les props
interface Column {
  label: string  // Étiquette de la colonne
  key: string    // Clé de la donnée à afficher dans cette colonne
}

interface TableProps {
  columns: Column[] // Liste des colonnes
  loading?: boolean
  data: Record<string, any>[] // Liste des données du tableau
  rowClick?: (item: Record<string, any>, index: number) => void // Fonction optionnelle pour le clic sur les lignes
}

// Props pour le composant
const props = withDefaults(defineProps<TableProps>(), {
  loading: false
})
// const props = defineProps<TableProps>()
const emit = defineEmits(['rowClick'])

// Gérer le clic sur une ligne et émettre l'événement
function handleRowClick(item: Record<string, any>, index: number) {
  if (props.rowClick) {
    props.rowClick(item, index) 
  } else {
    emit('rowClick', item, index) 
  }
}
const displayValue = (val: any): string => {
  if (
    val === null ||
    val === undefined ||
    val === '' ||
    (typeof val === 'object' && Object.keys(val).length === 0)
  ) {
    return 'N/A';
  }

  return String(val);
};
</script>

<template>
  <div class="overflow-x-auto overflow-y-auto max-h-[500px] border bg-white border-gray-200 rounded-lg">
    <table class="min-w-max w-full border-collapse">
      <!-- En-tête dynamique -->
      <thead class="border-b bg-sidebar sticky z-10 top-0 border-gray-100 capitalize text-[10px]">
        <tr>
          <th v-for="(column, index) in columns" :key="index"
          class="
          bg-sidebar
            h-10 px-1 text-left align-middle 
            text-gray-700 font-[400] rounded-md text-sm
           
          "
          :class="[
            index === 0 ? 'sticky left-0  w-[150px]' : '',
            // index === 1 ? 'sticky left-[150px] w-[150px]' : '',
            // index === 2 ? 'sticky left-[300px] w-[150px]' : ''
          ]"
          >
            {{$t(column.label)}}
          </th>
        </tr>
      </thead>
      
      <!-- Corps du tableau -->
      <template v-if="!loading && data?.length > 0">
        <tbody>
          <tr
            v-for="(item, rowIndex) in data"
            :key="rowIndex"
            class="text-gray-800 font-[500] border-b border-zinc-100 cursor-pointer hover:bg-zinc-50"
            @click="handleRowClick(item, rowIndex)"
          >
            <td v-for="(column, colIndex) in columns" 
                :key="colIndex" 
                :class="[
                'p-2 whitespace-nowrap bg-white', // base
                colIndex === 0 ? 'sticky left-0 z-[5]  w-[150px]' : '',
                // colIndex === 1 ? 'sticky left-[150px] z-[5] w-[150px]' : '',
                // colIndex === 2 ? 'sticky left-[300px] z-[5] w-[150px]' : ''
              ]"
            >
              <!-- Slot personnalisé s'il existe -->
              <template v-if="$slots[column.key]">
                <slot :name="column.key" :item="item" :index="rowIndex" />
              </template>
              <!-- Sinon afficher du texte -->
              <template v-else>
                <span>{{ displayValue(item[column.key]) }}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </template>
    </table>

    <!-- Si vide -->
    <template v-if="data?.length === 0 && !loading">
      <div class="w-full bg-white p-3 flex items-center justify-center">
        <h4>Aucun élément</h4>
      </div>
    </template>

    <!-- Si loading -->
    <template v-if="loading && data.length === 0">
      <UiLoader />
    </template>
  </div>
</template>


<style scoped>
.table {
  width: 100%;
}
table {
  width: 100%;
    border-collapse: collapse;
  /* table-layout: fixed; */

}
thead th {
  padding: 15px 10px;
  text-align: left;
}

tbody tr td {
  padding: 12px 12px;
  font-size: 12px;
  text-align: left;
  word-wrap: break-word; 
overflow-wrap: break-word;
}
</style>
