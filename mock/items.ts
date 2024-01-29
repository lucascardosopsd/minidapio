interface ItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  highlight: boolean;
  active: boolean;
  sale: { newPrice: number };
  categoryId: number;
}

export const items: ItemProps[] = [
  {
    id: 1,
    title: "Item 1",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 10,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: true,
    active: true,
    sale: {
      newPrice: 8.99,
    },
    categoryId: 1,
  },
  {
    id: 2,
    title: "Item 2",
    description:
      "Irure velit irure occaecat amet velit aute quis. Duis commodo qui culpa et et dolor excepteur consectetur voluptate veniam dolor ut pariatur. Fugiat eiusmod magna sunt ex culpa.",
    price: 5,
    image: "https://i.imgur.com/PdzBxLb.png",
    highlight: false,
    active: true,
    sale: {
      newPrice: 0,
    },
    categoryId: 1,
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
    sale: {
      newPrice: 0,
    },
    categoryId: 1,
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
    sale: {
      newPrice: 0,
    },
    categoryId: 2,
  },
];
