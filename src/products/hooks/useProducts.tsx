import { useQuery } from "@tanstack/react-query";
import { productActions } from "..";

interface Options {
    filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {

    const { isLoading, isError, error, data: products = [], isFetching } = useQuery({
        queryKey: ['products', { filterKey }],
        queryFn: () => productActions.getProducts({ filterKey }),
        staleTime: 100 * 60 * 60,
    })

    return {
        error,
        isError,
        isLoading,
        isFetching,
        products,
    }
}
