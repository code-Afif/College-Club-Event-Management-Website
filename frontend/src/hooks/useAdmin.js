import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api.js';

export function useAdminLogin() {
  return useMutation({
    mutationFn: (credentials) => 
      apiFetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
  });
}

export function useAdminRegistrations(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  return useQuery({
    queryKey: ['adminRegistrations', filters],
    queryFn: () => apiFetch(`/admin/registrations?${query}`)
  });
}

export function useAdminCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => 
      apiFetch('/admin/events', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
  });
}

export function useAdminDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => 
      apiFetch(`/admin/events/${eventId}`, {
        method: 'DELETE'
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
  });
}

export function useAdminUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiFetch(`/admin/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
  });
}
