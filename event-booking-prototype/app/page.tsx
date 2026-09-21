'use client';
import { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import BookingForm from '../components/BookingForm';
import ThreeBackground from '../components/ThreeBackground';
import TextType from '../components/TextType';
import { Event } from '../lib/db';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBookingComplete = (result: any) => {
    setMessage(`STATUS: CONFIRMED // ${result.notification.detail}`);
    setSelectedEvent(null);
    fetchEvents(); // Refresh data
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ThreeBackground />
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      {/* Brutalist Top Navbar */}
      <header className="animate-3d" style={{ 
        position: 'relative', 
        zIndex: 10, 
        borderBottom: '1px solid var(--glass-border)', 
        padding: '1.5rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        color: '#a1a1aa', 
        fontSize: '0.75rem', 
        fontWeight: 900, 
        letterSpacing: '0.2em',
        background: 'rgba(5, 5, 5, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <span>SYS_VER: 9.0.1</span>
        <span style={{ color: 'var(--accent)' }}>GLOBAL EVENT NETWORK</span>
        <span>STATUS: ONLINE</span>
      </header>

      <main className="container" style={{ maxWidth: '1200px', paddingTop: '2rem' }}>
        
        <div className="animate-3d delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '4rem' }}>
          <h1 className="hero-title" style={{ margin: 0, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            <TextType text="SYSTEM EVENTS." typingSpeed={80} showCursor={true} />
          </h1>
          <div style={{ textAlign: 'right', color: '#a1a1aa', fontWeight: 900, letterSpacing: '0.1em' }}>
            <p style={{ margin: 0 }}>ACTIVE NODES: {events.length}</p>
            <p style={{ margin: 0 }}>SECURE CONNECTION</p>
          </div>
        </div>
        
        {message && <div className="message animate-3d delay-1">{message}</div>}
        
        {loading ? (
          <p className="animate-3d delay-1" style={{ color: '#a1a1aa', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <TextType text={["CONNECTING...", "AUTHENTICATING...", "INITIALIZING CORE..."]} typingSpeed={40} deletingSpeed={20} loop={true} />
          </p>
        ) : (
          <div className="animate-3d delay-1">
            <EventList 
              events={events} 
              onSelectEvent={(e) => { 
                setSelectedEvent(e); 
                setMessage(''); 
                setTimeout(() => {
                  document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
            />
          </div>
        )}

        {selectedEvent && (
          <div style={{ marginTop: '5rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }} className="animate-3d delay-2">
            <BookingForm 
              event={selectedEvent} 
              onBookingComplete={handleBookingComplete} 
              onCancel={() => setSelectedEvent(null)}
            />
          </div>
        )}
      </main>

      {/* Brutalist Footer */}
      <footer className="animate-3d delay-3" style={{ 
        borderTop: '1px solid var(--glass-border)', 
        padding: '2rem', 
        marginTop: '6rem',
        color: '#52525b', 
        fontSize: '0.7rem', 
        fontWeight: 900, 
        letterSpacing: '0.2em',
        textAlign: 'center'
      }}>
        END OF TRANSMISSION // ALL RIGHTS RESERVED 2026 // NEXUS PROTOCOL
      </footer>
    </>
  );
}
