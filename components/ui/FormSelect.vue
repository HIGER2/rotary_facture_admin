<template>
  <div class="mt-4 flex w-full flex-col justify-start gap-1">
    <label class="text-[13px] font-md text-zinc-700" v-if="label">{{ label }}</label>
    <select
      :name="name"
      :disabled="disabled"
      class="w-full rounded-md border border-zinc-200 p-2 px-3 text-xs font-semibold outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-500 focus:border-brand focus:outline-brand-light disabled:text-zinc-500"
      v-model="selectedValue"
      @change="handleChange"
    >
      <option  value="">{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>

// Définir une interface pour les props
interface SelectOption {
  value: string | number
  label: string
}

interface FormSelectProps {
  label: string
  options: SelectOption[]
  modelValue: string | number
  name: string
  disabled?: boolean
  placeholder?: string
}

// Utiliser defineProps avec des valeurs par défaut
const props = withDefaults(defineProps<FormSelectProps>(), {
  disabled: false,
  modelValue: ''
})

// Émission d'événements pour mettre à jour le parent
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
  (event: 'change', value: string | number): void
}>()

// État local pour la valeur sélectionnée
const selectedValue = ref<string | number>(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue;
});
// Observer les changements et émettre l'événement de mise à jour
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Fonction pour gérer l'événement `change` du select
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}

</script>
