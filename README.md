# Strimz Subscription Platform

A modern DeFi payment gateway that enables seamless cryptocurrency payments for Web2 subscriptions and recurring services. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 📋 Overview

Strimz Subscription Platform is a comprehensive payment solution that bridges the gap between cryptocurrency and traditional subscription services. Users can pay for their utility bills, subscriptions, and services using crypto (USDC/USDT), while businesses receive payments in their preferred currency.

### Key Features

#### For Users
- 🏠 **Personalized Dashboard** - Track transactions, manage subscriptions, and monitor spending
- 💳 **Utility Bill Payments** - Pay for electricity, data, airtime, and cable TV subscriptions
- 📱 **Subscription Management** - Manage all your active subscriptions in one place
- 📊 **Transaction History** - Detailed transaction logs with filtering and search capabilities
- 🔐 **Secure Account Management** - Profile settings with password management and account security
- 💰 **Multi-Token Support** - Pay with USDC or USDT
- 🎉 **Instant Confirmations** - Real-time payment confirmations with confetti animations

#### For Businesses
- 📈 **Business Dashboard** - Comprehensive analytics and transaction monitoring
- 👥 **Customer Management** - Track and manage customer relationships
- 🔑 **API Integration** - RESTful API with key management
- 🌐 **Webhook Support** - Real-time event notifications
- 🛡️ **IP Whitelisting** - Enhanced security with IP-based access control
- 👨‍💼 **Team Management** - Multi-user access with role-based permissions
- 💼 **Payment Processing** - Accept crypto payments, receive fiat

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Shadcn/ui
- **Form Management:** React Hook Form + Zod validation
- **State Management:** TanStack Query (React Query)
- **Animations:** Framer Motion, React Confetti
- **Icons:** React Icons, Lucide React

### Web3 Integration
- **Wallet Connection:** Reown AppKit (formerly WalletConnect)
- **Web3 Library:** Wagmi, Viem
- **Supported Networks:** Ethereum, Polygon, BSC

### Additional Libraries
- **Charts:** Recharts
- **Notifications:** Sonner
- **QR Codes:** qrcode.react
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

## 🎨 Features Breakdown

### User Dashboard
- **Transaction Summary** - Recent payment activities with status indicators
- **Quick Actions** - Fast access to bill payments and subscriptions
- **Wallet Integration** - Connect and manage crypto wallets
- **Payment History** - Comprehensive transaction logs with filters

### Utility Bill Payments
- **Airtime Top-up** - Purchase mobile airtime with crypto
- **Data Bundles** - Buy internet data plans
- **Electricity Bills** - Pay for prepaid/postpaid meters
- **Cable TV Subscriptions** - DSTV, GOTV, Startimes subscriptions

### Subscription Management
- **Active Subscriptions** - View and manage ongoing subscriptions
- **Subscription History** - Track expired and cancelled subscriptions
- **Renewal Management** - Quick renewal options
- **Plan Updates** - Change subscription plans

### Business Dashboard
- **Analytics** - Revenue tracking and customer insights
- **API Management** - Generate and manage API keys
- **Webhooks** - Configure webhook endpoints for events
- **Team Collaboration** - Add team members with roles

## 🔒 Security Features

- Zod schema validation for all forms
- IP whitelisting for business accounts
- Secure password requirements (min 8 chars, uppercase, numbers)
- Protected routes and authentication flows
- Environment variable encryption

## 🎯 Payment Flow

1. **User Selection** - Choose service (airtime, data, bills, etc.)
2. **Form Completion** - Enter payment details and amount
3. **Token Selection** - Choose USDC or USDT
4. **Wallet Connection** - Connect crypto wallet
5. **Transaction Confirmation** - Approve blockchain transaction
6. **Success Notification** - Confetti animation and confirmation

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/strimz-headquarters/strimz-sdk)

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting provider.

3. Set environment variables in your hosting dashboard.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new files
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
