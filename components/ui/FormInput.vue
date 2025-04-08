<script lang="ts" setup>

const props = defineProps<{
  label: string;
  placeholder: string;
  modelValue: string;
  name: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <div class="mt-4 flex w-full flex-col justify-start gap-1">
    <label :for="name" class="text-[13px] font-[500] text-zinc-700">
      {{ label }}
    </label>
    <input
      :id="name"
      v-model="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="flex h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
    />
  </div>
</template>
