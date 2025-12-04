import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosPrivate } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditUser() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`);
        const user = response.data.data;
        setUsername(user.username);
        setRole(user.role);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData: { username: string; role: string; password?: string, image_url: string } = {
        username,
        role,
        image_url: "123"
      };
      if (password) {
        updatedData.password = password;
      }
      await axiosPrivate.put(`/users/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      navigate("/dashboard/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password (kosongkan jika tidak ingin diubah)</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password baru" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="cashier">Cashier</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/users")}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
