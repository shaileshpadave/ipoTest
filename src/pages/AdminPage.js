import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import IPODashboard from '../components/admin/IPODashboard';

const AdminPage = () => {
  return (
    <AdminLayout>
      <IPODashboard />
    </AdminLayout>
  );
};

export default AdminPage;