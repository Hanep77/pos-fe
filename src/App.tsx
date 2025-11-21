import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { LayoutDashboard, SearchIcon, ShoppingCart } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/ui/input-group"

const models = [
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
  {
    name: "Cheese Burger",
    price: "Rp 10.000",
    image: "burger.png",
  },
]

function App() {
  return <div className="relative grid grid-cols-3 gap-4 min-h-screen max-w-screen-xl m-auto">
    <div className="flex w-full flex-col gap-4 col-span-2">
      <header className="h-16 flex items-center justify-between">
        <a href="/dashboard" className="flex gap-2"><LayoutDashboard /> Ke Dashboard</a>
        <div>
          <InputGroup>
            <InputGroupInput placeholder="Cari..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </header>
      <h2 className="text-2xl font-medium text-neutral-700">Pilih Barang</h2>
      <ItemGroup className="grid grid-cols-4 gap-4">
        {models.map((model) => (
          <Item key={model.name} className="bg-white">
            <ItemHeader>
              <img
                src={model.image}
                alt={model.name}
                className="rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.price}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>

    <div className="sticky top-0 bg-white h-screen p-4">
      <h4 className="text-lg font-medium text-neutral-700 flex gap-2"><ShoppingCart />Keranjang</h4>
    </div>
  </div>
}

export default App
