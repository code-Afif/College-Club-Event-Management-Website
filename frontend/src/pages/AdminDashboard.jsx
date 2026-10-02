import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents.js';
import { useAdminRegistrations, useAdminDeleteEvent } from '../hooks/useAdmin.js';
import { Button } from '../components/ui/Button.jsx';
import { LogOut, Trash2, Download, Plus } from 'lucide-react';
import { apiFetch } from '../lib/api.js';
import { CreateEventModal } from '../components/admin/CreateEventModal.jsx';
import { EditEventModal } from '../components/admin/EditEventModal.jsx';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data: events, refetch: refetchEvents } = useEvents({ limit: 100 });
  const { data: registrations } = useAdminRegistrations();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    <div className="min-h-[80vh] bg-surface-container-high w-full">
      <header className="bg-surface-container border-b border-outline-variant p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-label-mono text-label-mono text-outline hover:text-primary transition-none underline mr-2">
              [RETURN TO ROOT]
            </Link>
            <span className="font-label-mono text-label-mono text-primary-container bg-surface-container-low px-2 py-1 border border-outline-variant tracking-wider">
              [TELEMETRY]
            </span>
            <h1 className="text-xl font-headline font-bold uppercase text-primary">System Command</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-error text-error hover:bg-error hover:text-onError">
            <LogOut size={16} className="mr-2" /> DISCONNECT_SESSION
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* KPI Grid */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-outline-variant">
          <div className="border-r border-b border-outline-variant bg-surface-container-low p-space-lg flex flex-col justify-between">
            <div className="text-outline font-label-mono text-label-mono mb-2">// TOTAL_EVENTS</div>
            <div className="text-4xl font-headline font-bold text-primary">{events?.meta?.total || 0}</div>
          </div>
          <div className="border-r border-b border-outline-variant bg-surface-container-low p-space-lg flex flex-col justify-between">
            <div className="text-outline font-label-mono text-label-mono mb-2">// TOTAL_ALLOCATIONS</div>
            <div className="text-4xl font-headline font-bold text-primary">{registrations?.meta?.total || 0}</div>
          </div>
          <div className="border-r border-b border-outline-variant bg-surface-container-low p-space-lg flex flex-col justify-between">
            <div className="text-outline font-label-mono text-label-mono mb-2">// SYSTEM_STATUS</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 bg-primary-container animate-pulse"></span>
              <span className="font-label-mono text-label-mono text-primary-container font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="border border-outline-variant bg-surface-container-low">
          <div className="flex flex-row justify-between items-center border-b border-outline-variant p-4 bg-surface-container">
            <h2 className="text-xl font-headline font-bold uppercase text-primary">Active Operations</h2>
            <Button size="sm" variant="primary" onClick={() => setIsCreateModalOpen(true)} className="gap-2 font-label-mono text-label-mono">
              <Plus size={16} /> INITIALIZE_EVENT
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap font-label-mono">
              <thead className="bg-surface-container-lowest border-b border-outline-variant text-outline">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Operation_ID</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Classification</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Interrupt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {events?.data?.map(event => (
                  <tr key={event.id} className="hover:bg-surface-container transition-none text-on-surface">
                    <td className="px-6 py-4 font-bold text-primary">{event.name.toUpperCase()}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{new Date(event.startsAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-surface-container-highest border border-outline-variant text-xs">
                        {event.category.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-primary border border-primary px-2 py-1 hover:bg-primary hover:text-onPrimary transition-none uppercase mr-2"
                        onClick={() => setEventToEdit(event)}
                      >
                        [MOD]
                      </button>
                      <button 
                        className="text-error border border-error px-2 py-1 hover:bg-error hover:text-onError transition-none uppercase"
                        onClick={() => setEventToDelete(event)}
                      >
                        [SIGKILL]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="border border-outline-variant bg-surface-container-low">
          <div className="flex flex-row justify-between items-center border-b border-outline-variant p-4 bg-surface-container">
            <h2 className="text-xl font-headline font-bold uppercase text-primary">Allocation Registry</h2>
            <Button size="sm" variant="primary" onClick={handleExport} className="gap-2 font-label-mono text-label-mono">
              <Download size={16} /> DUMP_CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap font-label-mono">
              <thead className="bg-surface-container-lowest border-b border-outline-variant text-outline">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Node_Identity</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Address</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Target_Operation</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {registrations?.data?.map(reg => (
                  <tr key={reg.id} className="hover:bg-surface-container transition-none text-on-surface">
                    <td className="px-6 py-4">
                      <div className="font-bold">{reg.name.toUpperCase()}</div>
                      <div className="text-xs text-outline">{reg.collegeYear.toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{reg.email}</td>
                    <td className="px-6 py-4 text-primary">{reg.event?.name.toUpperCase()}</td>
                    <td className="px-6 py-4 text-outline">{new Date(reg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-high/90 backdrop-blur-sm">
          <div className="bg-surface-container-low border border-outline-variant p-6 max-w-sm w-full font-label-mono hard-shadow-dark">
            <div className="border-b border-outline-variant pb-2 mb-4">
              <h3 className="text-xl font-headline font-bold uppercase text-error">FATAL: DROP OPERATION</h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-6 font-body-md leading-relaxed">
              Confirm irrecoverable deletion of operation sequence: <br/>
              <span className="font-bold text-on-surface">"{eventToDelete.name.toUpperCase()}"</span>.<br/><br/>
              This process will unlink all associated allocations and cascade.
            </p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                className="hover:bg-surface-container"
                onClick={() => setEventToDelete(null)}
              >
                ABORT
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  deleteMutation.mutate(eventToDelete.id);
                  setEventToDelete(null);
                }}
              >
                EXEC_SIGKILL
              </Button>
            </div>
          </div>
        </div>
      )}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <EditEventModal 
        isOpen={!!eventToEdit} 
        onClose={() => setEventToEdit(null)}
        event={eventToEdit}
      />
    </div>
  );
}
