
export const dummyUsers = [
  { id: "1", username: "admin", role: "admin", password: "password" },
  { id: "2", username: "cashier", role: "cashier", password: "password" },
];

export const dummyProducts = [
  {
    id: "1",
    name: "Kopi Susu Gula Aren",
    price: 18000,
    stock: 50,
    is_active: true,
    image_url: "https://placehold.co/100",
  },
  {
    id: "2",
    name: "Americano",
    price: 15000,
    stock: 20,
    is_active: true,
    image_url: "https://placehold.co/100",
  },
  {
    id: "3",
    name: "Croissant",
    price: 25000,
    stock: 10,
    is_active: true,
    image_url: "https://placehold.co/100",
  },
  {
    id: "4",
    name: "Mineral Water",
    price: 5000,
    stock: 100,
    is_active: true,
    image_url: "https://placehold.co/100",
  },
  {
    id: "5",
    name: "Nasi Goreng",
    price: 30000,
    stock: 5,
    is_active: false,
    image_url: "https://placehold.co/100",
  },
];

export const dummyCustomers = [
  { id: "1", name: "Budi Santoso", phone: "081234567890", address: "Jl. Merdeka No. 1" },
  { id: "2", name: "Siti Aminah", phone: "081987654321", address: "Jl. Sudirman No. 45" },
  { id: "3", name: "John Doe", phone: "08122334455", address: "Jl. Thamrin No. 10" },
];

export const dummyTransactions = [
  {
    id: "1",
    date: "2023-10-26T10:00:00Z",
    customer_name: "Budi Santoso",
    total_amount: 36000,
    status: "completed",
    items: [
      { product_name: "Kopi Susu Gula Aren", quantity: 2, price: 18000 },
    ]
  },
  {
    id: "2",
    date: "2023-10-26T11:30:00Z",
    customer_name: "Siti Aminah",
    total_amount: 25000,
    status: "completed",
    items: [
       { product_name: "Croissant", quantity: 1, price: 25000 },
    ]
  }
];

export const dummySales = [
  { date: "2023-10-01", total: 1500000 },
  { date: "2023-10-02", total: 2300000 },
  { date: "2023-10-03", total: 1800000 },
  { date: "2023-10-04", total: 2500000 },
  { date: "2023-10-05", total: 2100000 },
  { date: "2023-10-06", total: 3000000 },
  { date: "2023-10-07", total: 2800000 },
];
