import { Spanner } from '@google-cloud/spanner'

export async function start () {
  process.env.DEVMGR_FW_COMMON_PROJECT_NAME='macnica-mcp-devmgr-target'
  process.env.DEVMGR_FW_DEVREPO_NAME='dev-instance'
  process.env.DEVMGR_FW_DEVREPO_DB='devrepo'

  const spanner = new Spanner({ projectId: process.env.DEVMGR_FW_COMMON_PROJECT_NAME })

  const instance = spanner.instance(process.env.DEVMGR_FW_DEVREPO_NAME)
  const db = instance.database(process.env.DEVMGR_FW_DEVREPO_DB)

  const [rows] = await db.run({ sql: 'SELECT count(*) FROM device', params: {} })
  console.log(rows[0])

  process.exit(0)
}

start().catch((error) => {
  console.error('Failed to Start:', error)
  process.exit(1)
})
