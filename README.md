# Credit Transactions Dashboard

This project is a **Full-Stack Junior Developer assignment** that simulates a credit card transactions management system.  
It consists of a **Strapi backend** and a **Next.js frontend** connected to display transactions.

---

## Backend (Strapi)

### Content-Type: `Transaction`
- **description**: short text
- **amount**: decimal number
- **type**: enumeration (`Debit` or `Credit`)
- **transactionDate**: datetime
- **category**: text (e.g., Food, Utilities)

### Setup & Run

1. Install dependencies:
   ```bash
   npm install

2. Start Strapi server:
     npm run develop

3. Access the admin panel at http://localhost:1337/admin

4. Make sure Public role has permission to find transactions

### Frontend (Next.js)
- **Pages**
   **Dashboard (app/page.tsx)** – fetches transactions from Strapi and displays them in a table.

- **Features**
  **Transaction Table**: lists all transactions with columns for Description, Amount, Type, Date, Category
    * Debit (expenses) shown in   **red** 
    * Credit (income) shown in **green**
  **Balance Summary**: displays total balance (sum of credits minus sum of debits) at the top
  **Filtering**: allows filtering by Debit, Credit, or both

- **Setup & Run**
  1. Install dependencies:
      npm install
  2. Start development server:
     npm run dev
  3. Open http://localhost:3000

- **Data Fetching**
  * Uses Next.js App Router with fetch and cache: "no-store" for server-side data fetching.
  * Handles missing attributes safely to prevent crashes.

- **Technologies**
   * **Backend**: Strapi (SQLite by default)
   * **Frontend**: Next.js 13+ with TypeScript
   * **Styling**: minimal UI, visual cues for amounts (red/green)
   * **Data Fetching**: Server-side
  
- **Notes**
  * The dashboard updates immediately when transactions are added or modified in Strapi.
  * All code is modular, clean, and commented in English.
  * Demonstrates basic Full-Stack skills: modeling data, connecting frontend to backend, filtering, and calculating summaries.


    