import { RestaurantProps } from "@/types/restaurant";

export const restaurants: RestaurantProps[] = [
  {
    id: 1,
    title: "Restaurante 1",
    active: true,
    whatsapp: "(00)00000-0000",
    landline: "(00)00000-0000",
    address: "Rua exemplo da silva, 123. Centro. São Paulo-SP",
    methods: {
      bankCheck: false,
      cash: true,
      credit: true,
      debit: true,
      pix: true,
    },
    workHours: [
      {
        weekDay: 0,
        opened: false,
        times: [],
      },
      {
        weekDay: 1,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
          {
            open: "17:00",
            close: "23:00",
          },
        ],
      },
      {
        weekDay: 2,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
        ],
      },
      {
        weekDay: 3,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
          {
            open: "17:00",
            close: "23:00",
          },
        ],
      },
      {
        weekDay: 4,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
          {
            open: "17:00",
            close: "23:00",
          },
        ],
      },
      {
        weekDay: 5,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
          {
            open: "17:00",
            close: "23:00",
          },
        ],
      },
      {
        weekDay: 6,
        opened: true,
        times: [
          {
            open: "08:00",
            close: "12:00",
          },
          {
            open: "17:00",
            close: "23:00",
          },
        ],
      },
    ],
    logo: "https://i.imgur.com/7jkiMQN.png",
    color: "#fc0330",
    linkMaps: "/",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus ante sed ligula efficitur, ac consequat odio vestibulum. In hac habitasse platea dictumst",
    activeMenu: true,
    slug: "restaurant-1",
    createdAt: "2014-06-26 04:07:31",
    updatedAt: "2014-06-27 04:07:31",
    userId: 80,
  },
];
