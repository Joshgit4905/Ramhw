# Event Booking Prototype (Part B)

This is a prototype web application built for **Part B** of the Design Patterns Web Practice lab. It is an Event Booking System where users can view available events, book a ticket, and choose their preferred notification method (Email, SMS, Push).

## Technologies Used
- **Next.js (App Router)** - React Framework
- **TypeScript** - For type safety and defining robust pattern interfaces
- **Vanilla CSS** - For styling components

## How to Run the Project
1. Open a terminal in this directory (`event-booking-prototype`).
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Design Patterns Implemented

### 1. Singleton Pattern
**What it does:** Ensures there is only one in-memory instance of the mock database across all API routes, preventing data reset on every request and centralizing state management.
- **Location:** `lib/db.ts`
- **Lines:** 15-32
- **Key Detail:** The `DatabaseConnection` class has a private constructor and a static `getInstance()` method.

### 2. Factory Pattern
**What it does:** Centralizes the creation of Notification services. Based on user preference (email, sms, push), it instantiates the corresponding notifier class without exposing the creation logic to the client.
- **Location:** `lib/notifications.ts`
- **Lines:** 39-50
- **Key Detail:** The `NotifierFactory.create(type)` method uses a switch statement to return the correct concrete instance (`EmailNotifier`, `SmsNotifier`, or `PushNotifier`) which all implement the `Notifier` interface.

### 3. MVC (Model-View-Controller) Pattern
**What it does:** Separates the application into three distinct layers to maintain separation of concerns.
- **Model:** Handles data and business logic (fetching events, adding bookings).
  - **Location:** `models/EventModel.ts` (Lines 4-24)
- **Controller:** Validates API inputs and delegates to the Model.
  - **Location:** `controllers/BookingController.ts` (Lines 4-32)
  - **HTTP Endpoints:** `app/api/events/route.ts` and `app/api/bookings/route.ts` (acting as thin HTTP wrappers).
- **View:** React components that solely handle UI presentation and receive callbacks.
  - **Location:** `components/EventList.tsx` and `components/BookingForm.tsx` (They know nothing about the database, relying only on Props and API fetch calls).
