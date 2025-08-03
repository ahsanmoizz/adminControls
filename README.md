# 🛠️ Chat-Payment Admin Panel

This is the official **Admin Panel** for the [`chat-payment-app`](https://github.com/your-org/chat-payment-app). It provides backend administrative controls for monitoring, managing, and securing all payment operations within the Chat-Payment ecosystem.

---

## 📦 Repositories Required

To run the complete system, clone and integrate both:

- [`chat-payment`](https://github.com/ahsanmoizz/chat-payment) – Core user-facing payment chat interface  
- [`adminControls`](https://github.com/ahsanmoizz/adminControls) – This admin control panel

---

## ✨ Key Features

### 📊 **Subscription Management**
- Create, edit, and delete **Plans**
- Assign or revoke **User Subscriptions**
- View all active/inactive subscriptions

### 💸 **Fee Configuration**
- Set **EVM Fees** and **Non-EVM Fees** from a dedicated tab
- Automatically apply new fee structures to user transactions

### 🧾 **Payment & Transaction Monitoring**
- View detailed **User Payment History**
- **Trace Transactions** in case of:
  - Mishaps
  - Refund issues
  - Suspicious or **illegal activity**

### 🔄 **Admin Withdrawals**
- Withdraw accumulated **EVM network fees**
- Track total collected amounts per chain
- View logs of all admin-level withdrawal actions

### 🔧 **API Configuration**
- Update third-party API keys (e.g., payment providers) directly via the panel
- Live/test environment toggling

### 🔐 **Role-Based Access Control**
- Assign roles: `Admin`, `Super Admin`, `Support`, `Viewer`
- **Block unauthorized access**
- View logs and attempt histories in the **Short Control Room**

---

## 🚀 Getting Started

```bash
git clone https://github.com/ahsanmoizz/adminControls
cd adminControls
npm install
npm run dev
Ensure the main app (chat-payment) is running and connected via the configured APIs.

📁 Folder Structure
bash
Copy
Edit
📦 chat-payment-admin-panel
 ┣ 📂  client      # Shared UI Components
 ┣ 📂 imports         # imports  (links, etc.)
 ┣ 📂 server            # By default for framework
 ┣ 📂 tests         # test components here
 ┣ 📄 .env.example     # Environment variable config
 ┗ 📄 README.md
🔐 Security Notes
All actions are protected by role-based access

Suspicious activity logs and unauthorized attempts are available under the Control Room tab

Only authorized admins can modify APIs or fees

✅ Admin Panel Tabs Overview
Tab Name	Description
EVM Fees	Configure per-chain fees
Non-EVM Fees	Adjust fiat/other network fees
Subscriptions	Manage user plans and subscription types
Users	View user profiles & payment data
Transaction Trace	Audit trail for all transactions
Admin Withdrawals	Withdraw collected EVM fees
API Settings	Change third-party keys
Control Room	Block/unblock access, log viewer

📬 Feedback & Issues
If you find a bug or have feature requests, please open an issue.
