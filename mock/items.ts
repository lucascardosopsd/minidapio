import { ItemProps } from "@/types/item";

export const items: ItemProps[] = [
  {
    id: 1,
    title: "Hamburguer Tradicional",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 10,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: true,
    active: true,
    sale: false,
    salePrice: undefined,
    categoryId: 1,
    restaurantId: 1,
  },
  {
    id: 2,
    title: "Item 2",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 5,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: true,
    active: true,
    sale: true,
    salePrice: 2,
    categoryId: 1,
    restaurantId: 1,
  },
  {
    id: 3,
    title: "Item 3",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 5,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: false,
    active: true,
    sale: false,
    salePrice: undefined,
    categoryId: 1,
    restaurantId: 1,
  },
  {
    id: 4,
    title: "Item 4",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 5,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: false,
    active: true,
    sale: true,
    salePrice: 2,
    categoryId: 1,
    restaurantId: 1,
  },
  {
    id: 5,
    title: "Item 4",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 5,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: false,
    active: true,
    sale: true,
    salePrice: 2,
    categoryId: 1,
    restaurantId: 1,
  },
];
