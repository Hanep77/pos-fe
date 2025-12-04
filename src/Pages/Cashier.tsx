import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { LayoutDashboard, SearchIcon, ShoppingCart } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./../components/ui/input-group"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { axiosPrivate } from "@/lib/axios"

interface ItemType {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface CartItemType extends ItemType {
  quantity: number;
}

export default function Cashier() {
  const [items, setItems] = useState<ItemType[]>([])
  const [cart, setCart] = useState<CartItemType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const products = await axiosPrivate.get(`/products`);
        console.log(products)
        setItems(products.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, [])

  const filteredItems: ItemType[] = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem && existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== item.id)
      }
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    })
  }

  const total: number = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cart])

  return <div className="relative grid grid-cols-3 gap-4 min-h-screen max-w-screen-xl m-auto">
    <div className="flex w-full flex-col gap-4 col-span-2">
      <header className="h-16 flex items-center justify-between">
        <a href="/dashboard" className="flex gap-2"><LayoutDashboard /> Ke Dashboard</a>
        <div>
          <InputGroup>
            <InputGroupInput
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </header>
      <h2 className="text-2xl font-medium text-neutral-700">Pilih Barang</h2>
      <ItemGroup className="grid grid-cols-4 gap-4">
        {loading ? <p>Loading...</p> : filteredItems.map((model) => (
          <Item key={model.id} className="bg-white transition-all hover:shadow-md cursor-pointer" onClick={() => addToCart(model)}>
            <ItemHeader>
              <img
                src={model.image_url}
                alt={model.name}
                className="rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>Rp {model.price.toLocaleString()}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>

    <div className="sticky top-0 bg-white h-screen p-4 flex flex-col border-l">
      <h4 className="text-lg font-medium text-neutral-700 flex gap-2"><ShoppingCart />Keranjang</h4>
      <div className="flex flex-col gap-4 mt-4 flex-grow overflow-y-auto">
        {cart.length === 0 && <p className="text-neutral-500 text-center">Keranjang kosong</p>}
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-neutral-500">Rp {item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => removeFromCart(item)}>-</Button>
              <p>{item.quantity}</p>
              <Button variant="outline" size="sm" onClick={() => addToCart(item)}>+</Button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && <div className="flex flex-col gap-4 pt-4 border-t">
        <div className="flex justify-between">
          <p className="font-medium">Total</p>
          <p className="font-medium">Rp {total.toLocaleString()}</p>
        </div>
        <Button>Bayar</Button>
      </div>}
    </div>
  </div>
}

