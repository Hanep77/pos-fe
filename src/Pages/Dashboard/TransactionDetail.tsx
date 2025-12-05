import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosPrivate } from "@/lib/axios";
import { ArrowLeft } from "lucide-react";

type TransactionItemType = {
  id: string;
  id_transaction: string;
  id_product: string;
  qty: number;
  price: number;
  subtotal: number;
  product_name: string;
};

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const [transactionItems, setTransactionItems] = useState<TransactionItemType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/transactions/${id}/details`);
        setTransactionItems(response.data.data);
      } catch (err) {
        setError("Failed to fetch transaction details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading transaction details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!transactionItems || transactionItems.length === 0) {
    return <div className="p-6">No details found for this transaction.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Detail Transaksi #{id}</h1>
        <Link to="/dashboard/laporan-penjualan" className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
          <ArrowLeft size={20} />
          <span>Kembali ke Laporan Penjualan</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga Satuan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {item.subtotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
