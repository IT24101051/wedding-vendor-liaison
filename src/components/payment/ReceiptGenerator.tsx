
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import { format } from "date-fns";

interface ReceiptProps {
  paymentId: string;
  customerName: string;
  vendorName: string;
  serviceName: string;
  amount: number;
  date: string;
  discountAmount?: number;
  promoCode?: string;
}

const ReceiptGenerator: React.FC<ReceiptProps> = ({
  paymentId,
  customerName,
  vendorName,
  serviceName,
  amount,
  date,
  discountAmount = 0,
  promoCode
}) => {
  const finalAmount = amount - discountAmount;
  const formattedDate = format(new Date(), "MMMM dd, yyyy");
  const receiptNumber = `RCPT-${paymentId.slice(0, 8)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Receipt downloaded as PDF");
  };

  return (
    <Card className="w-full receipt-card print:shadow-none print:border-none" id="receipt">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-center text-2xl">Payment Receipt</CardTitle>
        <div className="text-center text-sm text-gray-500">Wedding Vendor Liaison</div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <div className="text-sm text-gray-500">Receipt Number</div>
          <div className="font-semibold">{receiptNumber}</div>
          <div className="text-sm text-gray-500 mt-2">Date</div>
          <div>{formattedDate}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Customer</div>
            <div className="font-semibold">{customerName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Vendor</div>
            <div className="font-semibold">{vendorName}</div>
          </div>
        </div>

        <div className="border-t border-b py-4 my-4">
          <div className="flex justify-between mb-2">
            <div className="font-semibold">{serviceName}</div>
            <div>${amount.toFixed(2)}</div>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <div>Discount {promoCode && `(${promoCode})`}</div>
              <div>-${discountAmount.toFixed(2)}</div>
            </div>
          )}
          <div className="flex justify-between font-bold mt-4 text-lg">
            <div>Total</div>
            <div>${finalAmount.toFixed(2)}</div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>Thank you for your business!</p>
          <p className="mt-1">This is an official receipt for your records.</p>
        </div>

        <div className="flex justify-center space-x-4 mt-6 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownload} className="flex items-center bg-wedding-navy">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardContent>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt, #receipt * {
            visibility: visible;
          }
          #receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </Card>
  );
};

export default ReceiptGenerator;
