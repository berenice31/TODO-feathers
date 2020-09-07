export default function (app) {
  app.service('task').publish(data => {
    return app.channel('everybody')
  })
}