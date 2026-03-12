import fastifyInstance, { PORT } from "./webServer"

fastifyInstance.listen({
  port: PORT
}, (err) => {
  err ? console.log(err) : console.log(`Server listening port ${PORT}`)
})