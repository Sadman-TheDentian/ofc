import {defineCliConfig} from 'sanity/cli'

// Go to https://www.sanity.io/manage and create a new project.
// Add your project ID here.
// You will also need to add it to src/lib/sanity.ts and sanity.config.ts.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset
  }
})
