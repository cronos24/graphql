module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: `${__dirname}/db.sqlite`
  //   },
  //   useNullAsDefault: true
  // },

  development: {
    client: 'mysql',
    connection: {
      host : '192.168.0.16',
      user : 'erick',
      password : '123456',
      database : 'graphql'
    },   
  },

  production: {
    // Acá irían los datos para la conexión
    // en un ambiente de producción
  }

}
