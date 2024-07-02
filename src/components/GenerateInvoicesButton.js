// GenerateInvoicesButton.jsx
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GenerateInvoicesButton = () => {
  const generateInvoices = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('/api/invoices/generate-invoices', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
    } catch (err) {
      console.error('Error generating invoices:', err.response.data.message);
      toast.error('Error generating invoices: ' + err.response.data.message);
    }
  };

  return (
    <div >
        <button className='px-8 py-4 bg-slate-300 rounded-br-md ml-7' onClick={generateInvoices}>Generate Invoices</button>
    </div>
  );
};

export default GenerateInvoicesButton;
