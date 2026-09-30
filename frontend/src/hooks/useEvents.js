import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api.js';

export function useClubInfo() {
  return useQuery({
    queryKey: ['clubInfo'],
    queryFn: () => apiFetch('/club')
  });
}

export function useEvents(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => apiFetch(`/events?${query}`)
  });
}

export function useFeaturedEvent() {
  return useQuery({
    queryKey: ['featuredEvent'],
    queryFn: () => apiFetch('/events/featured')
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiFetch('/categories')
  });
}

export function useRegisterEvent() {
  return useMutation({
    mutationFn: ({ eventId, data }) => 
      apiFetch(`/events/${eventId}/register`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
  });
}
