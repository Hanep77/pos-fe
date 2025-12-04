import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { axiosPrivate } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditPelanggan() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axiosPrivate.get(`/customers/${id}`);
        const customer = response.data.data;
        setName(customer.name);
        setPhone(customer.phone);
        setAddress(customer.address);
      } catch (error) {
        console.error(error);
      }
    };
    getCustomer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(`/customers/${id}`, {
        name,
        phone,
        address,
      });
      navigate("/dashboard/pelanggan");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Pelanggan</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telepon</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Masukkan nomor telepon" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Masukkan alamat" />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/pelanggan")}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
