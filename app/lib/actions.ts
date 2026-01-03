'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// MOCK DATABASE
const mockDB = {
  async query(strings: TemplateStringsArray, ...values: any[]) {
    console.log('Mock DB Query:', strings[0], values);
    return { rows: [] };
  }
};
const sql = mockDB;

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql.query`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    
    console.log('✅ Mock: Invoice created');
  } catch (error) {
    console.error('Mock DB Error:', error);
    return { 
      message: 'Database Error: Failed to Create Invoice.'
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql.query`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    
    console.log('✅ Mock: Invoice updated');
  } catch (error) {
    console.error('Mock DB Error:', error);
    return { message: 'Database Error (Mock)' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    console.log('Deleting invoice (Mock):', id);
    await sql.query`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error('Mock DB Error:', error);
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// ✅ SIMPLE AND WORKING AUTHENTICATE FUNCTION
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    // Sign in with redirect disabled
    const result = await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });

    // Check for errors
    if (result?.error) {
      console.log('Login failed:', result.error);
      return 'Invalid credentials.';
    }

    // SUCCESS
    console.log('✅ Login successful');
    return 'SUCCESS';
    
  } catch (error: any) {
    console.log('Auth error:', error);
    
    // Handle redirect error (success case)
    if (error?.digest?.includes('NEXT_REDIRECT')) {
      console.log('✅ Redirect detected');
      return 'SUCCESS';
    }

    // Handle AuthError
    if (error instanceof AuthError) {
      // Only handle CredentialsSignin error
      return 'Invalid credentials.';
    }

    // Generic error
    return 'Something went wrong. Please try again.';
  }
}