'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/app/lib/session";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
  date: z.string(),
});

const RegisterFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'User name can not be empty' }),
  email: z.string().min(1, { message: 'Email can not be empty' }).email({ message: "Email is invalid" }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  password2: z.string().min(6, { message: 'Passwords do not match' }),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const RegisterUser = RegisterFormSchema.omit({ id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    password2?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try{
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    }catch(error){
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try{  
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    }catch(error){
        console.error(error);

        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try{
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    }catch(error){
        console.error(error);
    }

  revalidatePath('/dashboard/invoices');
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
        cookieStore,
        sessionOptions,
    );

    return session;
}

export async function removeFriend(id: string) {
    const session = await getSession();
    
    if (!session.userId) {
        throw new Error("session.userId es undefined");
    }

    try{
        await sql`
            DELETE FROM friends 
            WHERE userIdSource = ${session.userId} AND userIdTarget = ${id}
        `;
    }catch(error){
        console.error(error);
    }

  revalidatePath('/dashboard/profile/' + session.userId);
}

export async function acceptFriend(id: string) {
    const session = await getSession();

    try{
        await sql`
            UPDATE friends
            SET accepted = true
            WHERE userIdSource = ${id} AND userIdTarget = ${session.userId}
        `;
    }catch(error){
        console.error(error);
    }

  revalidatePath('/dashboard/profile/' + session.userId);
}

export async function addFriend(id: string | undefined) {
    const session = await getSession();

    if(id != undefined){
        try{
            await sql`
                INSERT INTO friends (userIdSource, userIdTarget, accepted)
                VALUES (${session.userId}, ${id}, false)
            `;
        }catch(error){
            console.error(error);
        }
    }else{
        console.error("404 Id not found");
    }

  revalidatePath('/dashboard/profile/' + session.userId);
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registerUser(prevState: RegisterState, formData: FormData) {
    const validatedFields = RegisterUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password2: formData.get('password2'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Register User.',
        };
    }

    const { name, email, password, password2 } = validatedFields.data;

    if (password.localeCompare(password2) != 0) {
        return {
            message: 'Passwords do not match',
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
        `;
    }catch(error){
        return {
            message: 'Database Error: Failed to Register User.',
        };
    }

    try {
        formData.delete("name");
        formData.delete("password2");
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message:'Invalid credentials.'
                    };
                default:
                    return {
                        message: 'Something went wrong.'
                    };
            }
        }
        throw error;
    }

    redirect('/dashboard');
}