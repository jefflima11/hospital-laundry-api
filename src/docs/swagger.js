import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação separada com YAML",
    },
    servers: [
      {
        url: "http://localhost:3005",
      },
    ],
  },
  // Aqui dizemos onde estão os arquivos com documentação
  apis: ["./src/docs/*.yaml"],
};