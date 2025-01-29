import { app } from './app'
import { ENV } from './env'

app.listen(ENV.PORT, ENV.HOST, () => console.log(`Server is running on port ${ENV.PORT}`))