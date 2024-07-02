import React from 'react';
import GenerateInvoicesButton from '../components/GenerateInvoicesButton';
import InvoiceList from '../components/InvoiceList';
import Navbar from '../components/Navbar';
import MonthlyInvoiceList from '../components/MonthlyInvoiceList';

const InvoicePage = () => {
  return (
    <>
    <Navbar/>
    <div className='text-center text-4xl font-bold my-5'><h1>Invoice page</h1></div>
    <GenerateInvoicesButton/>
    <InvoiceList/>
    <MonthlyInvoiceList/>
    </>
  )
}

export default InvoicePage