import baseHttp from './baseHttp'

export const productService = (payload: object) => baseHttp('POST', 'product', payload);
export const loadCategoryService = () => baseHttp('GET', 'category');
export const loadProductService = (payload: any) => baseHttp('GET', 'product/' + payload.id);
export const updateProductService = ({id, ...otherProps}: any) => baseHttp('POST', 'product/' + id, otherProps);
export const deleteProductService = (id: string) => baseHttp('DELETE', 'product/' + id);
