import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClubInfo, useFeaturedEvent, useEvents } from '../hooks/useEvents.js';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Calendar, MapPin, ArrowRight, Code, Camera } from 'lucide-react';

export function HomePage() {
  const { data: club } = useClubInfo();
  const { data: featured } = useFeaturedEvent();
  const { data: upcomingEvents } = useEvents({ upcoming: 'true', limit: 3 });

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="amber" className="mb-6 px-4 py-1 text-sm">Welcome to our kitchen</Badge>
            <h1 className="text-5xl sm:text-7xl font-display font-bold leading-tight mb-6">
              {club?.tagline || 'Build the future, together.'}
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
              {club?.about || 'We are a community of passionate student developers building real-world projects.'}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/events">
                <Button size="lg" className="gap-2">
                  Browse Menu <ArrowRight size={18} />
                </Button>
              </Link>
              {club?.socials && (
                <div className="flex items-center space-x-4 ml-4">
                  {club.socials.github && (
                    <a href={club.socials.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text transition-colors">
                      <Code size={24} />
                    </a>
                  )}
                  {club.socials.instagram && (
                    <a href={club.socials.instagram} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text transition-colors">
                      <Camera size={24} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <h2 className="text-3xl font-display font-bold">Chef's Special</h2>
            <Badge variant="amber">Featured</Badge>
          </div>
          <Card className="border-amber-500/20 bg-amber-500/5">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 sm:p-12">
              <div>
                <Badge className="mb-4">{featured.category}</Badge>
                <h3 className="text-4xl font-display font-bold mb-4">{featured.name}</h3>
                <p className="text-text-muted text-lg mb-8">{featured.description}</p>
                <div className="space-y-3 font-mono text-sm mb-8 text-text-muted">
                  <div className="flex items-center space-x-3">
                    <Calendar size={18} className="text-amber-500" />
                    <span>{new Date(featured.startsAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin size={18} className="text-amber-500" />
                    <span>{featured.venue}</span>
                  </div>
                </div>
                <Link to="/events">
                  <Button variant="outline">Reserve a seat</Button>
                </Link>
              </div>
              <div className="aspect-video bg-surface rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                {featured.bannerUrl ? (
                  <img src={featured.bannerUrl} alt={featured.name} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="text-text-muted font-mono opacity-50">No image available</div>
                )}
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.data?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8">Fresh out of the oven</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.data.map(event => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge>{event.category}</Badge>
                  </div>
                  <h3 className="text-xl font-display font-bold line-clamp-2 mb-2">{event.name}</h3>
                  <p className="text-text-muted text-sm line-clamp-2">{event.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2 font-mono text-xs text-text-muted">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-amber-500" />
                      <span>{new Date(event.startsAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-amber-500" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/events" className="w-full">
                    <Button variant="secondary" className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
