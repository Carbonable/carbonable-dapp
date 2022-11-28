import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({ data: project });
    })
  );
}

seed();

function getProjects() {
    return [
        {
           name: "Banegas Farm",
           slug: "reforestation-banegas-farm-costa-rica",
           saleIsOpen: false,
           isSoldOut: true,
           saleDate: new Date('2022-06-21T16:45:01.246Z'),
           contentReady: true,
           estimatedAPR: "51%"
        },
        {
            name: "Las delicias",
            slug: "mangroves-las-delicias-panama",
            saleIsOpen: true,
            isSoldOut: false,
            saleDate: new Date('2022-12-21T16:45:01.246Z'),
            contentReady: true,
            estimatedAPR: "51%"
         },
         {
             name: "Chaco Agroforestry",
             slug: "agroforestry-chaco-paraguay",
             saleIsOpen: false,
             isSoldOut: false,
             saleDate: new Date('2023-01-21T16:45:01.246Z'),
             contentReady: false,
             estimatedAPR: "51%"
          }
    ]
}
