import * as fs from 'fs'

import { Octokit } from '@octokit/rest'
import stringify from 'csv-stringify/lib/sync'
import dotenv from 'dotenv'

dotenv.config()

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const owner = process.env.REPOSITORY_OWNER || ''
const repo = process.env.REPOSITORY_NAME || ''

const main = async () => {
  const data = await octokit.paginate('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
  })

  const filterData = data.filter((item) => !item.pull_request)
  const csvData = stringify(filterData, { header: true })

  fs.writeFileSync('./data.csv', csvData, { encoding: 'utf-8' })
  console.log(`${filterData.length} issue output to CSV file`)
}

main().catch((error) => {
  throw new Error(error)
})
