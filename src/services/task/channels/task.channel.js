export default function (app) {
  app.service('tasks').publish(data => {
    return app.channel('everybody')
  })
}