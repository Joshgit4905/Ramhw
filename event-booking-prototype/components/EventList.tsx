'use client';
import { Event } from '../lib/db';

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

export default function EventList({ events, onSelectEvent }: EventListProps) {
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
      gap: '2rem' 
    }}>
      {events.length === 0 ? <p style={{ color: '#a1a1aa' }}>NO EVENTS FOUND</p> : null}
      
      {events.map((event) => (
        <div 
          key={event.id} 
          className="glass-panel"
          style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-header" style={{ flexGrow: 1, borderBottom: 'none' }}>
            <h3 className="event-title" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{event.title}</h3>
          </div>
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="event-details" style={{ margin: 0, fontSize: '0.875rem', fontWeight: 900 }}>T-MINUS: {event.date}</span>
              <span className="badge" style={{ backgroundColor: event.booked >= event.capacity ? 'var(--error)' : 'var(--accent)' }}>
                {event.booked} / {event.capacity}
              </span>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => onSelectEvent(event)}
              disabled={event.booked >= event.capacity}
              style={{ padding: '1rem' }}
            >
              {event.booked >= event.capacity ? 'CAPACITY REACHED' : 'INITIALIZE BOOKING'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
