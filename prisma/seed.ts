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
           slug: "orang-starktest-indonesia-testnet",
           saleDate: new Date(),
           contentReady: true,
           estimatedAPR: "32%",
           minterContract: "0x1258f0aee6c6f5f9c1eb1759406a9337f8c7ffaab08d7ed2488714ab20328d2",
           isDisplay: true,
           imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/001.jpg",
           network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "sea-starktest-kenya-testnet",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "22%",
          minterContract: "0x1607f07db4c365c374c157d1c894c2b53dd1b59ca5509f9f5821bdd1bfa0cb0",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/002.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "sunset-starktest-philippines-testnet",
          saleDate: new Date('2023-01-01T10:00:00.000Z'),
          contentReady: true,
          estimatedAPR: "26%",
          minterContract: "0x76e154be16af8ce835310b266b6ad855cdb870b8ae30982cb8805207ae65b2b",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/003.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "island-starktest-myanmar-testnet",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "30%",
          minterContract: "0x961273a46088a1ced82fbe025baf1c4a4be09fe9161e91fca995930bcb9c72",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/004.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "swamp-starktest-france-testnet",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "28%",
          minterContract: "0x46f26273cfb2e515f780933236137467168e9c6fe6955f71173d601c8879cc0",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/005.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "croco-starktest-uganda-testnet",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "25%",
          minterContract: "0x33d8f2fe121469866acd14a95c5de1be1eaa25128398774b838c31c628d1f59",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/006.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "jaguar-starktest-guatemala-testnet",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "32%",
          minterContract: "0x6beebdd53dbfbcd3d0b467e766f6d306f4944cb3acedb724ecfad6b0bd0d9ba",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/007.jpg",
          network: {
            connect: {
              id: "testnet"
            }
          }
        },
        {
          slug: "orang-starktest-indonesia-testnet2",
          saleDate: new Date(),
          contentReady: true,
          estimatedAPR: "27%",
          minterContract: "0x17f18647c2bfdd76085f789bc0afdc46f07eff290dbf6988b5e05a4e5e9c2db",
          isDisplay: true,
          imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/001.jpg",
          network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "sea-starktest-kenya-testnet2",
         saleDate: new Date(),
         contentReady: true,
         estimatedAPR: "24%",
         minterContract: "0x07139d08558283e3fbf6a398501c6601b24c224bad42279743b683aa1eaf6138",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/002.jpg",
         network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "sunset-starktest-philippines-testnet2",
         saleDate: new Date('2023-01-01T10:00:00.000Z'),
         contentReady: true,
         estimatedAPR: "31%",
         minterContract: "0x35c23b90a43057564d032510eb5140d3d3d56815f239f8f6e5b370a05a4423",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/003.jpg",
         network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "island-starktest-myanmar-testnet2",
         saleDate: new Date(),
         contentReady: true,
         estimatedAPR: "24%",
         minterContract: "0x4be5b86df29729e70a0a89aefe0d2d6181ad9717c59a6e3385c647dfb638bcf",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/004.jpg",
         network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "swamp-starktest-france-testnet2",
         saleDate: new Date(),
         contentReady: true,
         estimatedAPR: "24%",
         minterContract: "0x587048246f713242ad6047c5272b915ae2223340ec034f439cf76af44b67a92",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/005.jpg",
         network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "croco-starktest-uganda-testnet2",
         saleDate: new Date(),
         contentReady: true,
         estimatedAPR: "32%",
         minterContract: "0x463f015f8002cf62b050d84531b2c437b28073b0b9a5667d49e3544a6d7778f",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/006.jpg",
         network: {
           connect: {
             id: "testnet2"
           }
         }
       },
       {
         slug: "jaguar-starktest-guatemala-testnet2",
         saleDate: new Date(),
         contentReady: true,
         estimatedAPR: "30%",
         minterContract: "0x58577529e1c02649d8b3c08b0c351b16c308093483d8db58aa4516bfa1a43e4",
         isDisplay: true,
         imageIpfs: "bafybeibbweymszo4mjlkvxdoyieeq4svl4k2orovwi5nyybjwqvmfqdczy/007.jpg",
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
