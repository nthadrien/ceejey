
export interface ShopProps {
    products: {
        reviews: any[];
        id: number;
        description: string;
        name: string;
        category: string;
        brand: string;
        features: string[];
        colors: {
            name: string;
            qty: number;
        }[];
        images: string[];
        price: number;
        relatedProducts: any[];
        discount?: number | undefined;
    }[],
    brands: string[],
    categories: string[]
}

export type SearchQueryType = {
    page: number;
    size: number;
    category: string;
    minP: number;
    maxP: number;
    promo?: string;
    sortby?:string;
}

export const initialQuery = {
    page : 0,
    size: 12,
    category: "none",
    minP : 1,
    maxP : 100
}