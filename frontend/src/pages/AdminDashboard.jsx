import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents.js';
import { useAdminRegistrations, useAdminDeleteEvent } from '../hooks/useAdmin.js';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { LogOut, Trash2, Download } from 'lucide-react';
import { apiFetch } from '../lib/api.js';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data: events, refetch: refetchEvents } = useEvents({ limit: 100 });
  const { data: registrations } = useAdminRegistrations();
  const deleteMutation = useAdminDeleteEvent();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleExport = async () => {
    try {
      const blob = await apiFetch('/admin/registrations/export');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'registrations.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      alert('Export failed');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-text-muted text-sm font-medium mb-1">Total Events</div>
              <div className="text-3xl font-display font-bold text-amber-500">{events?.meta?.total || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-text-muted text-sm font-medium mb-1">Total Registrations</div>
              <div className="text-3xl font-display font-bold text-amber-500">{registrations?.meta?.total || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center border-b border-border pb-4">
            <h2 className="text-xl font-display font-bold">Manage Events</h2>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium text-text-muted">Name</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Date</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Category</th>
                  <th className="px-6 py-4 font-medium text-text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events?.data?.map(event => (
                  <tr key={event.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{event.name}</td>
                    <td className="px-6 py-4 font-mono text-xs">{new Date(event.startsAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4"><Badge>{event.category}</Badge></td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        onClick={() => {
                          if(confirm('Delete event?')) deleteMutation.mutate(event.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center border-b border-border pb-4">
            <h2 className="text-xl font-display font-bold">Recent Registrations</h2>
            <Button size="sm" variant="outline" onClick={handleExport} className="gap-2">
              <Download size={16} /> Export CSV
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium text-text-muted">Student</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Email</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Event</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {registrations?.data?.map(reg => (
                  <tr key={reg.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      {reg.name}
                      <div className="text-xs text-text-muted font-mono">{reg.collegeYear}</div>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{reg.email}</td>
                    <td className="px-6 py-4"><Badge variant="amber">{reg.event?.name}</Badge></td>
                    <td className="px-6 py-4 font-mono text-xs text-text-muted">{new Date(reg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
