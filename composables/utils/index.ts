
export function Utils() {
    
    function formatNumber(value, decimals = 2) {
    const number = Number(value)

    if (isNaN(number)) return '0'

    return number.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals
    })
    }

    function formatDate(date: string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

    return {
        formatDate,
        formatNumber
    };
}

// import { Storage } from '@ionic/storage';
// const store = new Storage();



// export async function setStorage(key: string, value:any) {
//     const storage = await store.create();
//     return await storage.set(key, JSON.stringify(value));
// }


// export async function getStorage(key: any) {
//     const storage = await store.create();
//     const storedData  =  await storage.get(key)
//     const parsedData = JSON.parse(storedData);
//     return parsedData
// }   


// export async function removeStorage(key: string) {
//     const storage = await store.create();
//     await storage.remove(key);
// }


// export async function clearStorage() {
//     const storage = await store.create();
//     await storage.clear();
// }

// export const storage = {
//     setStorage,
//     getStorage,
//     removeStorage,
//     clearStorage
// }
