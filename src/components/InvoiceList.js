// InvoiceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnpaidInvoices = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/invoices/unpaid-invoices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setInvoices(res.data.invoicelist);
        
      } catch (err) {
        navigate('/');
        console.error('Error fetching invoices:', err.response.data.message);
        toast.error('Error fetching invoices: ' + err.response.data.message);
      }
    };

    fetchUnpaidInvoices();
  }, [navigate]);

  const markInvoiceAsPaid = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/invoices/mark-invoice-paid/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setInvoices(invoices.filter(invoice => invoice._id !== id));
      toast.success('Invoice marked as paid');
    } catch (err) {
      console.error('Error marking invoice as paid:', err.response.data.message);
      toast.error('Error marking invoice as paid: ' + err.response.data.message);
    }
  };

  return (
    <div className="invoice-list-container p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Unpaid Invoices</h1>
      {invoices.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">Username</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">Month</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">Year</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">Amount</th>
              <th className="py-2 px-4 border-b bg-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice._id}>
                <td className="py-2 px-4 border-b">{invoice.username}</td>
                <td className="py-2 px-4 border-b">{invoice.month}</td>
                <td className="py-2 px-4 border-b">{invoice.year}</td>
                <td className="py-2 px-4 border-b">{invoice.amount}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => markInvoiceAsPaid(invoice._id)}
                  >
                    Paid Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No unpaid invoices for this month</p>
      )}
    </div>
  );
};

export default InvoiceList;
