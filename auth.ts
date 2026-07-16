import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, sessionOptions, SessionData } from "@/app/lib/session";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE id=${id}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await getUser(email);
              const cookieStore = await cookies();
              const session = await getIronSession<SessionData>(
                  cookieStore,
                  sessionOptions,
              );
              if (!user){
                session.isLoggedIn = defaultSession.isLoggedIn;
                session.userId = defaultSession.userId;
                session.email = defaultSession.email;
                return null;
              } 
              const passwordsMatch = await bcrypt.compare(password, user.password);
              if (passwordsMatch){
                session.isLoggedIn = true;
                session.userId = user.id;
                session.email = user.email;
                await session.save();
                return user;
              } 
            }
    
            console.log('Invalid credentials');
            return null;
        },
    })],
});