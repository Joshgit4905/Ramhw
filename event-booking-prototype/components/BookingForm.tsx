'use client';
import { useState } from 'react';
import { Event } from '../lib/db';
import { NotificationType } from '../lib/notifications';

interface BookingFormProps {
  event: Event;
  onBookingComplete: (result: any) => void;
  onCancel: () => void;
}

export default function BookingForm({ event, onBookingComplete, onCancel }: BookingFormProps) {
  const [email, setEmail] = useState('');
  const [pref, setPref] = useState<NotificationType>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4; // Subtle 4deg max
    const rotateY = ((x - centerX) / centerX) * 4;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, userEmail: email, notificationPref: pref })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      onBookingComplete(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="glass-panel" 
      id="booking-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h4 style={{ 
        fontSize: '1.75rem', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        letterSpacing: '-0.02em',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--glass-border)',
        paddingBottom: '1.5rem',
        color: 'var(--accent)'
      }}>
        AUTHORIZATION REQUIREMENT: {event.title}
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">IDENTITY (EMAIL)</label>
          <input 
            type="email" 
            className="form-control" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ENTER ADDRESS..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">DELIVERY VECTOR</label>
          <select 
            className="form-control" 
            value={pref} 
            onChange={(e) => setPref(e.target.value as NotificationType)}
          >
            <option value="email">SECURE EMAIL</option>
            <option value="sms">DIRECT SMS</option>
            <option value="push">SYSTEM PUSH</option>
          </select>
        </div>
        
        {error && <div style={{ color: 'var(--error)', marginBottom: '2rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.875rem' }}>FATAL EXCEPTION: {error}</div>}
        
        <div className="btn-group">
          <button type="submit" className="btn btn-primary" disabled={loading || event.booked >= event.capacity}>
            {loading ? 'PROCESSING...' : 'EXECUTE SEQUENCE'}
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            ABORT
          </button>
        </div>
      </form>
    </div>
  );
}
