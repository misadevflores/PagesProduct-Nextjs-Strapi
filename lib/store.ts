export const getProductStore = () => {
    let product = localStorage.getItem('products')
    if (!product){
        return []
    }
    return JSON.parse(`${product}`);
}
export const  addProductStore = (product:any, q:any) => {
    product.cantidad = q;
    let productsStore = getProductStore();
    if (!productsStore) {
        localStorage.setItem('products', '[]')
    }
    const iStore = productsStore.findIndex((productStore:any) => productStore.id === product.id);
    
    if (iStore !== -1) {
      productsStore[iStore] = product;
    } else {
      productsStore.push(product)
    }
    localStorage.setItem('products', JSON.stringify(productsStore))
}

export const removeProductStore = (idProduct:any) => {
    const products = getProductStore();
    let _product = products.filter((product: any) => product.id != idProduct);
    localStorage.setItem('products', JSON.stringify(_product));
}

export const removeProductAllStore = () => {
    localStorage.setItem('products', '[]');
}
