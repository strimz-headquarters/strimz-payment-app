# Strimz SDK - Product Requirements Document

## 📋 Document Information

**Project:** Strimz SDK npm Package
**Version:** 1.0.0
**Author:** Strimz Team
**Last Updated:** January 8, 2025
**Status:** Planning

---

## 1. Overview & Goals

### 1.1 Product Vision
The Strimz SDK is an npm package that enables businesses to seamlessly integrate cryptocurrency payment infrastructure into their platforms. Users will see a "Pay with Strimz" button on integrated platforms, allowing them to pay for utility bills, airtime, data bundles, and cable TV subscriptions using USDC and USDT.

### 1.2 Primary Goals
- **Easy Integration:** Businesses can integrate Strimz in under 10 minutes
- **Developer Experience:** Clean API, TypeScript support, comprehensive documentation
- **Reliability:** 99.9% uptime, robust error handling, automatic retries
- **Security:** PCI-compliant, secure key management, signature verification
- **Framework Agnostic:** Works with React, Vue, Angular, vanilla JS, and server-side Node.js

### 1.3 Success Criteria
- 100+ businesses integrated within 6 months
- Average integration time < 10 minutes
- Developer satisfaction score > 4.5/5
- Zero security incidents
- API response time < 500ms (p95)

---

## 2. Target Audience

### 2.1 Primary Users
- **Full-stack Developers** building fintech or utility payment platforms
- **Frontend Developers** integrating payment buttons
- **Backend Developers** implementing payment verification and webhooks
- **DevOps Engineers** deploying payment infrastructure

### 2.2 Business Types
- E-commerce platforms
- Utility bill payment aggregators
- Mobile app developers (React Native support in future)
- SaaS platforms wanting crypto payments
- Fintech startups

### 2.3 Technical Proficiency
- **Beginner:** Can follow installation guide and basic examples
- **Intermediate:** Can customize payment flows and handle errors
- **Advanced:** Can implement complex workflows, multi-service payments, and custom UIs

---

## 3. Core Features & Requirements

### 3.1 Must-Have Features (MVP)

#### 3.1.1 Payment Initialization
- Initialize payment with amount, service type, and metadata
- Support for USDC and USDT stablecoins
- Wallet connection (MetaMask, WalletConnect, Coinbase Wallet)
- Payment modal UI with customizable branding
- Real-time transaction status updates

#### 3.1.2 Service Types Support
- **Electricity:** Prepaid and postpaid meter payments
- **Airtime:** Mobile network top-ups (MTN, Airtel, Glo, 9mobile)
- **Data:** Internet data bundle purchases
- **Cable TV:** DSTV, GOTV, Startimes, Showmax subscriptions

#### 3.1.3 Error Handling
- Graceful error messages
- Automatic retry for transient failures
- Detailed error codes for debugging
- Network error recovery

#### 3.1.4 Webhook Integration
- Signature verification
- Event types (payment.success, payment.failed, payment.pending, refund.processed)
- Retry mechanism for failed webhooks
- Test webhook simulation

#### 3.1.5 Transaction Verification
- Server-side transaction verification
- Status polling
- Receipt generation
- Transaction history retrieval

### 3.2 Nice-to-Have Features (Post-MVP)
- Subscription payments
- Bulk payments
- Payment links
- QR code payments
- Mobile SDK (React Native)
- Custom token support (beyond USDC/USDT)
- Multi-language support
- Currency conversion

### 3.3 Non-Functional Requirements
- **Performance:** < 500ms API response time (p95)
- **Availability:** 99.9% uptime
- **Security:** PCI DSS compliant, encrypted data transmission
- **Scalability:** Handle 1000+ concurrent transactions
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js Support:** v16, v18, v20, v22
- **Bundle Size:** < 150KB gzipped

---

## 4. Technical Architecture

### 4.1 Package Structure
```
@strimz/sdk/
├── dist/                    # Compiled output
│   ├── index.js            # ESM build
│   ├── index.cjs           # CommonJS build
│   ├── index.d.ts          # TypeScript declarations
│   └── server.js           # Server-only exports
├── src/
│   ├── core/
│   │   ├── StrimzSDK.ts    # Main SDK class
│   │   ├── StrimzServer.ts # Server-side SDK
│   │   └── config.ts       # Configuration management
│   ├── components/
│   │   ├── PaymentModal.tsx    # Payment UI modal
│   │   ├── StrimzButton.tsx    # "Pay with Strimz" button
│   │   └── WalletConnector.tsx # Wallet connection UI
│   ├── services/
│   │   ├── api.ts          # API client
│   │   ├── blockchain.ts   # Blockchain interactions
│   │   └── wallet.ts       # Wallet management
│   ├── utils/
│   │   ├── errors.ts       # Error classes
│   │   ├── validation.ts   # Input validation
│   │   └── retry.ts        # Retry logic
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   └── index.ts            # Main entry point
├── package.json
├── tsconfig.json
├── README.md
└── CHANGELOG.md
```

### 4.2 Technology Stack
- **Language:** TypeScript 5.x
- **Build Tool:** Vite / Rollup
- **Testing:** Vitest + Testing Library
- **Blockchain:** Wagmi, Viem, Ethers.js
- **UI Framework:** React (with framework adapters for Vue/Angular)
- **Bundler:** Dual ESM/CJS support
- **Documentation:** TypeDoc + Markdown

### 4.3 Dependencies
```json
{
  "dependencies": {
    "wagmi": "^2.x",
    "viem": "^2.x",
    "@tanstack/react-query": "^5.x",
    "axios": "^1.x",
    "zod": "^3.x"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "vitest": "^1.x",
    "@testing-library/react": "^14.x"
  }
}
```

---

## 5. API Design

### 5.1 Client-Side SDK

#### Initialization
```typescript
import { StrimzSDK } from '@strimz/sdk'

const strimz = new StrimzSDK({
  publicKey: 'STRZlive_your_public_key',
  environment: 'live' | 'test',
  debug?: boolean,
  onReady?: () => void
})
```

#### Payment Initialization
```typescript
interface PaymentOptions {
  amount: number                    // Amount in cents
  currency: 'USD'
  serviceType: 'electricity' | 'airtime' | 'data' | 'cable'
  customerEmail: string
  metadata?: Record<string, any>    // Service-specific data
  onSuccess?: (result: PaymentResult) => void
  onError?: (error: PaymentError) => void
  onClose?: () => void
}

const result = await strimz.initializePayment(options)
```

#### React Components
```typescript
import { StrimzButton, StrimzProvider } from '@strimz/sdk/react'

// Wrap app with provider
<StrimzProvider publicKey="..." environment="live">
  <App />
</StrimzProvider>

// Use button component
<StrimzButton
  amount={5000}
  serviceType="electricity"
  metadata={{ meterNumber: "123456" }}
  onSuccess={(result) => console.log(result)}
>
  Pay with Strimz
</StrimzButton>
```

### 5.2 Server-Side SDK

#### Initialization
```typescript
import { StrimzServer } from '@strimz/sdk/server'

const strimzServer = new StrimzServer({
  secretKey: process.env.STRIMZ_SECRET_KEY,
  environment: 'live' | 'test'
})
```

#### Transaction Verification
```typescript
const transaction = await strimzServer.verifyTransaction(transactionId)

interface Transaction {
  id: string
  status: 'success' | 'failed' | 'pending'
  amount: number
  currency: string
  serviceType: string
  receipt?: {
    tokenCode?: string
    units?: string
    providerRef?: string
  }
  createdAt: string
  updatedAt: string
}
```

#### Webhook Signature Verification
```typescript
import { verifyWebhookSignature } from '@strimz/sdk/server'

const isValid = verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookSecret: string
)
```

### 5.3 Types & Interfaces

```typescript
// Payment result
interface PaymentResult {
  status: 'success' | 'failed' | 'pending'
  transactionId: string
  amount: number
  currency: string
  serviceType: string
  receipt?: {
    tokenCode?: string
    units?: string
    providerRef?: string
  }
  timestamp: string
}

// Error types
class StrimzError extends Error {
  code: string
  details?: Record<string, any>
}

class PaymentError extends StrimzError {}
class AuthenticationError extends StrimzError {}
class ValidationError extends StrimzError {}
class NetworkError extends StrimzError {}

// Service-specific metadata types
interface ElectricityMetadata {
  meterNumber: string
  providerCode: string
  customerName?: string
  customerAddress?: string
}

interface AirtimeMetadata {
  phoneNumber: string
  network: 'MTN' | 'Airtel' | 'Glo' | '9mobile'
}

interface DataMetadata {
  phoneNumber: string
  network: string
  planCode: string
}

interface CableMetadata {
  smartCardNumber: string
  provider: 'DSTV' | 'GOTV' | 'Startimes' | 'Showmax'
  packageCode: string
  customerName?: string
}
```

---

## 6. Component Structure

### 6.1 Payment Modal
- Wallet selection screen
- Amount confirmation
- Transaction progress indicator
- Success/failure states
- Animated transitions
- Mobile responsive
- Dark mode support

### 6.2 "Pay with Strimz" Button
- Customizable text and styling
- Loading states
- Disabled states
- Icon customization
- Size variants (small, medium, large)

### 6.3 Wallet Connector
- MetaMask integration
- WalletConnect support
- Coinbase Wallet support
- Wallet switching
- Network switching
- Balance display

---

## 7. Installation & Setup

### 7.1 Installation
```bash
npm install @strimz/sdk
# or
yarn add @strimz/sdk
# or
pnpm add @strimz/sdk
```

### 7.2 Environment Setup
```env
# .env.local
NEXT_PUBLIC_STRIMZ_PUBLIC_KEY=STRZlive_...
STRIMZ_SECRET_KEY=STRZ_...
STRIMZ_WEBHOOK_SECRET=whsec_...
```

### 7.3 Quick Start (< 5 minutes)
1. Install package
2. Get API keys from dashboard
3. Initialize SDK with public key
4. Add payment button
5. Test in test mode

---

## 8. Error Handling

### 8.1 Error Codes

| Code | HTTP Status | Description | Retry? |
|------|-------------|-------------|--------|
| `INVALID_API_KEY` | 401 | Invalid or missing API key | No |
| `EXPIRED_API_KEY` | 401 | API key expired | No |
| `INSUFFICIENT_BALANCE` | 400 | Insufficient wallet funds | No |
| `TRANSACTION_REJECTED` | 400 | User rejected transaction | No |
| `NETWORK_ERROR` | 503 | Blockchain network error | Yes |
| `INVALID_AMOUNT` | 400 | Invalid payment amount | No |
| `INVALID_SERVICE_TYPE` | 400 | Unsupported service type | No |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Yes |

### 8.2 Retry Strategy
- Automatic retry for network errors (max 3 attempts)
- Exponential backoff (1s, 2s, 4s)
- Configurable retry behavior
- User-friendly error messages

---

## 9. Testing Strategy

### 9.1 Unit Tests
- API client functions
- Validation logic
- Error handling
- Utility functions
- Target: 80%+ code coverage

### 9.2 Integration Tests
- Payment flow end-to-end
- Webhook verification
- Transaction verification
- Multi-service payments

### 9.3 E2E Tests (Playwright)
- Complete payment flow with real wallet
- Error scenarios
- Mobile responsive testing

### 9.4 Test Mode
- Test API keys (STRZtest_)
- Simulated transactions
- Webhook testing
- No real money charged

---

## 10. Documentation Requirements

### 10.1 README.md
- Quick start guide
- Installation instructions
- Basic examples
- Links to full docs

### 10.2 API Reference
- All methods and parameters
- TypeScript type definitions
- Code examples for each method
- Error codes reference

### 10.3 Guides
- Getting Started (done ✓)
- Authentication (done ✓)
- Payment Integration (done ✓)
- Webhooks (done ✓)
- Error Handling (done ✓)
- Migration guides
- Best practices

### 10.4 Examples
- Next.js app router example
- React SPA example
- Vue.js example
- Vanilla JS example
- Express server example
- Webhook handler examples

---

## 11. Security Requirements

### 11.1 Key Management
- Public keys safe for client-side
- Secret keys server-side only
- Environment variable storage
- No hardcoded keys
- Key rotation support

### 11.2 Data Transmission
- HTTPS only
- Encrypted payloads
- Signature verification for webhooks
- No sensitive data in URLs

### 11.3 Input Validation
- Zod schema validation
- Amount limits ($1 - $10,000)
- Email validation
- Phone number validation
- Metadata sanitization

---

## 12. Success Metrics

### 12.1 Adoption Metrics
- Weekly active integrations
- New integration signups
- Integration completion rate
- Time to first successful payment

### 12.2 Technical Metrics
- API response time (p50, p95, p99)
- Error rate
- Payment success rate
- Webhook delivery rate
- SDK bundle size

### 12.3 Developer Experience
- Documentation page views
- Support ticket volume
- GitHub issues
- Developer satisfaction surveys
- Integration time (target: < 10 minutes)

---

## 13. Timeline & Milestones

### Phase 1: MVP (Weeks 1-4)
- Week 1: Core SDK architecture, TypeScript types, API client
- Week 2: Payment modal UI, wallet integration, blockchain logic
- Week 3: Server SDK, webhook verification, transaction verification
- Week 4: Testing, bug fixes, documentation

### Phase 2: Beta Launch (Week 5-6)
- Week 5: Beta testing with 5-10 partners, bug fixes
- Week 6: Documentation refinement, examples, polish

### Phase 3: Public Launch (Week 7-8)
- Week 7: Public npm release, marketing materials
- Week 8: Support, monitoring, iteration based on feedback

### Phase 4: Post-Launch (Week 9+)
- Framework adapters (Vue, Angular)
- Advanced features (subscriptions, bulk payments)
- Mobile SDK (React Native)
- Performance optimizations

---

## 14. Package Publishing

### 14.1 npm Package Details
```json
{
  "name": "@strimz/sdk",
  "version": "1.0.0",
  "description": "Accept crypto payments for utility bills, airtime, data, and subscriptions",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./server": {
      "import": "./dist/server.js",
      "require": "./dist/server.cjs",
      "types": "./dist/server.d.ts"
    },
    "./react": {
      "import": "./dist/react.js",
      "require": "./dist/react.cjs",
      "types": "./dist/react.d.ts"
    }
  },
  "keywords": [
    "strimz",
    "crypto",
    "payment",
    "usdc",
    "usdt",
    "utility-bills",
    "airtime",
    "blockchain"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/strimz-headquarters/strimz-sdk.git"
  },
  "bugs": {
    "url": "https://github.com/strimz-headquarters/strimz-sdk/issues"
  },
  "homepage": "https://docs.strimz.io",
  "license": "MIT"
}
```

### 14.2 Release Process
1. Version bump (semantic versioning)
2. Update CHANGELOG.md
3. Run full test suite
4. Build package (`npm run build`)
5. Test package locally (`npm link`)
6. Publish to npm (`npm publish`)
7. Create GitHub release
8. Update documentation site
9. Announce on social media

---

## 15. Support & Maintenance

### 15.1 Support Channels
- Email: support@strimz.io
- GitHub Issues: Bug reports and feature requests
- Discord Community: Real-time developer help
- Documentation: Self-service guides

### 15.2 Maintenance Plan
- Monthly dependency updates
- Security patches within 24 hours
- Bug fix releases within 1 week
- Feature releases monthly
- Breaking changes only in major versions

---

## 16. Risks & Mitigation

### 16.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Blockchain network congestion | High | Retry logic, user communication |
| Wallet compatibility issues | Medium | Extensive testing, fallback options |
| Bundle size too large | Medium | Code splitting, tree shaking |
| Breaking changes in dependencies | Medium | Lock versions, test upgrades |

### 16.2 Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low adoption | High | Developer marketing, great DX |
| Competition | Medium | Unique features, best-in-class docs |
| Security breach | Critical | Regular audits, bug bounty program |
| Regulatory changes | Medium | Legal compliance, adaptability |

---

## 17. Future Enhancements

### 17.1 Q2 2025
- Vue.js adapter
- Angular adapter
- Payment links (no-code integration)
- Subscription payments

### 17.2 Q3 2025
- React Native SDK
- Bulk payment processing
- Custom token support
- Multi-currency support

### 17.3 Q4 2025
- Payment terminal SDK
- Advanced analytics dashboard
- White-label solution
- Enterprise features

---

## Appendix

### A. Glossary
- **USDC**: USD Coin, a stablecoin pegged to the US dollar
- **USDT**: Tether, a stablecoin pegged to the US dollar
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Interface for Ethereum
- **Webhook**: HTTP callback for event notifications
- **API Key**: Authentication credential for API access

### B. References
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Strimz Platform](https://strimz.io)
- [Strimz API Docs](https://docs.strimz.io)

---

**Document Version:** 1.0
**Prepared by:** Strimz Development Team
**Date:** January 8, 2025
