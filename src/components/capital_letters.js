
export default function Mayusculas({ word }) {
    // Función que convierte la primera letra a mayúscula
    const mayusculas = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
  
    // Devuelve el valor de la palabra con la primera letra en mayúscula
    return mayusculas(word);
  }