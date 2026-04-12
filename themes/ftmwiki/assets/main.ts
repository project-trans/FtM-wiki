import './functions/header'
import './functions/anchor'
import './functions/content'
import { initSearch } from './functions/search'
import { ready } from './functions/_utils'

ready.then(initSearch)
