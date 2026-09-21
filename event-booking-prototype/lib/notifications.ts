export interface Notifier {
  channel: string;
  send(to: string, message: string): { channel: string; status: string; detail: string };
}

class EmailNotifier implements Notifier {
  channel = 'email';
  send(to: string, message: string) {
    // Simulated email sending logic
    return {
      channel: this.channel,
      status: 'success',
      detail: `Sent Email to ${to}: ${message}`
    };
  }
}

class SmsNotifier implements Notifier {
  channel = 'sms';
  send(to: string, message: string) {
    // Simulated SMS sending logic
    return {
      channel: this.channel,
      status: 'success',
      detail: `Sent SMS to ${to}: ${message}`
    };
  }
}

class PushNotifier implements Notifier {
  channel = 'push';
  send(to: string, message: string) {
    // Simulated Push Notification logic
    return {
      channel: this.channel,
      status: 'success',
      detail: `Sent Push to device ${to}: ${message}`
    };
  }
}

export type NotificationType = 'email' | 'sms' | 'push';

// Factory Pattern
export class NotifierFactory {
  static create(type: NotificationType): Notifier {
    switch (type) {
      case 'email':
        return new EmailNotifier();
      case 'sms':
        return new SmsNotifier();
      case 'push':
        return new PushNotifier();
      default:
        throw new Error(`Unsupported notification type: ${type}`);
    }
  }
}
