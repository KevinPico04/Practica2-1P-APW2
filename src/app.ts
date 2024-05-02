const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Función para insertar 10 elementos en la entidad transaccional
async function llenar() {
  try {
    const transacciones = [];
    for (let i = 0; i < 10; i++) {
      const transaccion = await prisma.controlDeIdioma.create({
        data: {
          estudiante: {
            create: {
              nombre: `Estudiante ${i}`,
              identificacion: `ID${i}`
            }
          },
          idioma: {
            create: {
              descripcion: `Idioma ${i}`
            }
          },
          porcentajeLectura: Math.floor(Math.random() * 100) + 1,
          porcentajeEscritura: Math.floor(Math.random() * 100) + 1,
          porcentajeEscuchar_hablar: Math.floor(Math.random() * 100) + 1
        }
      });
      transacciones.push(transaccion);
    }
    console.log('Transacciones creadas:', transacciones);
  } catch (error) {
    console.error('Error al llenar transacciones:', error);
  }
}

// Función para buscar una transacción por su ID
async function buscar(id: number) {
  try {
    const transaccion = await prisma.controlDeIdioma.findUnique({
      where: {
        id: id
      },
      include: {
        estudiante: true,
        idioma: true
      }
    });
    console.log('Transacción encontrada:', transaccion);
  } catch (error) {
    console.error('Error al buscar transacción:', error);
  }
}

// Función para consultar todos los elementos de la entidad transaccional
async function consultar() {
  try {
    const transacciones = await prisma.controlDeIdioma.findMany({
      include: {
        estudiante: true,
        idioma: true
      }
    });
    console.log('Transacciones consultadas:', transacciones);
  } catch (error) {
    console.error('Error al consultar transacciones:', error);
  }
}

// Ejecutar las funciones
async function main() {
  await llenar();
  await buscar(1); // Cambiar el ID según necesites
  await consultar();
  await prisma.$disconnect();
}

main();
