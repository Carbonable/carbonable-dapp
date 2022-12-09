import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {

  await Promise.all(
    getNetworks().map((network) => {
      return db.network.create({ data: network });
    })
  );
  await Promise.all(
    getProjects().map((project) => {
      return db.project.create({ data: project });
    })
  );
}

seed();

function getProjects() {
    return [
        {
           slug: "reforestation-banegas-farm-costa-rica",
           saleDate: new Date('2022-06-21T16:45:01.246Z'),
           contentReady: true,
           estimatedAPR: "51%",
           minterContract: "0x92ed628b37d4f49702fb5e3c4328abc698f0c15bfc93049a19d649aa73531e",
           isDisplay: true,
           network: {
            connect: {
              id: "testnet2"
            }
          }
        },
        {
            slug: "mangroves-las-delicias-panama",
            saleDate: new Date('2022-12-21T16:45:01.246Z'),
            contentReady: true,
            estimatedAPR: "51%",
            minterContract: "0x014a91ee40db7b8568ce12abb7d6097272021f2c8f629cdcb39a0ac7ee33b61c",
            isDisplay: false,
            network: {
              connect: {
                id: "testnet2"
              }
            }
         },
         {
             slug: "agroforestry-chaco-paraguay",
             saleDate: new Date('2023-01-21T16:45:01.246Z'),
             contentReady: true,
             estimatedAPR: "51%",
             minterContract: "0x075b32e934b5f47eba8ab4b7461565db6abe11144642a5bc172cb092fc5cffea",
             isDisplay: false,
             network: {
              connect: {
                id: "testnet2"
              }
            }
          }
    ]
}

function getNetworks() {
  return [
      {
        id: "testnet",
        name: "Testnet",
        chainId: "0x534e5f474f45524c49",
        nodeUrl: "https://alpha4.starknet.io",
        isDefault: false,
        order: 1
      },
      {
        id: "testnet2",
        name: "Testnet 2",
        chainId: "0x534e5f474f45524c4932",
        nodeUrl: "https://alpha4-2.starknet.io",
        isDefault: true,
        order: 2
       },
       {
        id: "mainnet",
        name: "Mainnet",
        chainId: "0x534e5f4d41494e",
        nodeUrl: "https://alpha-mainnet.starknet.io",
        isDefault: false,
        order: 3
      }
  ]
}
