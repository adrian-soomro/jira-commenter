import * as fs from 'fs'
import { setupTaskMockRunner } from './testUtils'

const inputParams = JSON.parse(fs.readFileSync('../tmp/testData.json', 'utf8'))

setupTaskMockRunner(...inputParams)
