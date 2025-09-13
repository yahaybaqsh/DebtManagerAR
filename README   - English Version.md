# DebtManagerAR — Full Debt Management System (Arabic Interface)

![Arabic RTL Support](https://img.shields.io/badge/RTL-Arabic-blue?style=for-the-badge&logo=google-chrome)

A complete, offline-first, Arabic-RTL web application for managing personal and business debts with intuitive UI, data visualization, reporting, and export capabilities.

## 💡 Overview

**DebtManagerAR** is a powerful, client-side debt tracking system designed for Arabic-speaking users. It helps individuals and small businesses track owed amounts, payment statuses, due dates, categories, and contacts — all in Arabic with full right-to-left (RTL) layout support.

No server required. All data is stored locally in the browser using `localStorage`, making it secure, fast, and accessible offline.

## ✨ Key Features

- **Arabic RTL Interface**: Fully localized for Arabic readers with proper text direction.
- **Dashboard Analytics**: Real-time statistics on total, pending, paid, and overdue debts.
- **Interactive Charts**: Visualize debt distribution by category and status using Chart.js.
- **Add/Edit/Delete Debts**: Full CRUD operations with form validation.
- **Search & Filter**: Find debts by name or filter by status (pending/paid/overdue).
- **Export Data**: Download your debt records as JSON file.
- **Clear All Data**: Safely reset the entire database with confirmation.
- **Reminder System**: Send customizable reminder messages via email or copy-paste.
- **Settings Panel**: Set default currency, enable notification reminders, and adjust alert days.
- **Responsive Design**: Works seamlessly on mobile and desktop.

## 🛠️ Technology Stack

- HTML5 | CSS3 (with RTL support)
- JavaScript (ES6+)
- Chart.js for data visualization
- localStorage for persistent data storage
- No backend or external dependencies

## 📥 How to Use

1. Clone or download the repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. Start adding debts immediately — no login or setup needed!
4. Use the sidebar navigation to switch between Dashboard, Add Debt, List, Reports, and Settings.

> 💡 Tip: For best experience, use in full-screen mode on desktop or mobile.

## 📊 Sample Screenshots

| Dashboard | Debt List | Reports |
|----------|-----------|---------|
| ![Dashboard](<img width="1158" height="780" alt="لقطة الشاشة 2025-09-13 112613" src="https://github.com/user-attachments/assets/ab479af0-0a25-4764-815d-5c2ca60e5deb" />
screenshots/dashboard.png) | ![Debt List](screenshots/list.png) | ![Reports](screenshots/reports.png) |

*(Note: Add actual screenshots in `/screenshots` folder after deployment)*

## 🔐 Data Security

All data is stored **locally** in your browser’s `localStorage`. No information is sent to any server. You own your data completely.

## 🔄 Export & Backup

Click **"تصدير البيانات" (Export Data)** to download your entire debt list as a `.json` file.  
To restore: Simply open the app, then drag and drop the JSON file (future enhancement).

## 🚀 Future Enhancements (Roadmap)

- [ ] Cloud sync via Firebase or IndexedDB
- [ ] Email/SMS reminder automation
- [ ] Print reports
- [ ] Multi-user support
- [ ] Dark mode toggle
- [ ] Mobile app version (PWA)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve translations
- Optimize performance

Please open an issue or submit a pull request.

## 📜 License

MIT © 2025 [Your Name]

---
