import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

//  TEMPORARY MOCK DATA FOR CHAPTER 7 & 8
// We'll use mock data so you can continue with the tutorial

// Mock sql object (temporary)
const sql = {
  // Empty object - we're not using real database for now
} as any;

export async function fetchRevenue() {
  try {
    //  CHAPTER 8: ADD 3-SECOND DELAY FOR SLOW FETCH SIMULATION
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    //  KEEP MOCK DATA
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
    // Return mock data even on error
    return [
      { month: 'Jan', revenue: 1000 },
      { month: 'Feb', revenue: 2000 },
      { month: 'Mar', revenue: 1500 }
    ];
  }
}

export async function fetchLatestInvoices() {
  try {
    //  MOCK DATA for Chapter 7
    console.log('📄 Using mock invoices data');
    
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
    //  MOCK DATA for Chapter 7
    console.log('🃏 Using mock card data');
    
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

// Rest of the functions (keep them as they are for future chapters)
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  try {
    console.log('📊 Using mock invoices data for table');
    
    // Mock data for invoices table
    const mockInvoices = [
      {
        id: '1',
        name: 'Disha de Oliveira',
        email: 'disha@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        amount: 9947, // Amount in cents
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
    
    // Filter based on query (simple implementation)
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
  return 1;
}

export async function fetchInvoiceById(id: string) {
  // Mock data
  return {
    id: id,
    customer_id: '1',
    amount: 10000,
    status: 'paid' as 'pending' | 'paid',
  };
}

export async function fetchCustomers() {
  // Mock data
  return [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];
}

export async function fetchFilteredCustomers(query: string) {
  // Mock data
  return [];
}