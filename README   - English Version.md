# DebtManagerAR — Full Debt Management System (Arabic Interface)

![Arabic RTL Support](https://img.shields.io/badge/RTL-Arabic-blue?style=for-the-badge&logo=google-chrome)
![Offline First](https://img.shields.io/badge/Offline-First-green?style=for-the-badge)
![No Backend](https://img.shields.io/badge/No%20Backend-%E2%9C%85-brightgreen?style=for-the-badge)

A complete, offline-first, Arabic-RTL web application for managing personal and business debts with intuitive UI, data visualization, reporting, and export capabilities.

## 💡 Overview

**DebtManagerAR** is a powerful, client-side debt tracking system designed for Arabic-speaking users. It helps individuals and small businesses track owed amounts, payment statuses, due dates, categories, and contacts — all in Arabic with full right-to-left (RTL) layout support.

No server required. All data is stored locally in the browser using `localStorage`, making it secure, fast, and accessible offline.

## ✨ Key Features

- **Arabic RTL Interface**: Fully localized for Arabic readers with proper text direction, date formats, and number rendering.
- **Dashboard Analytics**: Real-time statistics on total, pending, paid, and overdue debts.
- **Interactive Charts**: Visualize debt distribution by category and status using Chart.js (pie & bar charts).
- **Add/Edit/Delete Debts**: Full CRUD operations with form validation and confirmation modals.
- **Search & Filter**: Instantly find debts by name or filter by status (Pending/Paid/Overdue).
- **Export Data**: Download your entire debt database as a `.json` file for backup or migration.
- **Clear All Data**: Safely reset the entire database with a confirmation dialog to prevent accidental loss.
- **Reminder System**: Generate customizable reminder messages (copy-paste ready). Future versions will support email/SMS.
- **Settings Panel**: Set default currency, enable/disable notification reminders, and adjust alert days before due date.
- **Responsive Design**: Works seamlessly on mobile phones, tablets, and desktop browsers.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (with full RTL support), JavaScript (ES6+)
- **Visualization**: Chart.js (v4+)
- **Storage**: `localStorage` (browser-native, persistent)
- **No Backend**: Zero dependencies, no servers, no APIs
- **Compatibility**: Chrome, Firefox, Edge, Safari, Android & iOS browsers

## 📥 How to Use

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/yourusername/DebtManagerAR.git
