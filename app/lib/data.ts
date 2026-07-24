import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  ItemData,
  InvoiceForm,
  InvoicesTable,
  LatestItem,
  Revenue,
  User,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestItems() {
  try {
    const data = await sql<LatestItem[]>`
      SELECT data.id, data.name, data.extension, data.date, users.name AS username
      FROM data
      JOIN users ON data.user_id = users.id
      ORDER BY data.date DESC
      LIMIT 5`;

    const latestItems = data.map((item) => ({
      ...item,
    }));
    return latestItems;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest items');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchUserNumber() {
  try{
    const userNum = sql`SELECT COUNT(*) FROM users`;
    
    return userNum;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not fetch user number');
  }
}

export async function fetchUserByName(name: string) {
  try {
    const user = await sql<User[]>`
      SELECT *
      FROM users u
      WHERE u.name = ${name}
    `;

    return user[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not fetch user by name');
  }
}

export async function nameRepeated(name: string) {
  try {
    const result = await sql<{ exists: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM users u
        WHERE u.name = ${name}
      )as exists
    `;

    return result[0].exists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not check user name availability');
  }
}

export async function emailRepeated(email: string) {
  try {
    const result = await sql<{ exists: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM users u
        WHERE u.email = ${email}
      )as exists
    `;

    return result[0].exists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not check email availability');
  }
}

export async function fetchFriendNumber() {
  try{
    const friendNum = sql`SELECT COUNT(*) FROM friends`;
    
    return friendNum;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not fetch friend number');
  }
}

export async function fetchFriends(id: string) {
  try {
    const friends = await sql<User[]>`
      SELECT u.*
      FROM friends f
      JOIN users u ON u.id = f."userIdTarget"
      WHERE f."userIdSource" = ${id}
      AND f.accepted = true
      UNION
      SELECT u.*
      FROM friends f
      JOIN users u ON u.id = f."userIdSource"
      WHERE f."userIdTarget" = ${id}
      AND f.accepted = true
    `;

    return friends;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch friends.');
  }
}

export async function fetchFriendRequests(id: string) {
  try {
    const friends = await sql<User[]>`
      SELECT u.*
      FROM friends f
      JOIN users u ON u.id = f."userIdSource"
      WHERE f."userIdTarget" = ${id}
      AND f.accepted = false
    `;

    return friends;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch friend requests.');
  }
}

export async function areWeFriends(id1: string, id2: string) {
  try {
    const result = await sql<{ exists: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM friends f
        WHERE (
            (f."userIdTarget" = ${id1}
            AND f."userIdSource" = ${id2})
          OR
            (f."userIdTarget" = ${id2}
            AND f."userIdSource" = ${id1})
        )AND f.accepted = true
      )as exists
    `;

    return result[0].exists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to prove friendship.');
  }
}

export async function areWeRequested(id1: string, id2: string) {
  try {
    const result = await sql<{ exists: boolean }[]>`
      SELECT EXISTS(
        SELECT 1
        FROM friends f
        WHERE (
            (f."userIdTarget" = ${id1}
            AND f."userIdSource" = ${id2})
          OR
            (f."userIdTarget" = ${id2}
            AND f."userIdSource" = ${id1})
        )AND f.accepted = false
      )as exists
    `;

    return result[0].exists;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to prove friendship.');
  }
}

export async function fetchItemNumber() {
  try{
    const itemNum = sql`SELECT COUNT(*) FROM data`;
    
    return itemNum;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Can not fetch item number');
  }
}

export async function fetchItemById(id: string) {
  try {
    const data = await sql<ItemData[]>`
      SELECT *
      FROM data
      WHERE data.id = ${id};
    `;

    const item = data.map((e) => ({
      ...e,
    }));

    console.log(item);
    return item[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item');
  }
}

export async function fetchFilteredItemsUserId(
  query: string,
  currentPage: number,
  id: string,
) {
  const offset = (currentPage - 1) * 10;

  try {
    const data = await sql<ItemData[]>`
      SELECT *
      FROM data
      WHERE (data.name::text ILIKE ${`%${query}%`} OR
        data.extension::text ILIKE ${`%${query}%`} OR
        data.summary::text ILIKE ${`%${query}%`}) AND
        data.user_id = ${id}
      LIMIT 10 OFFSET ${offset}
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered items');
  }
}

export async function fetchItemPagesUserId(query: string, id: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM data
      WHERE (data.name::text ILIKE ${`%${query}%`} OR
        data.extension::text ILIKE ${`%${query}%`} OR
        data.summary::text ILIKE ${`%${query}%`}) AND
        data.user_id = ${id}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / 10);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of items');
  }
}

export async function fetchItemByUserId(id: string) {
  try {
    const data = await sql<ItemData[]>`
      SELECT *
      FROM data
      WHERE data.user_id = ${id};
    `;

    const item = data.map((e) => ({
      ...e,
    }));

    console.log(item);
    return item[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item');
  }
}