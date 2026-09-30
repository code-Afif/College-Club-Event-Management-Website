import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents, useCategories } from '../hooks/useEvents.js';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { RegisterModal } from '../components/registration/RegisterModal.jsx';
import { Search, Calendar, MapPin, Users } from 'lucide-react';

export function EventsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: categories } = useCategories();
  const { data, isLoading, isError } = useEvents({ 
    search: debouncedSearch, 
    category,
    limit: 50 // simplistic pagination for now
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">The Menu</h1>
        <p className="text-text-muted text-lg max-w-2xl">Browse our complete selection of upcoming and past events. Grab a seat before they're gone.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-3.5 text-text-muted w-5 h-5" />
          <Input 
            className="pl-12" 
            placeholder="Search events..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <button 
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-amber-500 text-stone-950' : 'bg-surface hover:bg-surface-hover border border-border'}`}
          >
            All
          </button>
          {categories?.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c === category ? '' : c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-amber-500 text-stone-950' : 'bg-surface hover:bg-surface-hover border border-border'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-surface-hover"></div>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load events. Please try again later.
        </div>
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">No events found matching your criteria.</p>
        </div>
      )}

      <motion.div 
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {data?.data.map(event => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={event.id}
            >
              <Card className="h-full flex flex-col group hover:border-amber-500/30 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge>{event.category}</Badge>
                    {event.isFeatured && <Badge variant="amber">Featured</Badge>}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-amber-500 transition-colors">{event.name}</h3>
                  <p className="text-text-muted text-sm line-clamp-3">{event.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 font-mono text-xs text-text-muted mt-4">
                    <div className="flex items-center space-x-3">
                      <Calendar size={15} className="text-amber-500/70" />
                      <span>{new Date(event.startsAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={15} className="text-amber-500/70" />
                      <span>{event.venue}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center space-x-3">
                        <Users size={15} className="text-amber-500/70" />
                        <span>{event.capacity} seats max</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={new Date(event.startsAt) < new Date() ? 'secondary' : 'primary'}
                    disabled={new Date(event.startsAt) < new Date()}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {new Date(event.startsAt) < new Date() ? 'Ended' : 'Reserve Seat'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <RegisterModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}
