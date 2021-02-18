const casual = require('casual')

exports.seed = (knex) => {
  return knex('profesores').del().then(() => {
    const promises = Array(10).fill().map((_, i) => {
      return knex('profesores').insert([{
        nombre: casual.name,
        nacionalidad: casual.country,
        genero: casual.random_element(['MASCULINO', 'FEMENINO'])
      }])
    })

    return Promise.all(promises)
  })
}
