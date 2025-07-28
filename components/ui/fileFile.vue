
<script setup>
// const props = defineProps({
// file: "",
// preview: "",
// })
// const emit = defineEmits(['update:Value', 'update:preview'])
const props = defineProps({
    firstName: String,
    lastName: String,
    multiple: {
        default: false,
        type: Boolean,
    },
    accept: {
        default: null,
        type: String,
    },
})

const emit = defineEmits(['update:file', 'update:preview','loadFiles']);

const  fileinput = ref()
const isDragging = ref(false);
const preview = ref([])
const images = ref([]);
const load = () => {
    fileinput.value.click()
};


const onUpload = (event) => {
    
    let files;
    if (event.type === "drop") {
        files = event.dataTransfer.files
    } else if (event.type === "change") {
        files = event.target.files
    }
    if (files) {
        for (const element of files) {
            if (!images.value.some((e) => e === element)) {
                if (images.value.length < 20) {
                    // images.value[0] = element
                    images.value.push(element)
                    let objectURL = URL.createObjectURL(element);
                    // preview.value =objectURL
                    preview.value.push(objectURL)
                } else {
                    alert('attention vous pouvez selectionner que 3 images')
                }
                // console.log(images.value);
            }
        }
    }

    emit('loadFiles', {
        blob:preview.value,
        file :images.value
    })
    
    console.log(images.value[0]);
    
    
    emit('update:file', props.multiple ? images.value : images.value[0])
    isDragging.value = false;
    preview.value= []
    images.value = []
};
</script>


<template>
    <div class="w-full h-full">
        <input   @change="(event) => onUpload(event)" ref="fileinput"
        :accept="accept ?? '*'" tabindex="-1" type="file" style="display: none;" multiple>
        <!-- accept="image/png,image/jpg,image/jpeg,image/jfif,image/jpe,image/jif,image/jfi,image/gif,image/webp,image/tiff,image/tif,image/bmp,image/avif,video/mp4,video/webm,video/ogg,video/ogv,video/avi,video/mov,video/wmv,video/flv,video/swf,video/mkv,video/m4v,video/m4p,video/m4b,video/m4r,video/3gp,video/3g2" tabindex="-1" type="file" style="display: none;" multiple> -->
        <slot :onOpen="load"/>
    </div>
</template>

<style lang="scss" scoped>

</style>