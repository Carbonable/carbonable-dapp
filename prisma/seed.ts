import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({ data: project });
    })
  ); 

  await Promise.all(
    getBadges().map((badge) => {
      return db.badges.create({ data: badge });
    })
  );



  getConfig().map((config) => {
    return db.simulatorConfig.create({ data: config });
  })
}

seed();

function getConfig() {
    return [
        {
            type: "global",
            config: {
                funding_fees: 10,
                resell_commission: 15,
                carbon_credit_price_per_ton: 12.75
            }
        },
        {
            type: "yield",
            config: {
                annual_growth: [
                    {
                        carbonable: [
                            {
                                type: "worst",
                                values: [12.75, 18.49, 26.8, 38.87, 56.35, 80.13, 113.93, 161.99, 230.34, 311.38, 420.94, 569.05, 769.27, 1039.93, 1405.84, 1900.48, 2569.17, 3473.14, 4695.17, 6208.75, 8210.25, 10856.98, 14356.92, 18985.14, 25105.35, 33198.52, 43900.68, 58052.87, 76767.29, 101514.63],
                            },
                            {
                                type: "base",
                                values: [12.75, 23.87, 44.67, 83.61, 156.5, 228.44, 333.45, 486.73, 710.47, 1022.08, 1470.35, 2115.25, 3042.99, 4377.63, 6297.64, 9059.77, 13033.35, 18749.73, 26973.29, 37088.28, 50996.38, 70120.02, 96415.03, 132570.67, 182284.67, 250641.42, 344631.95, 473868.93, 651569.78, 895908.45],
                            },
                            {
                                type: "best",
                                values: [12.75, 34.98, 95.97, 263.29, 722.35, 1098.1, 1669.28, 2537.58, 3857.53, 4978.9, 6426.26, 8294.35, 10705.5, 13817.57, 17834.3, 23018.7, 29710.18, 38346.86, 49494.2, 67642.07, 92444.16, 126340.36, 172665.16, 235975.71, 322500.14, 440750.19, 602358.59, 823223.41, 1125072, 1537598.4],
                            }
                        ]

                    },
                ]
            }
        },
        {
            type: "offset",
            config: {
                annual_growth: [
                    {
                        carbonable: [
                            {
                                type: "best",
                                values: [12.75, 18.49, 26.8, 38.87, 56.35, 80.13, 113.93, 161.99, 230.34, 311.38, 420.94, 569.05, 769.27, 1039.93, 1405.84, 1900.48, 2569.17, 3473.14, 4695.17, 6208.75, 8210.25, 10856.98, 14356.92, 18985.14, 25105.35, 33198.52, 43900.68, 58052.87, 76767.29, 101514.63],
                            },
                            {
                                type: "base",
                                values: [12.75, 23.87, 44.67, 83.61, 156.5, 228.44, 333.45, 486.73, 710.47, 1022.08, 1470.35, 2115.25, 3042.99, 4377.63, 6297.64, 9059.77, 13033.35, 18749.73, 26973.29, 37088.28, 50996.38, 70120.02, 96415.03, 132570.67, 182284.67, 250641.42, 344631.95, 473868.93, 651569.78, 895908.45],
                            },
                            {
                                type: "worst",
                                values: [12.75, 34.98, 95.97, 263.29, 722.35, 1098.1, 1669.28, 2537.58, 3857.53, 4978.9, 6426.26, 8294.35, 10705.5, 13817.57, 17834.3, 23018.7, 29710.18, 38346.86, 49494.2, 67642.07, 92444.16, 126340.36, 172665.16, 235975.71, 322500.14, 440750.19, 602358.59, 823223.41, 1125072, 1537598.4],
                            }
                        ]

                    },
                ]
            }
        }
    ]
}

function getProjects() {
    return [
        {
           name: "Banegas Farm",
           slug: "reforestation-banegas-farm-costa-rica",
           saleIsOpen: false,
           isSoldOut: true,
           saleDate: new Date('2022-06-21T16:45:01.246Z'),
           contentReady: true
        },
        {
            name: "Las delicias",
            slug: "mangroves-las-delicias-panama",
            saleIsOpen: true,
            isSoldOut: false,
            saleDate: new Date('2022-12-21T16:45:01.246Z'),
            contentReady: true
         },
         {
             name: "Chaco Agroforestry",
             slug: "agroforestry-chaco-paraguay",
             saleIsOpen: true,
             isSoldOut: false,
             saleDate: new Date('2023-01-21T16:45:01.246Z'),
             contentReady: false
          }
    ]
}


function getBadges() {
    return [
        {
            name: 'project1.png',
            title: 'Community Badge lvl-1',
            subtitle: 'Become a Carbonable OG',
            mintable: true,
            token_id: 2
        },
        {
            name: 'project2.png',
            title: '???',
            subtitle: '?',
            mintable: false,
            token_id: 0
        },
        {
            name: 'project3.png',
            title: '???',
            subtitle: '?',
            mintable: false,
            token_id: 1
        }
    ];
}
