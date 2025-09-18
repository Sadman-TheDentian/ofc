/**
 * This configuration is used to for the Sanity Studio that is mounted on the `/src/app/studio/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/manage and create a new project.
// Add your project ID here.
// You will also need to add it to src/lib/sanity.ts and sanity.cli.ts.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Define the schemas for your content types
const schemas = {
    types: [
        {
            name: 'post',
            title: 'Blog Post',
            type: 'document',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                {
                    name: 'slug',
                    title: 'Slug',
                    type: 'slug',
                    options: { source: 'title' }
                },
                {
                    name: 'author',
                    title: 'Author',
                    type: 'reference',
                    to: [{ type: 'author' }]
                },
                {
                    name: 'mainImage',
                    title: 'Main image',
                    type: 'image',
                    options: { hotspot: true }
                },
                {
                    name: 'categories',
                    title: 'Categories',
                    type: 'array',
                    of: [{ type: 'reference', to: { type: 'category' } }]
                },
                { name: 'publishedAt', title: 'Published at', type: 'datetime' },
                { name: 'excerpt', title: 'Excerpt', type: 'text', validation: (Rule: any) => Rule.max(200) },
                { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }
            ]
        },
        {
            name: 'caseStudy',
            title: 'Case Study',
            type: 'document',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                {
                    name: 'slug',
                    title: 'Slug',
                    type: 'slug',
                    options: { source: 'title' }
                },
                { name: 'summary', title: 'Summary', type: 'text' },
                { name: 'industry', title: 'Industry', type: 'string' },
                { name: 'outcome', title: 'Outcome', type: 'string' },
                {
                    name: 'mainImage',
                    title: 'Main image',
                    type: 'image',
                    options: { hotspot: true }
                },
                { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }
            ]
        },
        {
            name: 'author',
            title: 'Author',
            type: 'document',
            fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
            ]
        },
        {
            name: 'category',
            title: 'Category',
            type: 'document',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' }
            ]
        }
    ]
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: schemas,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool(),
  ],
})
