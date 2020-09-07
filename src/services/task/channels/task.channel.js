export default function (app) {
  app.service('taks').publish(data => {
    return app.channel('everybody')
  })
}