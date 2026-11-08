<h1 align="center">⚡ nxt-v2</h1>

<p align="center">
A production-ready starter for <b>Telegram Mini Apps (TWA)</b> built with <b>Next.js 16</b>, <b>Auth.js v5</b>, <b>Prisma</b>, <b>PostgreSQL</b>, and <b>Feature-Sliced Design (FSD)</b>.
</p>

<p align="center">
<a href="https://t.me/nxt_v2_bot/nxtemplate"><b>🪐 Live Demo</b></a>
</p>

---

> [!NOTE]
> This template removes most of the usual Web2 setup. No passwords, no email verification, and no domain payments. Users log in with native Telegram auth (`initData` cryptographic validation).

> [!IMPORTANT]
> The app supports **Telegram Stars** for in-app payments. Payouts go straight to your TON wallet through Fragment.

> [!TIP]
> The project uses **Feature-Sliced Design (FSD)**. Each layer has a clear job, so the code stays clean as the app grows.

---

## ✨ Features

<table>
  <thead>
    <tr>
      <th width="280" align="left">Feature</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="280"><b>Telegram Auth</b></td>
      <td>Secure login with cryptographic validation of Telegram data.</td>
    </tr>
    <tr>
      <td width="280"><b>Telegram Stars</b></td>
      <td>Native in-app payments and monetization.</td>
    </tr>
    <tr>
      <td width="280"><b>Flat FSD Routing</b></td>
      <td>Simple routing that follows FSD rules.</td>
    </tr>
    <tr>
      <td width="280"><b>Dynamic UI Sync</b></td>
      <td>The interface follows Telegram theme colors.</td>
    </tr>
    <tr>
      <td width="280"><b>Haptic Feedback</b></td>
      <td>Fast, smooth interface with native touch feedback.</td>
    </tr>
    <tr>
      <td width="280"><b>Admin Panel</b></td>
      <td>Enterprise-level admin panel inside Telegram.</td>
    </tr>
    <tr>
      <td width="280"><b>Rate Limiting</b></td>
      <td>No extra infrastructure needed.</td>
    </tr>
  </tbody>
</table>

---

## 🛠 Tech Stack

<table>
  <thead>
    <tr>
      <th width="220" align="left">Area</th>
      <th align="left">Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="220"><b>Framework</b></td>
      <td>Next.js 16 (App Router)</td>
    </tr>
    <tr>
      <td width="220"><b>UI</b></td>
      <td>React 19</td>
    </tr>
    <tr>
      <td width="220"><b>Telegram Types</b></td>
      <td><code>@types/telegram-webapp</code> (strict typing)</td>
    </tr>
    <tr>
      <td width="220"><b>Authentication</b></td>
      <td>Auth.js v5 with a custom provider</td>
    </tr>
    <tr>
      <td width="220"><b>Database & ORM</b></td>
      <td>PostgreSQL, Prisma</td>
    </tr>
    <tr>
      <td width="220"><b>State</b></td>
      <td>Zustand (client), TanStack Query v5 (server)</td>
    </tr>
    <tr>
      <td width="220"><b>Forms</b></td>
      <td>React Hook Form + Zod</td>
    </tr>
    <tr>
      <td width="220"><b>UI Components</b></td>
      <td>shadcn/ui + Radix UI</td>
    </tr>
    <tr>
      <td width="220"><b>Styling</b></td>
      <td>Tailwind CSS 4</td>
    </tr>
    <tr>
      <td width="220"><b>Testing & CI</b></td>
      <td>Vitest, GitHub Actions</td>
    </tr>
    <tr>
      <td width="220"><b>Architecture</b></td>
      <td>Feature-Sliced Design</td>
    </tr>
  </tbody>
</table>

---

## 🚀 Installation

<details>
<summary><b>Step-by-step guide</b></summary>

<br>

**1. Clone the repository**

```bash
git clone https://github.com/nfluvv/nxt-v2
cd nxt-v2
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env
```

Fill in the values in `.env`: PostgreSQL connection string, Auth.js secret, and `TELEGRAM_BOT_TOKEN` from `@BotFather`.

**4. Set up the database**

Make sure PostgreSQL is running, then run:

```bash
npx prisma generate
npx prisma migrate dev
```

**5. Start the dev server**

To test the app inside Telegram, you need a public HTTPS URL. Use a tunnel like `ngrok`:

```bash
# Start the dev server (port 3000)
npm run dev

# In a second terminal, start the tunnel
npx ngrok http 3000
```

Copy the `https://...ngrok-free.app` URL. Then:

1. Add it to `.env` as `NEXTAUTH_URL`.
2. Set the same URL as the Mini App link in `@BotFather`.
3. Open your bot on your phone. HMR updates your code instantly.

</details>

<details>
<summary><b>Prisma Studio (database viewer)</b></summary>

<br>

Use it to check users, view transactions, or change roles by hand:

```bash
npx prisma studio
```

</details>

---

## 🏗 Architecture

> [!TIP]
> Each layer can only import from the layers below it. This keeps the code simple to read and easy to scale.

<details>
<summary><b>Project structure</b></summary>

<br>

```text
src/
├── app/          # Entry points, providers, styles, and layouts
├── views/        # Screen-level compositions
├── widgets/      # Reusable UI blocks that connect features and entities
├── features/     # User actions, payments, and business logic
├── entities/     # Domain models, Prisma queries, and state
├── shared/       # UI kit, TWA SDK hooks, and API clients
└── auth.ts       # Custom Telegram data validation for login

app/              # Next.js routing layer
```

</details>

---

## 💰 License

Released under the **Apache 2.0 License**. The full text is in the repository.
