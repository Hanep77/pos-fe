import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { axiosPrivate } from "@/lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function TambahBarang() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    if (image) {
      formData.append("image", image);
    }
    formData.append("is_active", String(isActive));
    console.log(formData)

    try {
      await axiosPrivate.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard/barang");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tambah Barang</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Barang</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama barang" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Harga</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Masukkan harga" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stok</Label>
            <Input id="stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} placeholder="Masukkan stok" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Gambar</Label>
            <Input id="image" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
            <Label htmlFor="is_active">Aktif</Label>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/barang")}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
