// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';


// 3. Define your collection(s)
export const blog = defineCollection({ 
   loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
   schema: z.object({
        title: z.string(),
        description: z.string().max(320),
        image: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        tags: z.array(z.string()),
        publishDate: z.date(), // e.g. 2024-09-17
        updatedDate: z.string().transform((str) => new Date(str)),
        author: z.string().default('Anonymous'),
        authorContact:  z.string().default('ceeyjey@mailbox.com'),
        relatedPosts: z.array(reference('blog')),
   })
});


export const products = defineCollection({
    loader: file("src/data/products/all-products.json", { parser: (text) => JSON.parse(text).products }),
    schema: z.object({
        id: z.number(),
        name: z.string(),
        category: z.string(),
        brand: z.string().default('ceejey'),
        description: z.string().max(300),
        features: z.array(z.string()),
        colors: z.array(z.object({ name: z.string() , qty: z.number() })),
        reviews: z.array(reference("reviews")),
        images:z.array(z.string()).min(2).max(4),
        price: z.number(),
        relatedProducts: z.array(reference("products")),
        discount: z.number().default(0).optional()
    })
});

export const reviews = defineCollection({
    loader: file("src/data/products/reviews.json", { parser: (text) => JSON.parse(text).reviews }),
    schema: z.object({
        id: z.number(),
        name: z.string(),
        productId: z.number(),
        rating: z.number().max(5),
        description: z.string().max(300),
        date :  z.string(),
    })
});

export const categories = defineCollection({
    loader: file("src/data/products/categories.json", { parser: (text) => JSON.parse(text).categories }),
    schema: z.object({
        id:z.string(),
        name: z.string(),
        description: z.string().max(300)
    })
});