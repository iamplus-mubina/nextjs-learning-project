// /app/lib/data.ts
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// Mock database connection
const sql = {} as any;

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    console.log('Data fetch completed after 3 seconds.');
    
    const mockRevenue = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3200 },
      { month: 'Jul', revenue: 3500 },
      { month: 'Aug', revenue: 3700 },
      { month: 'Sep', revenue: 2500 },
      { month: 'Oct', revenue: 2800 },
      { month: 'Nov', revenue: 3000 },
      { month: 'Dec', revenue: 4800 },
    ];
    
    return mockRevenue;
    
  } catch (error) {
    console.error('Database Error:', error);
    
    // Fallback data
    return [
      { month: 'Jan', revenue: 1000 },
      { month: 'Feb', revenue: 2000 },
      { month: 'Mar', revenue: 1500 }
    ];
  }
}

export async function fetchLatestInvoices() {
  try {
    console.log('Using mock invoices data');
    
    const mockInvoices = [
      {
        id: '1',
        name: 'Disha de Oliveira',
        email: 'disha@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        amount: '$99.47'
      },
      {
        id: '2',
        name: 'Jared Palmer',
        email: 'jared@palmer.com',
        image_url: '/customers/jared-palmer.png',
        amount: '$448.00'
      },
      {
        id: '3',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        amount: '$0.00'
      },
      {
        id: '4',
        name: 'Tom Occhino',
        email: 'tom@occhino.com',
        image_url: '/customers/tom-occhino.png',
        amount: '$947.77'
      },
      {
        id: '5',
        name: 'Emil Kowalski',
        email: 'emil@kowalski.com',
        image_url: '/customers/emil-kowalski.png',
        amount: '$745.46'
      }
    ];
    
    return mockInvoices;
    
  } catch (error) {
    console.error('Database Error:', error);
    console.log('Returning mock data due to database error');
    
    return [
      {
        id: '1',
        name: 'Mock Customer 1',
        email: 'mock1@example.com',
        image_url: '/customers/default.png',
        amount: '$100.00'
      },
      {
        id: '2',
        name: 'Mock Customer 2',
        email: 'mock2@example.com',
        image_url: '/customers/default.png',
        amount: '$200.00'
      }
    ];
  }
}

export async function fetchCardData() {
  try {
    console.log('Using mock card data');
    
    return {
      numberOfCustomers: 8,
      numberOfInvoices: 15,
      totalPaidInvoices: '$1,106.36',
      totalPendingInvoices: '$1,339.11',
    };
    
  } catch (error) {
    console.error('Database Error:', error);
    return {
      numberOfCustomers: 0,
      numberOfInvoices: 0,
      totalPaidInvoices: '$0.00',
      totalPendingInvoices: '$0.00',
    };
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  try {
    console.log('Using mock invoices data for table');
    
    const mockInvoices = [
      {
        id: '1',
        name: 'Disha de Oliveira',
        email: 'disha@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        amount: 9947,
        date: '2024-01-15',
        status: 'paid' as 'pending' | 'paid'
      },
      {
        id: '2',
        name: 'Jared Palmer',
        email: 'jared@palmer.com',
        image_url: '/customers/jared-palmer.png',
        amount: 44800,
        date: '2024-01-20',
        status: 'pending' as 'pending' | 'paid'
      },
      {
        id: '3',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        amount: 0,
        date: '2024-01-25',
        status: 'paid' as 'pending' | 'paid'
      },
      {
        id: '4',
        name: 'Tom Occhino',
        email: 'tom@occhino.com',
        image_url: '/customers/tom-occhino.png',
        amount: 94777,
        date: '2024-01-30',
        status: 'pending' as 'pending' | 'paid'
      },
      {
        id: '5',
        name: 'Emil Kowalski',
        email: 'emil@kowalski.com',
        image_url: '/customers/emil-kowalski.png',
        amount: 74546,
        date: '2024-02-01',
        status: 'paid' as 'pending' | 'paid'
      }
    ];
    
    const filtered = mockInvoices.filter(invoice =>
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered;
    
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    return 1;
  } catch (error) {
    console.error('Database Error:', error);
    return 1;
  }
}

// ✅ UPDATED FOR CHAPTER 12 - Clean and simple
export async function fetchInvoiceById(id: string) {
  try {
    console.log('Fetching invoice for id:', id);
    
    const mockInvoices = [
      { 
        id: '1', 
        customer_id: '1', 
        amount: 9947, // Amount in cents ($99.47)
        status: 'paid' as 'pending' | 'paid',
        date: '2024-01-15'
      },
      { 
        id: '2', 
        customer_id: '2', 
        amount: 44800, // $448.00 in cents
        status: 'pending' as 'pending' | 'paid',
        date: '2024-01-20'
      },
      { 
        id: '3', 
        customer_id: '3', 
        amount: 0, 
        status: 'paid' as 'pending' | 'paid',
        date: '2024-01-25'
      },
      { 
        id: '4', 
        customer_id: '4', 
        amount: 94777, // $947.77 in cents
        status: 'pending' as 'pending' | 'paid',
        date: '2024-01-30'
      },
      { 
        id: '5', 
        customer_id: '5', 
        amount: 74546, // $745.46 in cents
        status: 'paid' as 'pending' | 'paid',
        date: '2024-02-01'
      },
    ];
    
    // Find the invoice
    const invoice = mockInvoices.find(inv => inv.id === id);
    
    if (!invoice) {
      console.log('Invoice not found for id:', id);
      return null; // This will trigger notFound() in page.tsx
    }

    console.log('Found invoice:', {
      id: invoice.id,
      customer_id: invoice.customer_id,
      amount: invoice.amount / 100, // Convert to dollars
      status: invoice.status
    });
    
    // Return with amount converted to dollars
    return {
      id: invoice.id,
      customer_id: invoice.customer_id,
      amount: invoice.amount / 100, // Convert cents to dollars
      status: invoice.status,
      date: invoice.date,
    };
    
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

export async function fetchCustomers() {
  try {
    console.log('Fetching customers...');
    
    const mockCustomers = [
      { id: '1', name: 'Disha de Oliveira' },
      { id: '2', name: 'Jared Palmer' },
      { id: '3', name: 'Lee Robinson' },
      { id: '4', name: 'Tom Occhino' },
      { id: '5', name: 'Emil Kowalski' },
    ];
    
    return mockCustomers;
    
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    console.log('Fetching filtered customers for query:', query);
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}