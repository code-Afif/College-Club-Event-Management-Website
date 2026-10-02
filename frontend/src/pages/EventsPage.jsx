import React, { useState, useEffect } from 'react';
import { useEvents, useCategories } from '../hooks/useEvents.js';
import { RegisterModal } from '../components/registration/RegisterModal.jsx';

const EVENT_IMAGES = {
  'Git & GitHub Basics': 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800',
  'Intro to React & Vite': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
  'Hack the Future': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  'UI/UX Design for Developers': 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
  'Alumni Tech Talk: Working at FAANG': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
  'Competitive Programming Contest': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800',
  'Open Source Sprint': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'End of Semester Mixer': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
};

const CATEGORY_IMAGES = {
  Workshop: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800',
  Hackathon: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
  Talk: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
  Contest: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  Social: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  Seminar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
};

const getEventImage = (event) => {
  if (event.image) return event.image;
  if (event.bannerUrl) return event.bannerUrl;
  if (EVENT_IMAGES[event.name]) return EVENT_IMAGES[event.name];
  return CATEGORY_IMAGES[event.category] || CATEGORY_IMAGES.default;
};

export function EventsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: categories } = useCategories();
  const { data, isLoading, isError } = useEvents({ 
    search: debouncedSearch, 
    category,
    limit: 50 
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const dynamicEvents = data?.data || [];
  const filteredEvents = dynamicEvents.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = category ? e.category === category : true;
    return matchesSearch && matchesCategory;
  });
  
  const upcomingEvents = filteredEvents.filter(e => new Date(e.startsAt) >= new Date());
  const pastEvents = filteredEvents.filter(e => new Date(e.startsAt) < new Date());

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="border-b border-outline-variant p-space-md lg:p-space-xl bg-surface-container-high" id="events-directory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
            <div>
              <div className="font-label-mono text-label-mono text-primary-container tracking-wider mb-1">
                [03] // EVENTS_DIRECTORY
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold uppercase text-primary">
                The Ledger
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl font-body-md mt-2">
                Query our complete selection of upcoming and past events. Secure your allocation before capacity is reached.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Search Input inline right */}
              <div className="flex items-center bg-surface-container-low border border-outline-variant px-2.5 py-1.5 text-on-surface font-label-mono text-label-mono focus-within:border-primary-container transition-none">
                <span className="text-outline mr-2 font-bold">❯</span>
                <input 
                  className="bg-transparent border-0 p-0 text-on-surface placeholder:text-outline focus:ring-0 w-64 font-label-mono text-label-mono" 
                  placeholder="grep EVENT_NAME..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-outline hover:text-on-surface ml-2 transition-none">
                    [X]
                  </button>
                )}
              </div>

              {/* Segmented Category Filters */}
              <div className="flex flex-wrap items-center gap-1 font-label-mono text-label-mono bg-surface-container-low p-1 border border-outline-variant">
                <button 
                  onClick={() => setCategory('')} 
                  className={`px-3 py-1 transition-none ${!category ? 'bg-primary-container text-surface-container-lowest font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  ALL
                </button>
                {categories?.map(c => (
                  <button 
                    key={c}
                    onClick={() => setCategory(c === category ? '' : c)} 
                    className={`px-3 py-1 uppercase transition-none ${category === c ? 'bg-primary-container text-surface-container-lowest font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Events Grid */}
      <section className="p-space-md lg:p-space-xl max-w-7xl mx-auto">
        {isLoading && (
          <div className="text-center py-20 border border-outline-variant bg-surface-container-low">
            <span className="font-label-mono text-label-mono text-outline animate-pulse">FETCHING EVENT LEDGER...</span>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 border border-error bg-error/10">
            <span className="font-label-mono text-label-mono text-error">[ERR] SYSTEM FAILURE: UNABLE TO LOAD EVENTS.</span>
          </div>
        )}

        {!isLoading && !isError && upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="text-center py-20 border border-outline-variant bg-surface-container-low">
            <span className="font-label-mono text-label-mono text-outline">QUERY RETURNED 0 RESULTS</span>
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <div className="mb-space-xl">
            <div className="flex items-center gap-4 mb-space-md">
              <h2 className="text-2xl font-headline font-bold uppercase text-primary tracking-tight">Active Allocations</h2>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-outline-variant">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-none group">
                  <div>
                    <div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
                      <span className="text-primary-container font-bold">■ {event.category.toUpperCase()}</span>
                      <span className="text-outline">{new Date(event.startsAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="h-32 mb-4 overflow-hidden border border-outline-variant relative">
                      <div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-none z-10 mix-blend-overlay"></div>
                      <img src={getEventImage(event)} alt={event.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-none" />
                    </div>

                    {event.isFeatured && (
                      <div className="inline-block bg-secondary-container text-primary font-label-mono text-label-mono px-2 py-0.5 font-bold mb-3">
                        FEATURED_ALLOCATION
                      </div>
                    )}
                    <h3 className="font-headline-md text-headline-md text-primary font-bold mb-2">
                      {event.name.toUpperCase()}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
                    <div className="flex justify-between text-xs">
                      <span className="text-outline">LOCATION:</span>
                      <span className="text-primary font-bold">{event.venue.toUpperCase()}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex justify-between text-xs">
                        <span className="text-outline">CAPACITY:</span>
                        <span className="text-on-surface">{event.capacity} NODES MAX</span>
                      </div>
                    )}
                    <button onClick={() => setSelectedEvent(event)} className="w-full bg-primary-container text-surface-container-lowest font-headline-sm text-headline-sm font-bold py-2 hover:bg-white transition-none text-center block mt-2 border border-primary-container hover:-translate-y-px hover:-translate-x-px hard-shadow-citron active:translate-x-0 active:translate-y-0 shadow-none">
                      INITIALIZE REGISTRATION [↵]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div className="mb-space-xl">
            <div className="flex items-center gap-4 mb-space-md">
              <h2 className="text-2xl font-headline font-bold uppercase text-on-surface-variant tracking-tight">Archived Executions</h2>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-outline-variant opacity-75">
              {pastEvents.map(event => (
                <div key={event.id} className="border-r border-b border-outline-variant p-space-md lg:p-space-lg bg-surface-container-low flex flex-col justify-between transition-none group">
                  <div>
                    <div className="flex items-center justify-between font-label-mono text-label-mono mb-space-md pb-2 border-b border-outline-variant">
                      <span className="text-on-surface-variant font-bold">■ {event.category.toUpperCase()}</span>
                      <span className="text-outline">{new Date(event.startsAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="h-32 mb-4 overflow-hidden border border-outline-variant relative">
                      <div className="absolute inset-0 bg-surface-container/50 z-10 mix-blend-overlay"></div>
                      <img src={getEventImage(event)} alt={event.name} className="w-full h-full object-cover grayscale opacity-50" />
                    </div>

                    <div className="inline-block bg-surface-variant text-on-surface-variant font-label-mono text-label-mono px-2 py-0.5 font-bold mb-3 border border-outline-variant">
                      ARCHIVED
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface-variant font-bold mb-2 line-through decoration-outline">
                      {event.name.toUpperCase()}
                    </h3>
                    <p className="font-body-sm text-body-sm text-outline mb-space-lg leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <div className="space-y-3 pt-space-md border-t border-outline-variant font-label-mono text-label-mono">
                    <div className="flex justify-between text-xs">
                      <span className="text-outline">LOCATION:</span>
                      <span className="text-on-surface-variant">{event.venue.toUpperCase()}</span>
                    </div>
                    {event.participants && (
                      <div className="flex justify-between text-xs">
                        <span className="text-outline">PARTICIPANTS:</span>
                        <span className="text-on-surface-variant">{event.participants}</span>
                      </div>
                    )}
                    <div className="w-full bg-surface-container border border-outline-variant text-outline font-headline-sm text-headline-sm font-bold py-2 text-center block mt-2 cursor-not-allowed">
                      OPERATION CONCLUDED
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <RegisterModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}
