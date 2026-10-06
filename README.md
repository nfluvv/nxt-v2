# ⚡ nxt-v2 — Production-Ready Telegram Web Apps (TWA) Starter

A battle-tested, high-performance Telegram Mini Apps (TWA) framework built with **Next.js 16 (App Router)**, **Auth.js v5**, **Prisma ORM**, **PostgreSQL**, and structured around **Feature-Sliced Design (FSD)**.

Engineered to eliminate 90% of standard Web2 infrastructure overhead. No credentials, no email verification bottlenecks, and no domain paywalls. This architecture utilizes native Telegram authentication (`initData` cryptographic validation) and integrates seamlessly with the Telegram Stars ecosystem for frictionless in-app monetization, routing payouts directly to your TON wallet via Fragment.

**[🪐 Live Interactive Demo](<>)**

---

### 🛠 Engineered Features

- **Seamless Crypto-Validated Auth** — Zero credentials or traditional OAuth screens. Instantly decodes, parses, and cryptographically validates `window.Telegram.WebApp.initData` on the backend using your Bot Token via Node's native `crypto` module.
- **Native Telegram Stars Monetization** — Built-in integration with the Telegram Stars SDK. Generates native invoice links via the Bot API and handles secure asynchronous checkout webhooks (`pre_checkout_query` and `successful_payment`) to dynamically toggle user privilege states in PostgreSQL.
- **FSD-Compliant Flat Routing** — Simplified, high-performance routing matrix tailored for single-tenant TWA viewports. Completely strips out redundant Web2 route groups (`public`/`protected`) in favor of unified, centralized page topologies.
- **Dynamic Contextual UI/UX Sync** — Injected global hook listeners parsing `themeParams` from the Telegram window context. Automatically adapts components to match the active user's client theme configuration.
- **Haptic & Interface Acceleration** — Low-latency native mobile features integrated out of the box, utilizing Telegram's `HapticFeedback` triggers and viewport management methods (`ready()`, `expand()`).
- **Enterprise-Grade TWA Admin Panel** — Server-side management hub leveraging optimized cursor-based pagination, structural profile queries, granular administrative roles, and unalterable operation logs.
- **Zero-Infrastructure Rate Limiting** — In-house Token-Bucket protection layer running natively inside PostgreSQL to guarantee total route defense without spun-up Redis clusters.

---

### 🪐 Technical Stack

- **Framework Core:** Next.js 16 (App Router)
- **UI Runtime Environment:** React 19
- **TWA Context Type Drivers:** `@types/telegram-webapp` (Strict typings configuration)
- **Authentication Engine:** Auth.js v5 / NextAuth.js v5 Custom Provider
- **Database Engine:** PostgreSQL
- **Data Modeling Layer:** Prisma ORM
- **Application State Store:** Zustand
- **Asynchronous Server State:** TanStack Query v5 (React Query)
- **Validation Layer:** React Hook Form + Zod validation schemas
- **Component Foundations:** shadcn/ui + Radix UI Primitives
- **Styling Architecture:** Tailwind CSS 4 (Next-gen compiler infrastructure)
- **Test Suite Framework:** Vitest simulation space
- **CI/CD Pipeline Matrix:** GitHub Actions automation workflows

---

### 🚀 Production Installation

#### 1. Clone the Architecture Tree

```bash
git clone https://github.com/nfluvv/nxt-v2
cd nxt-v2
```

#### 2. Bootstrap Node Packages Workspace

```bash
npm install
```

#### 3. Establish Runtime Environment Configurations

Generate your localized environmental vector configuration file:

```bash
cp .env.example .env
```

Open `.env` and fill the variables: active PostgreSQL deployment connection string, your Auth.js security secret hash, and the official `TELEGRAM_BOT_TOKEN` generated from `@BotFather`.

#### 4. Sync Database Schemas & Structural Primitives

Ensure your localized PostgreSQL daemon instance is running, then execute:

```bash
# Generate localized type-safe Prisma client data models
npx prisma generate

# Create and deploy your local development schema migrations
npx prisma migrate dev
```

To visually inspect user states, review transaction records, or alter privileges manually, execute the schema client dashboard UI:

```bash
npx prisma studio
```

#### 5. Spin Up the Development Engine

To build and test the application directly inside Telegram, make your local workspace securely reachable from the web utilizing proxies like `ngrok`:

```bash
# Boot dev server locally (port 3000)
npm run dev

# In a separate terminal tab, hook up your secure network tunnel proxy
npx ngrok http 3000
```

Copy the secure `https://...ngrok-free.app` tunnel destination URL, insert it into your `.env` file under `NEXTAUTH_URL`, and drop the same URL address into your `@BotFather` Mini App endpoint configuration. Open your bot on your phone—HMR (Hot Module Replacement) updates code changes instantly.

---

### 🏗 Architecture & Codebase Topology

The code scales natively relying tightly on the strict **Feature-Sliced Design (FSD)** paradigm.

```text
src/
├── app/          # Global entry points, providers mapping, styling assets, and app layouts
├── views/        # Screen-level composition architectures and main app view layers
├── widgets/      # Compound reusable interface compounds connecting features and domains
├── features/     # Encapsulated user mutations, invoice triggers, and contextual actions
├── entities/     # Decoupled domain models, Prisma engine queries, and schema-level state blocks
├── shared/       # Reusable agnostic tools: UI Kit, TWA SDK Hooks, and network client engines
└── auth.ts       # Central runtime logic handling the custom cryptographic TWA data validator

app/              # Next.js physical file-system localization routing matrix
```

---

### 💰 Core License

- Open-source software deployed under the **Apache 2.0 License**. Full legal compliance text is verified in the repository tree.
