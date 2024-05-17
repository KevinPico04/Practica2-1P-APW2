-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'PENDIENTE', 'ELIMINADO');

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idioma" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "Idioma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControlDeIdioma" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "idiomaId" INTEGER NOT NULL,
    "porcentajeLectura" INTEGER NOT NULL,
    "porcentajeEscritura" INTEGER NOT NULL,
    "porcentajeEscuchar_hablar" INTEGER NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "ControlDeIdioma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_identificacion_key" ON "Estudiante"("identificacion");

-- AddForeignKey
ALTER TABLE "ControlDeIdioma" ADD CONSTRAINT "ControlDeIdioma_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlDeIdioma" ADD CONSTRAINT "ControlDeIdioma_idiomaId_fkey" FOREIGN KEY ("idiomaId") REFERENCES "Idioma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
