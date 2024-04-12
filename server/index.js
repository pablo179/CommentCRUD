import app from './app.js'
import config from './config.js'

app.listen(config.port, () => {
    console.info(`\t-Server: \thttp://localhost:${config.port}`)
})