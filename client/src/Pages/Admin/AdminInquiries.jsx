import React, { useState, useEffect } from 'react';
import { inquiryAPI } from '../../services/api';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await inquiryAPI.getAllInquiries();
      setInquiries(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryAPI.updateInquiryStatus(id, newStatus);
      setInquiries(inquiries.map(inq => 
        inq._id === id ? { ...inq, status: newStatus } : inq
      ));
      alert('Status updated successfully!');
    } catch (error) {
      alert('Failed to update status');
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>
          <p className="mt-2 text-gray-600">{inquiries.length} total inquiries</p>
        </div>

        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{inquiry.productName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    From: {inquiry.userName} ({inquiry.userEmail})
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    inquiry.status === 'replied' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-700">{inquiry.message}</p>
              </div>
            </div>
          ))}

          {inquiries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No inquiries yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;