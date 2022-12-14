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
           minterContract: "0x01258f0aee6c6f5f9c1eb1759406a9337f8c7ffaab08d7ed2488714ab20328d2",
           projectContract: "0x030f5a9fbcf76e2171e49435f4d6524411231f257a1b28f517cf52f82279c06b",
           paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
           yielderContract: "0x02d24decb1e47a78bd1a8042d7b4f800889ebfaecaea16a60800e19021f56ea8",
           offseterContract: "0x01c0a25a7ead6d3a115f9a38d0e10d84916fe53a4a038af875cd2fd8d13002f6",
           vesterContract: "0x023407fe2962a16692b1239159137886e888a8a5709313f72bea0b3518d3fea5",
           paymentTokenDecimals: 18,
           paymentTokenSymbol: "ETH",
           unitPrice: 720000000000000000,
           maxSupplyForMint: 15,
           maxBuyPerTx: 5,
           whitelistedSaleOpen: false,
           publicSaleOpen: true,
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
          minterContract: "0x01607f07db4c365c374c157d1c894c2b53dd1b59ca5509f9f5821bdd1bfa0cb0",
          projectContract: "0x05a85cf2c715955a5d8971e01d1d98e04c31d919b6d59824efb32cc72ae90e63",
          paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          yielderContract: "0x05d111e5be6a71f11949f20450ba436d2e04789a9e8a3caed0e78444f74c9ef7",
          offseterContract: "0x027476cd4bcac6c3a8428dc258acac7e7ccd765aabcc366fe4fb37e6b3fe0987",
          vesterContract: "0x07aa454887b454d69c352c80f2067426b26b1af4f6b17f2141773fbe65d16d0c",
          paymentTokenDecimals: 18,
          paymentTokenSymbol: "ETH",
          unitPrice: 5000000000000000,
          maxSupplyForMint: 1500000,
          maxBuyPerTx: 5,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
          minterContract: "0x076e154be16af8ce835310b266b6ad855cdb870b8ae30982cb8805207ae65b2b",
          projectContract: "0x022ddbb66fabf9ae859de95c499839ff46362128908d5e3d0842368aef8beb31",
          paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          yielderContract: "0x04880a9e4fcb1047e53b2945ec02a2fdf5ccc5c7a7111edd396a536a7fbfec20",
          offseterContract: "0x0300d90aeb387744ee804ded3e698b29bca248a55faffe9899208150f5905298",
          vesterContract: "0x01f899dd56e3404bd4413174ad0984c4b91477886416ce1468d4edae2c0111b5",
          paymentTokenDecimals: 18,
          paymentTokenSymbol: "ETH",
          unitPrice: 1010000000000000000,
          maxSupplyForMint: 4000,
          maxBuyPerTx: 100,
          whitelistedSaleOpen: false,
          publicSaleOpen: false,
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
          minterContract: "0x00961273a46088a1ced82fbe025baf1c4a4be09fe9161e91fca995930bcb9c72",
          projectContract: "0x003d062b797ca97c2302bfdd0e9b687548771eda981d417faace4f6913ed8f2a",
          paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          yielderContract: "0x05402954a4ac9ca517fd2c7780f8dbb9cc9e33d6b0a25704b9e77587e09f4550",
          offseterContract: "0x06f8e172d9f2b2874dcba484b2a4cd94c77e0aa4bd0ae56f6bbe8c614dde0320",
          vesterContract: "0x03c192da2e503bee6ccb80db66ad322b777ec9a73ce8971781a440e51148685b",
          paymentTokenDecimals: 18,
          paymentTokenSymbol: "ETH",
          unitPrice: 340000000000000000,
          maxSupplyForMint: 10,
          maxBuyPerTx: 10,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
          minterContract: "0x046f26273cfb2e515f780933236137467168e9c6fe6955f71173d601c8879cc0",
          projectContract: "0x021f433090908c2e7a6672cdbc327f49ac11bcc922611620c2c4e0d915a83382",
          paymentContract: "0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          yielderContract: "0x01cb9f6631e4ab99a096c68a42e21cfd0a63395e6cf930dde95d443ea327ebf4",
          offseterContract: "0x00766d886ab5540efcf5a2acf61ca0ef15123fdee4fb37fc76b72cddffdbadb4",
          vesterContract: "0x0552f54f4d87738d927aaa55d778bc037886a00a552119562f56e20953d7543c",
          paymentTokenDecimals: 18,
          paymentTokenSymbol: "DAI",
          unitPrice: 300000000000000000,
          maxSupplyForMint: 5,
          maxBuyPerTx: 2,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
          minterContract: "0x033d8f2fe121469866acd14a95c5de1be1eaa25128398774b838c31c628d1f59",
          projectContract: "0x028c87a966e2f1166ba7fa8ae1cd89b47e13abcc676e5f7c508145751bbb7f15",
          paymentContract: "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426",
          yielderContract: "0x06fc054685ef09ae700321c1ea8311b7041445e62f52e844ea64939b07b82386",
          offseterContract: "0x04b9f054e5c83a6539cd007afd930d6e3e7b6773c638f1f0df18a1f15de97357",
          vesterContract: "0x02becfe0ffc39befc016b726e035765a207fb201d2dcaf7310cbe1f9ce5f3833",
          paymentTokenDecimals: 6,
          paymentTokenSymbol: "USDC",
          unitPrice: 100000000000000000,
          maxSupplyForMint: 100000,
          maxBuyPerTx: 10,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
          minterContract: "0x06beebdd53dbfbcd3d0b467e766f6d306f4944cb3acedb724ecfad6b0bd0d9ba",
          projectContract: "0x05c30f6043246a0c4e45a0316806e053e63746fba3584e1f4fc1d4e7f5300acf",
          paymentContract: "0x0386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a",
          yielderContract: "0x0346df7da167c2c45e9070cafe4e11feff02c16806c7b0f4fbfa93a6637855b1",
          offseterContract: "0x0442ca58dea2fbfbbff9cf51b0b994e46157e153c152a4f263f85d059fc75505",
          vesterContract: "0x03cca15cb20b36ed7fc7d8af1fa74683e04af6d8fb7a82911367b167b3bd1f98",
          paymentTokenDecimals: 6,
          paymentTokenSymbol: "USDT",
          unitPrice: 12100000000000000000,
          maxSupplyForMint: 10000,
          maxBuyPerTx: 5,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
          estimatedAPR: "32%",
          minterContract: "0x017f18647c2bfdd76085f789bc0afdc46f07eff290dbf6988b5e05a4e5e9c2db",
          projectContract: "0x010d39235d5881ac0f990806dbad0e50bf7bee5dcebea5d707fdb8b75e0e9dd4",
          paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          yielderContract: "0x00a306c44f54e4a212726d790ccb39de802bb342ce52273016ef09eca77b05d3",
          offseterContract: "0x020d96f9bb89c5a1d365f20e2f4299744d26260810f38f4f1b69828f33e9a1d8",
          vesterContract: "0x038e33fa47da2d8c406e50c507afbeeebeed21c793a124dbe8f5ef3799947077",
          paymentTokenDecimals: 18,
          paymentTokenSymbol: "ETH",
          unitPrice: 720000000000000000,
          maxSupplyForMint: 15,
          maxBuyPerTx: 5,
          whitelistedSaleOpen: false,
          publicSaleOpen: true,
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
         estimatedAPR: "22%",
         minterContract: "0x07139d08558283e3fbf6a398501c6601b24c224bad42279743b683aa1eaf6138",
         projectContract: "0x078db20cd687d0c7df1f79f3ce2a3958cebcdc53f1cb560f53948169e8f4f658",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x01629d6929706266cff66ecd00c5ef0d7c747fa76bdc8211f7e14e00cb722a33",
         offseterContract: "0x01b36b39fa2c8cfa01958174eaba18cb09c30600f74b5ff9de2548cc8820df3a",
         vesterContract: "0x078f76c539fce3db85bb28cfabe4895e3565a98b0d99d50b471219df8f195db0",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 5000000000000000,
         maxSupplyForMint: 1500000,
         maxBuyPerTx: 5,
         whitelistedSaleOpen: false,
         publicSaleOpen: true,
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
         estimatedAPR: "26%",
         minterContract: "0x0035c23b90a43057564d032510eb5140d3d3d56815f239f8f6e5b370a05a4423",
         projectContract: "0x02bb0e0d66332e928c9d03f1f79c6f2062431c543eded5be76d38b28a9d118a9",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x01e41bc786b31978868d89e75fb6fc522767a9259831f65ad0f9fb0c78b2fcf7",
         offseterContract: "0x0699fff3dcdc58e25103d8d44bde5026fa7c626b7dd16ac97fe39751af4a9717",
         vesterContract: "0x04bf1a522f99af9dfb09eae6a88d08488bb1f4e14376ff1d4405989ebbaab08c",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 1010000000000000000,
         maxSupplyForMint: 4000,
         maxBuyPerTx: 100,
         whitelistedSaleOpen: false,
         publicSaleOpen: false,
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
         estimatedAPR: "30%",
         minterContract: "0x04be5b86df29729e70a0a89aefe0d2d6181ad9717c59a6e3385c647dfb638bcf",
         projectContract: "0x00f26f5a6d0e9bc3db3b84a3821e1c6700c87e0b7d8cde35d90c296f99951a15",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x062d3310cce097d0a269cbe47fab4296798f757af91041ff2b37e880e09c1c3b",
         offseterContract: "0x077eb313ea432d600a504d69aedc986b9a5e6a6adc29032405b8bb40f6151e89",
         vesterContract: "0x02619b9b8fa540629f480df6283aa4e11c0cea6d5dda98f61de39c678f7a44ff",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 340000000000000000,
         maxSupplyForMint: 10,
         maxBuyPerTx: 10,
         whitelistedSaleOpen: false,
         publicSaleOpen: true,
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
         estimatedAPR: "28%",
         minterContract: "0x0587048246f713242ad6047c5272b915ae2223340ec034f439cf76af44b67a92",
         projectContract: "0x015022d389f4d7d4adeb604dc836a6986ddf97efaa20cb57f4a3183a43af31ac",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x027170e614ec9a4d835e88f7935523ef0d5d3d56b217843955507ac855dd77fb",
         offseterContract: "0x04b60bbcf19d1c9b4b694b0ac1fce69b8693c9cd76230d2cc491e0d006b2410d",
         vesterContract: "0x016b4b0a288cc325c55c012bbed54441fe79e819017a9c31443a44d70da09f61",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 300000000000000000,
         maxSupplyForMint: 5,
         maxBuyPerTx: 2,
         whitelistedSaleOpen: false,
         publicSaleOpen: true,
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
         estimatedAPR: "25%",
         minterContract: "0x0463f015f8002cf62b050d84531b2c437b28073b0b9a5667d49e3544a6d7778f",
         projectContract: "0x00d85529191c7b08d0ded2faa83cc1ad9c93fa51a4f639df606fa0c2b2f43492",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x070f55f21f860aaabb7ced3d16b828ccb953bb48252f523ffcac57f965580cbd",
         offseterContract: "0x030bfb8263277324a84ad544de8a3e4707cdcb2341b395193e91cfec7f253143",
         vesterContract: "0x04e017932b50ec13aa6c843d2bbc871801fda1eea1b24afcb843c5a40c01c9ef",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 100000000000000000,
         maxSupplyForMint: 100000,
         maxBuyPerTx: 10,
         whitelistedSaleOpen: false,
         publicSaleOpen: true,
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
         estimatedAPR: "32%",
         minterContract: "0x058577529e1c02649d8b3c08b0c351b16c308093483d8db58aa4516bfa1a43e4",
         projectContract: "0x05d8ec640486724d6e8fdaa34be94368ef8331e38824378c1e5e8dd96ced6d3a",
         paymentContract: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
         yielderContract: "0x0495b63f7bbdd3e69c243f7685d42ffde141e106b15b5ae17de1ffceaa3a19be",
         offseterContract: "0x031655151167b05ee47ca50f392125165b877dfb2b56394aea56db9ebb5b3c09",
         vesterContract: "0x02c67c21bc8ff60c42c5141ce03f892b574a01213962dbe90892180a91fae692",
         paymentTokenDecimals: 18,
         paymentTokenSymbol: "ETH",
         unitPrice: 12100000000000000000,
         maxSupplyForMint: 10000,
         maxBuyPerTx: 5,
         whitelistedSaleOpen: false,
         publicSaleOpen: true,
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
