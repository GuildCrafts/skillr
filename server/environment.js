process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development'){
  require('dotenv').load()
}

if (process.env.NODE_ENV === 'test') {
  process.env.PORT = 3999
  process.env.GITHUB_CLIENT_ID = 'TEST__GITHUB_CLIENT_ID'
  process.env.GITHUB_CLIENT_SECRET = 'TEST__GITHUB_CLIENT_SECRET'
  process.env.GITHUB_CALLBACK = 'TEST__GITHUB_CALLBACK'
  process.env.SESSION_KEY = 'TEST__SESSION_KEY'
}
