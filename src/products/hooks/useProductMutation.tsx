import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";


export const useProductMutation = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: productActions.createProduct,

        onMutate: (product) => {
            console.log('Mutando - Optimistic update');

            // Optimistic Product
            const optimisticProduct = { id: Math.random(), ...product };
            console.log({optimisticProduct});

            // Almacenar el producto en el cache del query client
            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }],
                (old) => {
                    if ( !old ) return [optimisticProduct];

                    return [...old, optimisticProduct];
                }
            )
        },

        onSuccess: (product) => {
            // queryClient.invalidateQueries({
            //     queryKey: ['products', { 'filterKey': product.category }]
            // })

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }],
                (old) => {
                    if ( !old ) return [product];

                    return [...old, product];
                }
            )

        },
    });


    return {
        mutation,
    };
}
