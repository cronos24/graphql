const casual = require('casual')

exports.seed = (knex) => {
  return knex('comentarios').del().then(() => {
    const promises = Array(40).fill().map((_, id) => {
      return knex('comentarios').insert([{
        nombre: casual.name,
        cuerpo: casual.sentences(2),
        curso_id: casual.integer(1, 10)
      }])
    })

    return Promise.all(promises)
  })
}
