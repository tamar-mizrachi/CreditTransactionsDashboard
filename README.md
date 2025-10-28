# 💳 Credit Transactions Dashboard

A full-stack system for managing and analyzing credit card transactions.  
Developed as a **Junior Full-Stack Developer assignment**, demonstrating backend modeling, API integration, and dynamic UI rendering.

---

##  Tech Stack

| Layer      | Technology                        |
|-----------|-----------------------------------|
| Backend   | Strapi (SQLite default)            |
| Frontend  | Next.js 13+ with TypeScript        |
| Styling   | Tailwind CSS                       |
| Data Fetching | SWR (client-side auto-refresh) |

---

##  Backend (Strapi)

**Content-Type:** `Transaction`

| Field            | Type          | Description                         |
|-----------------|--------------|-------------------------------------|
| description      | Text         | Short description of the transaction |
| amount           | Decimal      | Transaction value                    |
| type             | Enum         | `Credit` / `Debit`                   |
| transactionDate  | DateTime     | When the transaction occurred        |
| category         | Text         | Category name (e.g., Food, Bills)    |

### Setup
   ```bash
   npm install
   npm run develop
   ```
### Setup & Run
1. Install dependencies:
   ```bash
   npm install
2. Start Strapi server:
   ```bash
   npm run develop
3. Open admin panel→ http://localhost:1337/admin
4. Add sample data
5. Make sure Public role has permission to find transactions

### Frontend (Next.js)
- **Pages**
   **Dashboard (app/page.tsx)** – fetches transactions from Strapi and displays them in a table.

## Data Fetching & Technologies
  - Data Fetching
  - Uses Next.js App Router with `fetch` and `cache: "no-store"` for real-time server-side fetching.
  - Defensive coding ensures the UI won't crash if some fields are missing.

- **Technologies**
  - **Backend:** Strapi (SQLite by default)
  - **Frontend:** Next.js 13+ with TypeScript
  - **Styling:** Minimal UI, color highlights for credit (+) and debit (-)
  - **Data Flow:** Real-time sync between backend and frontend

- **Notes**
  - The dashboard updates immediately when transactions are added or edited.
  - Code is modular and clearly commented (in English).
  - Demonstrates Full-Stack concepts: data modeling, API consumption, filtering, summarizing, and UI logic.

- **Features**
  **Transaction Table**: lists all transactions with columns for Description, Amount, Type, Date, Category
    * Debit (expenses) shown in   **red** 
    * Credit (income) shown in **green**
  **Balance Summary**: displays total balance (sum of credits minus sum of debits) at the top
  **Filtering**: allows filtering by Debit, Credit, or both

- **Setup & Run**
  1. Install dependencies:
      ```bash
      npm install

  2. Create an environment configuration file:
      ```bash
     echo "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337" > .env.local

  3. Start development server:
      ```bash
      npm run dev

  4. Open 
     ```bash
     http://localhost:3000

- **UI Features**
  * **Transaction Table** displaying:
  * Description, Amount, Date, Category, Type
  * **Color Indicators:**
     - 🟢 Credit (income)
     - 🔴 Debit (expense)
  * **Balance Summary:** total credits − total debits
  * **Filtering:** show All / Only Credit / Only Debit
  * **Sorting:** newest ↔ oldest
  * **Automatic refresh** using SWR (no manual reload needed)

- **Architecture Decisions**
  **Data Fetching Strategy — Why SWR?**
 SWR was used to:
 * Automatically revalidate data when Strapi changes
 * Avoid manual refresh while keeping UI responsive
 * Cache results efficiently on the client
 This approach fits a dashboard where data updates reflect **in real time**.

- **Component Structure**
  
   app/page.tsx               → Page layout and state control <br>
   components/TransactionTable → Displays transactions <br>
   components/BalanceSummary   → Computes and shows total balance <br>
   components/FilterButtons    → UI for filtering by type <br>
   hooks/useTransactions.ts    → Custom hook for fetching, filtering, and auto-refresh (if used) <br>
  lib/getTransactions.ts      → Centralized API logic <br>
  types/transaction.ts        → Strong typing for data safety<br>
  lib/config.ts               → Centralized configuration (API_BASE_URL, REFRESH_INTERVAL)<br>

- **Error/Edge Handling**
  * Missing fields are handled gracefully
  * Invalid amounts fallback to 0
  * Empty state and loading indicators included

- **Future Enhancements (Optional)**
   * Category-based filtering
   * Charts and monthly summaries
   * Authentication and user-specific history
   * Pagination for large datasets


Author <br>
Tamar Mizrachi <br>
Full-Stack Developer <br>
📧 Email: t0583279405@gmail.com <br>
💻 GitHub: https://github.com/tamar-mizrachi <br>


