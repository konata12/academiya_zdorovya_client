
// export const createFormData = <T extends Record<string, any>>(data: T) => {
//     const formData = new FormData()

//     for (const key in data) {
//         if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
//         const value = data[key];

//         // HANDLE FILES (with proper type guards)
//         if (typeof FileList !== 'undefined' && value instanceof FileList) {
//             Array.from(value).forEach((file: File) => {
//                 formData.append(key, file);
//             });
//         }
//         // HANDLE ARRAYS (with typed parameters)
//         else if (Array.isArray(value)) {
//             value.forEach((item: unknown) => {
//                 formData.append(key,
//                     (item && typeof item === 'object') ? JSON.stringify(item) : String(item)
//                 );
//             });
//         }
//         // OTHER TYPES (with proper type checks)
//         else {
//             formData.append(
//                 key,
//                 (typeof Blob !== 'undefined' && value instanceof Blob) ? value :
//                     (typeof value === 'object' && value !== null) ? JSON.stringify(value) :
//                         String(value)
//             );
//         }
//     }

//     return formData
// }



// if (value instanceof FileList) {
//     formData.append(key, value[0]) // Assuming you want to send the first file in the FileList
// } else if (Array.isArray(value)) {
//     value.forEach((item: any) => {
//         formData.append(`${key}`, item.value || item)
//     })
// } else {
//     formData.append(key, value)
// }