# Strimz Subscription Platform

A DeFi payment infrastructure that bridges cryptocurrency and everyday services. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 📋 Overview

Strimz is a dual-purpose platform:
- **B2C**: Individual users pay for utility bills (electricity, airtime, data, cable TV) using cryptocurrency
- **B2B**: Businesses integrate Strimz SDK to accept crypto payments while receiving fiat

## ✨ Core Features

### User Dashboard (B2C)
- Utility bill payments (electricity, airtime, data, cable TV)
- Subscription management with status tracking
- Transaction history with filtering
- Account settings and security
- USDC/USDT payment support

### Business Dashboard (B2B)
- API key management
- Webhook configuration
- Customer analytics and insights
- Team management with role-based access
- IP whitelisting
- Transaction monitoring

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI (Dialog, Select, Tabs, Accordion)
- **Forms:** React Hook Form + Zod validation
- **State:** TanStack Query (React Query)
- **Web3:** Wagmi, Viem, Reown AppKit
- **Animations:** Framer Motion, React Confetti
- **Icons:** Lucide React, React Icons
- **Notifications:** Sonner (Toast)
- **Charts:** Recharts
- **Tables:** TanStack Table

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/strimz-headquarters/strimz-sdk.git
cd strimz-sdk
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# App Configuration
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Web3 Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CHAIN_ID=1

# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
strimz-sdk/
├── app/
│   ├── (guest)/              # Public landing pages
│   ├── user/                 # B2C user dashboard routes
│   │   ├── dashboard/        # User overview and quick actions
│   │   ├── utility-bills/    # Airtime, data, electricity, cable TV
│   │   ├── subscriptions/    # Subscription management
│   │   ├── tx-history/       # Transaction history
│   │   └── account/          # User account settings
│   ├── business/             # B2B business dashboard routes
│   │   ├── dashboard/        # Business analytics
│   │   ├── api-keys/         # API key management
│   │   ├── webhooks/         # Webhook configuration
│   │   └── team/             # Team management
│   └── auth/                 # Authentication flows
├── components/
│   ├── guest/                # Landing page components
│   ├── user/                 # B2C dashboard components
│   └── business/             # B2B dashboard components
├── utils/                    # Utility functions and helpers
└── public/                   # Static assets
```

## 🔑 Key Development Patterns

### Form Validation
All forms use React Hook Form with Zod schemas for type-safe validation:
```typescript
const schema = z.object({
  email: z.string().email('Invalid email address'),
  amount: z.string().min(1, 'Amount is required')
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

### Dialog Components
Uses Radix UI Dialog with controlled state:
```typescript
const [isOpen, setIsOpen] = useState(false)

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Inline Editing
Account settings use inline edit pattern:
```typescript
const [isEditing, setIsEditing] = useState(false)
const [inputValue, setInputValue] = useState(currentValue)

// Save updates the state and exits edit mode
// Cancel resets inputValue and exits edit mode
```

## 🎨 Design System

- **Fonts**: Sora (headings), Poppins (body text)
- **Primary Color**: `#161318` (dark text)
- **Accent Color**: `#02C76A` (green - buttons, highlights)
- **Background**: White with subtle grays for sections
- **Component Library**: Radix UI for accessible primitives
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints

## 🌐 Deployment

**Build for production:**
```bash
npm run build
npm start
```

**Vercel (recommended):**
```bash
vercel
```

Set required environment variables in your deployment platform dashboard.

## 🤝 Development Guidelines

- Use TypeScript for all new files
- Follow existing component patterns (see components/business/Dashboard/Withdraw.tsx for dialog examples)
- Use Zod schemas for form validation
- Write meaningful commit messages
- Test changes before committing
