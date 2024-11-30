import { type Product, productApi } from "..";



interface GetProductOpction {
    filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductOpction) => {
    
    const { data } = await productApi.get<Product[]>('/products');

    return data;
}