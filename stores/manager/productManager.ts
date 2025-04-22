
export const useProductManager = defineStore('ProductManager', () => {
    const { newProduct ,files_delete} = useProductViewModel();
    const removeFile = (id: number, itemId: number | null) => {
        console.log(newProduct);
        if (newProduct.previews)  newProduct.previews = newProduct.previews.filter((item,index)=> index != id)
        newProduct.files = newProduct.files.filter((item, index) => index != id)
        if (itemId) {
            files_delete.push(itemId)
        }
    }

    const getFile = (item:any) => {
        if(newProduct.previews)newProduct.previews.push(item.blob)
        newProduct.files.push(item.file)
    };
    return {
        removeFile,
        files_delete,
        getFile
    }
})