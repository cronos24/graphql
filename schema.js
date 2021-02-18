const { gql, MockList  } = require('apollo-server-express')
const casual = require('casual');
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')


const typeDefs = gql`
"""Esto es un curso en el sistema"""
    type Curso {
        id: ID!
        titulo: String!
        """Esta es la descripción del curso"""
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "no creemos mas en los puntajes")
        comentarios: [Comentario]
    }

    type Profesor{
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos:[Curso]
    }

    enum Genero{
        MASCULINO
        FEMENINO
    }

    type Comentario{
        id:ID!
        nombre: String!
        cuerpo: String!
    }

    type Query{
        allCursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`

const resolvers = {
    Query:{
        //allCursos: ()=> Curso.query(),
        allCursos: ()=> Curso.query().eager('[profesor, comentarios]'),
        //profesores: () => Profesor.query(),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
        profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
    },
    // Curso: {
    //     profesor: () =>{
    //         return {
    //             nombre: 'Pablo',
    //             nacionalidad: 'Argentina'
    //         }
    //     },
    //     // comentarios: () =>{
    //     //     return [
    //     //         {
    //     //         nombre: 'Juan',
    //     //         cuerpo: 'Buen Video!'
    //     //         }
    //     //     ]            
    //     // }
    // }
}

const mocks = {
    Query: () =>({
        allCursos: [...new Array(casual.integer(6, 20))],

    }),

        Curso: () => {
            return {
              id: casual.uuid,
              titulo: casual.title,
              description: casual.text
            }
          },
    
    Profesor: () => {
      return {
        nombre: casual.name,
        nacionalidad: casual.country
      }
    },    
  }

module.exports = { typeDefs, resolvers, mocks }