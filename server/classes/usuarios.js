//defino una clase de usuarios que se va a encargar de controlar 
//a todos los usuarios

class Usuarios {

   //Inicializo en el constructor un arreglo (vacio)
   //lo cual quiere decir que personas siempre será un array
   constructor() {
      this.personas = [];
   }

   //método para agregar personas
   agregarPersona(id, nombre, sala) {
      let persona = {
         id: id,
         nombre: nombre,
         sala: sala
      }
      this.personas.push(persona);

      return this.personas;
   }
   //método para devolver personas por el id(comparando el id del arreglo)
   getPersona(id) {
      let persona = this.personas.filter(persona =>{
         return persona.id === id
      })[0];

      return persona;
   
   }
   //método para devolver a todas las personas
   getPersonas(){
      return this.personas;
   }
   
   
   getPersonasPorSala(sala){
      let personasEnSala = this.personas.filter(persona => persona.sala === sala);
/* 
      la funcion anterior es el resumen de persona =>{
         return persona.sala === sala
      } */

      return personasEnSala;
   }


   //método para borrar personas
   borrarPersona(id){

      let personaBorrada = this.getPersona(id);

      this.personas = this.personas.filter( persona => persona.id != id);

      return personaBorrada;
   }



}

module.exports = {
   Usuarios
}