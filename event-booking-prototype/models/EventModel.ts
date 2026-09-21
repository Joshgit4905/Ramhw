import { DatabaseConnection, Event } from '../lib/db';
import { NotifierFactory, NotificationType } from '../lib/notifications';

// MODEL: Business logic and data access. Does not know about HTTP requests or UI.
export const EventModel = {
  getAllEvents(): Event[] {
    const db = DatabaseConnection.getInstance();
    return db.getEvents();
  },

  bookEvent(eventId: string, userEmail: string, notificationPref: NotificationType) {
    const db = DatabaseConnection.getInstance();
    
    // Create the booking using the Database (Singleton)
    const booking = db.addBooking(eventId, userEmail);

    // Send notification using the Factory Pattern
    const notifier = NotifierFactory.create(notificationPref);
    const notificationResult = notifier.send(
      userEmail, 
      `Your booking for event ${eventId} is confirmed! Booking ID: ${booking.id}`
    );

    return {
      booking,
      notification: notificationResult
    };
  }
};
