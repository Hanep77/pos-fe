import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { LayoutDashboard, LogOut, SearchIcon, ShoppingCart } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./../components/ui/input-group"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { axiosPrivate } from "@/lib/axios"
import { useUserContext } from "@/context/userContext"
import { useNavigate } from "react-router"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

interface ItemType {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface CartItemType extends ItemType {
  qty: number;
}

interface Customer {
  id: number;
  name: string;
}

export default function Cashier() {
  const [items, setItems] = useState<ItemType[]>([])
  const [cart, setCart] = useState<CartItemType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { setToken, user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false)

  // New states for payment and customer
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customerType, setCustomerType] = useState("existing")
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>()
  const [newCustomerName, setNewCustomerName] = useState("")


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const productsPromise = axiosPrivate.get(`/products-active`);
        const customersPromise = axiosPrivate.get('/customers');

        const [productsRes, customersRes] = await Promise.all([productsPromise, customersPromise]);

        setItems(productsRes.data.data);
        setCustomers(customersRes.data.data);
      } catch (error) {
        console.error(error);
        // TODO: Add user-facing error handling
      } finally {
        setLoading(false)
      }
    }
    getData();
  }, [])

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  }

  const filteredItems: ItemType[] = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (item: ItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem && existingItem.qty === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== item.id)
      }
      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: cartItem.qty - 1 }
          : cartItem
      )
    })
  }

  const total: number = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  }, [cart])

  const handleBayar = async () => {
    if (customerType === 'new' && newCustomerName.trim() === "") {
      alert("Silakan masukkan nama pelanggan baru.");
      return;
    }

    const payload = {
      items: cart.map(item => ({ id_product: item.id, qty: item.qty })),
      payment_method: paymentMethod,
      id_customer: customerType === 'existing' ? selectedCustomer : null,
    };

    console.log(JSON.stringify(payload));

    try {
      setLoadingPayment(true);
      await axiosPrivate.post('/cashier/transactions', payload);
      alert("Transaksi berhasil!");
      // Reset state
      setCart([]);
      setSelectedCustomer(undefined);
      setNewCustomerName("");
      setPaymentMethod("cash");
    } catch (error) {
      console.error("Payment failed", error);
      alert("Transaksi gagal. Silakan coba lagi.");
    } finally {
      setLoadingPayment(false);
    }
  }


  return <div className="relative grid grid-cols-3 gap-4 min-h-screen max-w-screen-xl m-auto">
    <div className="flex w-full flex-col gap-4 col-span-2">
      <header className="h-16 flex items-center justify-between">
        {user?.role == "admin" ?
          <a href="/dashboard" className="flex gap-2"><LayoutDashboard /> Ke Dashboard</a> :
          <button
            onClick={handleLogout}
            className="flex items-center px-2 py-2 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        }
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
              <p>{item.qty}</p>
              <Button variant="outline" size="sm" onClick={() => addToCart(item)}>+</Button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && <div className="flex flex-col gap-4 pt-4 border-t">
        <div className="grid gap-4">
          {/* Customer Selection */}
          <div className="grid gap-2">
            <Label>Pelanggan</Label>
            <RadioGroup defaultValue="existing" value={customerType} onValueChange={setCustomerType} className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="r1" />
                <Label htmlFor="r1">Sudah Ada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="r2" />
                <Label htmlFor="r2">Baru</Label>
              </div>
            </RadioGroup>
            {customerType === 'existing' ? (
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pelanggan" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={String(customer.id)}>{customer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Masukkan nama pelanggan baru"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
              />
            )}
          </div>

          {/* Payment Method */}
          <div className="grid gap-2">
            <Label htmlFor="payment-method">Metode Pembayaran</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Pilih metode pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">Total</p>
          <p className="font-medium">Rp {total.toLocaleString()}</p>
        </div>
        <Button onClick={handleBayar} disabled={loadingPayment}>
          {loadingPayment ? "Memproses..." : "Bayar"}
        </Button>
      </div>}
    </div>
  </div>
}

