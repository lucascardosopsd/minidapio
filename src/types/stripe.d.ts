
export interface StripeCustomer {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  metadata: {
    userId: string;
  };
}

export interface StripeSubscription {
  id: string;
  customer: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  current_period_end: number;
  items: {
    data: Array<{
      id: string;
      price: {
        id: string;
        unit_amount: number;
        currency: string;
      };
    }>;
  };
}

export interface StripePayment {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  created: number;
  subscription: string;
} 