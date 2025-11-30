/**
* This file is used to configure the Sanity CLI
*
* Read more:
* https://www.sanity.io/docs/cli-configuration
*/
import { defineCliConfig } from 'sanity/cli'

const projectId = "9x2bbr6u";
const dataset = "production";

export default defineCliConfig({
 api: {
   projectId,
   dataset
 }
})
