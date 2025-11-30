/**
* This file is used to configure the Sanity CLI
*
* Read more:
* https://www.sanity.io/docs/cli-configuration
*/
import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './src/lib/sanity-client'


export default defineCliConfig({
 api: {
   projectId,
   dataset
 }
})
