<template>
  <div class="mt-4 flex w-full flex-col justify-start gap-1">
    <label class="text-[13px] font-[500] text-zinc-700" v-if="label">{{ label }}</label>
    <select
      :name="name"
      :disabled="disabled"
      v-bind="$attrs"
      class="flex h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      :value="props.modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option  value="" disabled>{{ placeholder }}</option>
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
