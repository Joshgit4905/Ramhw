import { EventModel } from '../models/EventModel';
import { NotificationType } from '../lib/notifications';

// CONTROLLER: Validates inputs, processes HTTP intent, and delegates to the Model.
export const BookingController = {
  getEvents() {
    try {
      const events = EventModel.getAllEvents();
      return { status: 200, data: events };
    } catch (error: any) {
      return { status: 500, error: error.message };
    }
  },

  createBooking(body: any) {
    const { eventId, userEmail, notificationPref } = body;
    
    // Validate inputs
    if (!eventId || !userEmail) {
      return { status: 400, error: 'eventId and userEmail are required' };
    }

    const pref: NotificationType = notificationPref || 'email';
    if (!['email', 'sms', 'push'].includes(pref)) {
      return { status: 400, error: 'Invalid notificationPref' };
    }

    try {
      // Delegate to Model
      const result = EventModel.bookEvent(eventId, userEmail, pref);
      return { status: 201, data: result };
    } catch (error: any) {
      return { status: 400, error: error.message };
    }
  }
};
