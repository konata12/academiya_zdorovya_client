// CHECK IF ASYNC THUNK FULLFILLED
export const fullfilled = (type: string) => {
    return type === 'fulfilled'
}

export const responseStatus = (status: string) => {
    switch (status) {
        case 'fulfilled':
            return 'fulfilled'
        
        case 'rejected':
            return 'rejected'
        
        case 'pending':
            return 'pending'
    
        default:
            break;
    }
}