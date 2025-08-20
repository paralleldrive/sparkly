# Requirements Definition Document: Authentication Strategy

## Document Information
- **Version**: 1.0
- **Date**: August 2025
- **Status**: Draft
- **Owner**: Product Team

## Executive Summary

This document defines the authentication strategy for Sparkly, prioritizing passkey authentication as the primary sign-in mechanism while maintaining email magic links as a reliable fallback for account recovery and device management.

## Goals & Objectives

### Primary Goals
- Implement passkey-first authentication for enhanced security and user experience
- Maintain email magic links as reliable fallback for account recovery
- Ensure seamless onboarding for new users
- Support cross-device authentication scenarios

### Success Metrics
- 80%+ of returning users authenticate via passkey
- <5% authentication failure rate
- <30 second average sign-in time
- Support for all major browsers and devices

## User Personas & Use Cases

### Primary User: Course Learner
- Wants quick, secure access to course content
- May access from multiple devices (mobile, desktop)
- Values convenience over complex security setup

### Use Cases
1. **New User Registration**: First-time user wants to access course content
2. **Returning User**: Existing user wants to sign in on familiar device
3. **New Device Access**: Existing user wants to access from new device
4. **Account Recovery**: User lost access to passkey device

## Authentication Flow Requirements

### 1. Sign-Up Flow

#### 1.1 New User Registration
**Trigger**: User clicks "Sign Up" or attempts to access protected content

**Flow**:
1. **Email Collection**
   - Prompt user for email address
   - Validate email format
   - Check if email already exists
   
2. **Magic Link Authentication**
   - Send magic link to provided email
   - Link expires after 15 minutes
   - Link is single-use only
   
3. **Email Verification & Account Creation**
   - User clicks magic link
   - Validate link authenticity and expiration
   - Create user account with verified email
   
4. **Passkey Setup (Mandatory)**
   - Present passkey registration prompt
   - Explain benefits: "Sign in instantly next time"
   - Create passkey using WebAuthn API
   - Store passkey credential ID and public key
   - Mark account as passkey-enabled

**Success Criteria**:
- User successfully creates account
- Email is verified
- Passkey is registered
- User is redirected to course content

**Error Handling**:
- Invalid email format → Show inline validation error
- Email already exists → Redirect to sign-in flow
- Magic link expired → Offer to resend new link
- Passkey creation failed → Allow retry, fallback to magic link only

#### 1.2 Magic Link Reuse Prevention
**Requirement**: Given a user attempting to use the same magic link twice

**Behavior**:
- Display message: "This link has already been used"
- Offer two options:
  1. "Sign in with passkey" (if passkey exists)
  2. "Send new magic link"

### 2. Sign-In Flow

#### 2.1 Primary Authentication (Passkey)
**Trigger**: User visits sign-in page or attempts to access protected content

**Flow**:
1. **Passkey Prompt**
   - Display "Sign in with passkey" as primary option
   - Show browser's WebAuthn authentication dialog
   - Verify passkey against stored credentials
   
2. **Successful Authentication**
   - Redirect to course content landing page
   - Set authentication session
   - Update last sign-in timestamp

**Fallback Option**:
- Link: "Don't have your passkey? Sign in with email"

#### 2.2 Fallback Authentication (Magic Link)
**Trigger**: User clicks "Sign in with email" fallback option

**Flow**:
1. **Email Collection**
   - Prompt for email address
   - Validate email exists in system
   
2. **Magic Link Dispatch**
   - Send magic link to email
   - Link expires after 15 minutes
   - Link is single-use only
   
3. **Magic Link Authentication**
   - User clicks magic link
   - Validate link authenticity and expiration
   - Authenticate user session
   
4. **Post-Authentication Flow**
   - If user has existing passkey: Redirect to course content
   - If user has no passkey: Prompt for passkey setup (optional)
   - Redirect to course content landing page

**Error Handling**:
- Email not found → Redirect to sign-up flow
- Magic link expired → Offer to resend new link
- Invalid link → Show error with option to request new link

### 3. Device Management Flow

#### 3.1 New Device Access
**Scenario**: Existing user wants to access account from new device

**Flow**:
1. User attempts passkey authentication → No passkey available
2. User clicks "Sign in with email"
3. Complete magic link authentication
4. After successful auth, prompt: "Set up passkey for this device?"
5. Optional passkey registration for new device

#### 3.2 Email Change Flow
**Scenario**: User wants to change their email address

**Requirements**:
- Must authenticate with current passkey OR current email magic link
- Send verification to new email address
- Maintain existing passkeys after email change
- Update email in user profile

## Technical Requirements

### 3.1 Security Requirements

#### Passkey Implementation
- **Standard**: WebAuthn Level 2 compliance
- **Authenticator Requirements**: 
  - Platform authenticators preferred (Touch ID, Face ID, Windows Hello)
  - Cross-platform authenticators supported (security keys)
- **User Verification**: Required for all passkey operations
- **Attestation**: None required (for broader compatibility)

#### Magic Link Security
- **Expiration**: 15 minutes maximum
- **Single Use**: Links invalidated after first use
- **Entropy**: Minimum 256 bits of randomness
- **Rate Limiting**: Maximum 3 links per email per hour
- **HTTPS**: All magic links must use HTTPS

#### Session Management
- **Session Duration**: 30 days for passkey auth, 7 days for magic link auth
- **Session Storage**: Secure HTTP-only cookies
- **CSRF Protection**: Required for all authenticated endpoints

### 3.2 Data Storage Requirements

#### User Profile Schema
```json
{
  "userId": "uuid",
  "email": "string",
  "emailVerified": "boolean",
  "createdAt": "timestamp",
  "lastSignIn": "timestamp",
  "passkeys": [
    {
      "credentialId": "string",
      "publicKey": "string",
      "counter": "number",
      "deviceName": "string", // optional
      "createdAt": "timestamp"
    }
  ]
}
```

#### Magic Link Schema
```json
{
  "token": "string",
  "email": "string",
  "expiresAt": "timestamp",
  "used": "boolean",
  "createdAt": "timestamp"
}
```

### 3.3 API Endpoints

#### Authentication Endpoints
- `POST /auth/signup` - Email collection for signup
- `POST /auth/magic-link` - Send magic link
- `GET /auth/verify/:token` - Verify magic link
- `POST /auth/passkey/register` - Register new passkey
- `POST /auth/passkey/authenticate` - Authenticate with passkey
- `POST /auth/logout` - Sign out user
- `GET /auth/me` - Get current user info

#### Management Endpoints
- `GET /auth/passkeys` - List user's passkeys
- `DELETE /auth/passkeys/:id` - Remove passkey
- `PUT /auth/email` - Change email address

### 3.4 Browser & Device Support

#### Minimum Requirements
- **Chrome**: 67+
- **Firefox**: 60+
- **Safari**: 14+
- **Edge**: 18+
- **Mobile**: iOS 14+, Android 7+

#### Graceful Degradation
- If passkeys not supported → Default to magic link only
- Clear messaging about browser compatibility
- Progressive enhancement approach

## User Experience Requirements

### 4.1 Interface Design

#### Sign-In Page
- Prominent "Sign in with passkey" button (primary CTA)
- Secondary link: "Sign in with email instead"
- Clear visual hierarchy
- Loading states for all authentication attempts

#### Sign-Up Page
- Email input with real-time validation
- Clear explanation of authentication flow
- Privacy policy and terms of service links

#### Post-Authentication
- Immediate redirect to course content (no intermediate pages)
- Success messaging for new passkey setup
- Clear indication of authentication state

### 4.2 Error Messaging

#### User-Friendly Error Messages
- "Something went wrong" → "We couldn't sign you in. Please try again."
- "Invalid credentials" → "We don't recognize this passkey. Try signing in with email."
- "Network error" → "Check your internet connection and try again."

#### Recovery Guidance
- Always provide clear next steps
- Offer alternative authentication methods
- Include contact support option for persistent issues

### 4.3 Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

## Implementation Phases

### Phase 1: Foundation (Sprint 1-2)
- [ ] Email magic link authentication
- [ ] Basic user account creation
- [ ] Session management
- [ ] Core UI components

### Phase 2: Passkey Integration (Sprint 3-4)
- [ ] WebAuthn passkey registration
- [ ] Passkey authentication
- [ ] Fallback flow integration
- [ ] Device management basics

### Phase 3: Polish & Edge Cases (Sprint 5-6)
- [ ] Magic link reuse prevention
- [ ] Comprehensive error handling
- [ ] Rate limiting implementation
- [ ] Security audit

### Phase 4: Enhancement (Sprint 7+)
- [ ] Multiple passkey support
- [ ] Device naming/management
- [ ] Email change flow
- [ ] Advanced security features

## Risk Assessment

### High Risk
- **Passkey Browser Support**: Mitigated by magic link fallback
- **User Education**: Mitigated by clear onboarding flow
- **Security Vulnerabilities**: Mitigated by security audit

### Medium Risk
- **User Adoption**: Mitigated by seamless UX design
- **Cross-Device Sync**: Mitigated by email fallback option

### Low Risk
- **Performance Impact**: Minimal with proper implementation
- **Maintenance Overhead**: Standard for authentication systems

## Success Criteria & KPIs

### Functional Requirements
- [ ] New users can complete full registration flow
- [ ] Existing users can authenticate via passkey
- [ ] Magic link fallback works reliably
- [ ] All error states are handled gracefully

### Performance Requirements
- Authentication success rate: >95%
- Page load time after auth: <3 seconds
- Magic link delivery time: <30 seconds
- Passkey authentication time: <10 seconds

### Security Requirements
- Zero authentication bypass vulnerabilities
- Proper session management
- Secure magic link generation
- Rate limiting effectiveness

## Appendices

### A. WebAuthn Configuration
```javascript
const publicKeyCredentialCreationOptions = {
  challenge: new Uint8Array(32),
  rp: {
    name: "Sparkly",
    id: "sparkly.app"
  },
  user: {
    id: userIdBytes,
    name: userEmail,
    displayName: userEmail
  },
  pubKeyCredParams: [
    { alg: -7, type: "public-key" }, // ES256
    { alg: -257, type: "public-key" } // RS256
  ],
  authenticatorSelection: {
    authenticatorAttachment: "platform",
    userVerification: "required"
  },
  timeout: 60000,
  attestation: "none"
};
```

### B. Magic Link Template
```
Subject: Sign in to Sparkly

Hi there!

Click the link below to sign in to your Sparkly account:

[Sign In Button]

This link will expire in 15 minutes and can only be used once.

If you didn't request this, you can safely ignore this email.

Best,
The Sparkly Team
```

### C. Error Code Reference
- `AUTH_001`: Invalid magic link token
- `AUTH_002`: Expired magic link
- `AUTH_003`: Magic link already used
- `AUTH_004`: Passkey registration failed
- `AUTH_005`: Passkey authentication failed
- `AUTH_006`: Rate limit exceeded
- `AUTH_007`: Invalid email format
- `AUTH_008`: Email not found
- `AUTH_009`: Browser not supported

---

**Document Status**: Ready for Review
**Next Review Date**: After implementation of Phase 1
**Stakeholders**: Engineering, Product, Design, Security Teams
