import { defineCollection, z } from "astro:content";
//z -> zod; library for data validation & working with schemas

const pictureCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.number(),
    category: z.string(),
    title: z.string(),
    imageUrl: z.string(),
  }),
});

const albumCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    cover: z.string(),
  }),
});

export const collections = {
  picture: pictureCollection,
  allbum: albumCollection,
};
