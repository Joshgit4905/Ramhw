export interface Event {
  id: string;
  title: string;
  date: string;
  capacity: number;
  booked: number;
}

export interface Booking {
  id: string;
  eventId: string;
  userEmail: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  private events: Event[];
  private bookings: Booking[];

  private constructor() {
    // Private constructor prevents external instantiation (Singleton Pattern)
    this.events = [
      { id: 'e1', title: 'CYBER-SECURITY SUMMIT 26', date: '2026-10-15', capacity: 150, booked: 148 },
      { id: 'e2', title: 'DESIGN PATTERNS IN TS', date: '2026-11-20', capacity: 50, booked: 12 },
      { id: 'e3', title: 'AI NEURAL NETWORKS', date: '2026-12-05', capacity: 30, booked: 30 },
      { id: 'e4', title: 'QUANTUM COMPUTING GALA', date: '2027-01-10', capacity: 200, booked: 45 },
      { id: 'e5', title: 'WEB3 HACKATHON: NEXT', date: '2027-02-18', capacity: 300, booked: 190 },
      { id: 'e6', title: 'SERVER COMPONENTS DIVE', date: '2027-03-01', capacity: 100, booked: 89 },
    ];
    this.bookings = [];
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  // --- Database Operations ---

  public getEvents(): Event[] {
    return this.events;
  }

  public getEvent(id: string): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  public addBooking(eventId: string, userEmail: string): Booking {
    const event = this.getEvent(eventId);
    if (!event) throw new Error("Event not found");
    if (event.booked >= event.capacity) throw new Error("Event is fully booked");

    const newBooking: Booking = {
      id: `b_${Math.random().toString(36).slice(2, 9)}`,
      eventId,
      userEmail,
    };

    this.bookings.push(newBooking);
    event.booked += 1;
    return newBooking;
  }
}
