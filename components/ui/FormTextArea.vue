<script lang="ts" setup>
const model = defineModel<string>();

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


const attrs = useAttrs();
</script>

<template>
  <div class="mt-4 flex w-full flex-col justify-start gap-1">
    <label :for="name" class="text-[13px] font-[500] text-zinc-700">
      {{ label }}
    </label>
    <TextArea
      :id="name"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="attrs"
      class="flex resize-none w-full rounded-lg border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
  </TextArea>
  </div>
</template>
