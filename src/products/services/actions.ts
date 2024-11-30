import { type Product, productApi } from "..";



interface GetProductOpction {
    filterKey?: string;
};

const sleep = ( seconds: number ):Promise<boolean> => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve( true );
        }, seconds * 1000 );
    })
}

export const getProducts = async ({ filterKey }: GetProductOpction): Promise<Product[]> => {

    await sleep(2);
    
    const filterUrl = ( filterKey ) ? `category=${ filterKey }` : '';
    
    const { data } = await productApi.get<Product[]>(`/products?${ filterUrl }`);

    return data;
};

export const getProductById= async ( id: number): Promise<Product> => {

    //await sleep(2);
    
    const { data } = await productApi.get<Product>(`/products/${ id }`);

    return data;
}