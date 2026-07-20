// import type { Job, Employee, Branch, Customer, InventoryItem, PricingService, AuditLog, Notification, StorageBin } from "../types";
// import type { AppPage } from "../types";

// export const JOB_STATUSES = [
//   "Received", "Assessment", "Cleaning", "Drying",
//   "Restoration", "Quality Check", "Packaging",
//   "Ready for Release", "Released", "Cancelled",
// ];

// export const STATUS_COLORS: Record<string, string> = {
//   "Received": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
//   "Assessment": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
//   "Cleaning": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
//   "Drying": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
//   "Restoration": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
//   "Quality Check": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
//   "Packaging": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
//   "Ready for Release": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
//   "Released": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
//   "Cancelled": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
// };

// export const PAGE_LABELS: Record<AppPage, string> = {
//   "dashboard": "Dashboard",
//   "job-orders": "Job Orders",
//   "job-records": "Job Records",
//   "employees": "Employees",
//   "branches": "Branches",
//   "customers": "Customers",
//   "storage-bins": "Storage Bins",
//   "pricing": "Pricing",
//   "discounts": "Discounts",
//   "inventory": "Inventory",
//   "reports": "Reports",
//   "notifications": "Notifications",
//   "settings": "Settings",
//   "audit-logs": "Audit Logs",
// };

// export const revenueData = [
//   { month: "Jan", revenue: 148000, profit: 62000 },
//   { month: "Feb", revenue: 167000, profit: 71000 },
//   { month: "Mar", revenue: 152000, profit: 64000 },
//   { month: "Apr", revenue: 189000, profit: 82000 },
//   { month: "May", revenue: 201000, profit: 91000 },
//   { month: "Jun", revenue: 234000, profit: 108000 },
// ];

// export const branchRevenueData = [
//   { branch: "Manila", revenue: 94000, jobs: 142 },
//   { branch: "Makati", revenue: 78000, jobs: 118 },
//   { branch: "QC", revenue: 62000, jobs: 94 },
// ];

// export const dailyJobsData = [
//   { day: "Mon", jobs: 24 }, { day: "Tue", jobs: 31 },
//   { day: "Wed", jobs: 28 }, { day: "Thu", jobs: 38 },
//   { day: "Fri", jobs: 42 }, { day: "Sat", jobs: 56 },
//   { day: "Sun", jobs: 19 },
// ];

// export const servicesData = [
//   { name: "Deep Clean", value: 38, color: "#394867" },
//   { name: "Basic Clean", value: 27, color: "#9BA4B5" },
//   { name: "Sole Whitening", value: 18, color: "#212A3E" },
//   { name: "Restoration", value: 10, color: "#5B6B8A" },
//   { name: "Others", value: 7, color: "#CBD2E0" },
// ];

// export const activityFeed = [
//   { dot: "bg-blue-500", text: "James Santos created Job TK-20260701-001", time: "10 min ago" },
//   { dot: "bg-cyan-500", text: "Maria Cruz updated Cleaning Status for TK-20260629-001", time: "2 hours ago" },
//   { dot: "bg-green-500", text: "Branch Makati released 3 orders", time: "3 hours ago" },
//   { dot: "bg-amber-500", text: "Low inventory warning: Zip Ties (2 bags remaining)", time: "4 hours ago" },
//   { dot: "bg-orange-500", text: "Pending synchronization for Manila branch", time: "5 hours ago" },
//   { dot: "bg-purple-500", text: "Elena Villanueva logged in from Quezon City", time: "6 hours ago" },
// ];

// export const mockJobs: Job[] = [
//   {
//     id: "TK-20260629-001", customer: "James Santos", phone: "09171234567",
//     items: ["TK-20260629-001-01", "TK-20260629-001-02"],
//     branch: "Manila", cleaner: "Maria Cruz", status: "Cleaning",
//     services: ["Deep Clean", "Sole Whitening"], total: 850, date: "2026-06-29", bin: "B-03",
//     timeline: [
//       { status: "Received", time: "2026-06-29 09:00", by: "Juan Dela Cruz" },
//       { status: "Assessment", time: "2026-06-29 10:30", by: "Maria Cruz" },
//       { status: "Cleaning", time: "2026-06-29 13:00", by: "Maria Cruz" },
//     ],
//   },
//   {
//     id: "TK-20260629-002", customer: "Ana Reyes", phone: "09181234567",
//     items: ["TK-20260629-002-01"],
//     branch: "Makati", cleaner: "Pedro Santos", status: "Ready for Release",
//     services: ["Basic Clean"], total: 350, date: "2026-06-28", bin: "B-01",
//     timeline: [
//       { status: "Received", time: "2026-06-28 08:00", by: "Rosa Garcia" },
//       { status: "Assessment", time: "2026-06-28 09:00", by: "Pedro Santos" },
//       { status: "Cleaning", time: "2026-06-28 11:00", by: "Pedro Santos" },
//       { status: "Drying", time: "2026-06-28 14:00", by: "Pedro Santos" },
//       { status: "Quality Check", time: "2026-06-28 16:00", by: "Rosa Garcia" },
//       { status: "Packaging", time: "2026-06-28 17:00", by: "Rosa Garcia" },
//       { status: "Ready for Release", time: "2026-06-29 08:00", by: "Rosa Garcia" },
//     ],
//   },
//   {
//     id: "TK-20260628-015", customer: "Carlos Lim", phone: "09201234567",
//     items: ["TK-20260628-015-01", "TK-20260628-015-02", "TK-20260628-015-03"],
//     branch: "Quezon City", cleaner: "Elena Villanueva", status: "Released",
//     services: ["Restoration", "Repaint"], total: 2200, date: "2026-06-28", bin: null,
//     timeline: [
//       { status: "Received", time: "2026-06-28 08:00", by: "Miguel Torres" },
//       { status: "Assessment", time: "2026-06-28 09:30", by: "Elena Villanueva" },
//       { status: "Cleaning", time: "2026-06-28 11:00", by: "Elena Villanueva" },
//       { status: "Restoration", time: "2026-06-29 09:00", by: "Elena Villanueva" },
//       { status: "Quality Check", time: "2026-06-29 14:00", by: "Miguel Torres" },
//       { status: "Packaging", time: "2026-06-29 15:00", by: "Miguel Torres" },
//       { status: "Ready for Release", time: "2026-06-29 16:00", by: "Miguel Torres" },
//       { status: "Released", time: "2026-06-30 10:00", by: "Miguel Torres" },
//     ],
//   },
//   {
//     id: "TK-20260630-003", customer: "Sofia Garcia", phone: "09151234567",
//     items: ["TK-20260630-003-01"],
//     branch: "Manila", cleaner: "Maria Cruz", status: "Received",
//     services: ["Deep Clean", "Waterproofing"], total: 1100, date: "2026-06-30", bin: "B-05",
//     timeline: [{ status: "Received", time: "2026-06-30 08:30", by: "Juan Dela Cruz" }],
//   },
//   {
//     id: "TK-20260627-022", customer: "Roberto Tan", phone: "09261234567",
//     items: ["TK-20260627-022-01", "TK-20260627-022-02"],
//     branch: "Makati", cleaner: null, status: "Cancelled",
//     services: ["Basic Clean"], total: 700, date: "2026-06-27", bin: null,
//     timeline: [
//       { status: "Received", time: "2026-06-27 10:00", by: "Rosa Garcia" },
//       { status: "Cancelled", time: "2026-06-27 15:00", by: "Rosa Garcia" },
//     ],
//   },
//   {
//     id: "TK-20260701-001", customer: "Patricia Mendoza", phone: "09321234567",
//     items: ["TK-20260701-001-01"],
//     branch: "Quezon City", cleaner: "Elena Villanueva", status: "Quality Check",
//     services: ["Restoration", "Sole Whitening", "Deodorizing"], total: 1800, date: "2026-07-01", bin: "B-02",
//     timeline: [
//       { status: "Received", time: "2026-07-01 09:00", by: "Miguel Torres" },
//       { status: "Assessment", time: "2026-07-01 10:00", by: "Elena Villanueva" },
//       { status: "Cleaning", time: "2026-07-01 12:00", by: "Elena Villanueva" },
//       { status: "Restoration", time: "2026-07-02 09:00", by: "Elena Villanueva" },
//       { status: "Quality Check", time: "2026-07-02 14:00", by: "Miguel Torres" },
//     ],
//   },
// ];

// export const mockEmployees: Employee[] = [
//   { id: "EMP-001", name: "Juan Dela Cruz", email: "juan@taketwo.ph", phone: "09171111111", role: "Administrator", branch: "Manila", status: "Active", joinDate: "2024-01-15", jobsCompleted: 0, revenue: 0 },
//   { id: "EMP-002", name: "Maria Cruz", email: "maria@taketwo.ph", phone: "09172222222", role: "Cleaner", branch: "Manila", status: "Active", joinDate: "2024-02-01", jobsCompleted: 287, revenue: 183400 },
//   { id: "EMP-003", name: "Pedro Santos", email: "pedro@taketwo.ph", phone: "09173333333", role: "Cleaner", branch: "Makati", status: "Active", joinDate: "2024-03-10", jobsCompleted: 198, revenue: 124600 },
//   { id: "EMP-004", name: "Rosa Garcia", email: "rosa@taketwo.ph", phone: "09174444444", role: "Branch Manager", branch: "Makati", status: "Active", joinDate: "2024-01-20", jobsCompleted: 0, revenue: 0 },
//   { id: "EMP-005", name: "Elena Villanueva", email: "elena@taketwo.ph", phone: "09175555555", role: "Cleaner", branch: "Quezon City", status: "Active", joinDate: "2024-04-05", jobsCompleted: 152, revenue: 98800 },
//   { id: "EMP-006", name: "Miguel Torres", email: "miguel@taketwo.ph", phone: "09176666666", role: "Branch Manager", branch: "Quezon City", status: "Active", joinDate: "2024-01-25", jobsCompleted: 0, revenue: 0 },
//   { id: "EMP-007", name: "Carmen Reyes", email: "carmen@taketwo.ph", phone: "09177777777", role: "Staff", branch: "Manila", status: "Active", joinDate: "2024-05-12", jobsCompleted: 0, revenue: 0 },
//   { id: "EMP-008", name: "Antonio Bautista", email: "antonio@taketwo.ph", phone: "09178888888", role: "Cleaner", branch: "Manila", status: "Inactive", joinDate: "2024-02-14", jobsCompleted: 88, revenue: 54200 },
// ];

// export const mockBranches: Branch[] = [
//   { id: "BR-001", name: "Manila", code: "MNL", address: "123 Rizal Ave, Manila City", contact: "02-8123-4567", manager: "Juan Dela Cruz", employees: 4, activeJobs: 12, totalRevenue: 94000, rating: 4.8 },
//   { id: "BR-002", name: "Makati", code: "MKT", address: "456 Ayala Ave, Makati City", contact: "02-8234-5678", manager: "Rosa Garcia", employees: 3, activeJobs: 8, totalRevenue: 78000, rating: 4.6 },
//   { id: "BR-003", name: "Quezon City", code: "QZC", address: "789 Commonwealth Ave, QC", contact: "02-8345-6789", manager: "Miguel Torres", employees: 3, activeJobs: 6, totalRevenue: 62000, rating: 4.7 },
// ];

// export const mockCustomers: Customer[] = [
//   { id: "CUS-001", name: "James Santos", phone: "09171234567", email: "james@email.com", totalJobs: 12, totalSpent: 9800, lastVisit: "2026-06-29", status: "Active" },
//   { id: "CUS-002", name: "Ana Reyes", phone: "09181234567", email: "ana@email.com", totalJobs: 8, totalSpent: 6200, lastVisit: "2026-06-28", status: "Active" },
//   { id: "CUS-003", name: "Carlos Lim", phone: "09201234567", email: "carlos@email.com", totalJobs: 15, totalSpent: 18400, lastVisit: "2026-06-28", status: "Active" },
//   { id: "CUS-004", name: "Sofia Garcia", phone: "09151234567", email: "sofia@email.com", totalJobs: 5, totalSpent: 3900, lastVisit: "2026-06-30", status: "Active" },
//   { id: "CUS-005", name: "Roberto Tan", phone: "09261234567", email: "roberto@email.com", totalJobs: 3, totalSpent: 1800, lastVisit: "2026-06-27", status: "Active" },
//   { id: "CUS-006", name: "Patricia Mendoza", phone: "09321234567", email: "patricia@email.com", totalJobs: 7, totalSpent: 11200, lastVisit: "2026-07-01", status: "Active" },
// ];

// export const mockInventory: InventoryItem[] = [
//   { id: "INV-001", name: "Cleaning Solution A", category: "Chemicals", stock: 45, unit: "bottles", supplier: "CleanCo PH", purchaseDate: "2026-06-01", expiry: "2027-06-01", lowThreshold: 10 },
//   { id: "INV-002", name: "Soft Bristle Brush", category: "Brushes", stock: 8, unit: "pcs", supplier: "BrushMasters", purchaseDate: "2026-05-15", expiry: null, lowThreshold: 5 },
//   { id: "INV-003", name: "White Paint", category: "Paint", stock: 3, unit: "cans", supplier: "ColorPlus PH", purchaseDate: "2026-06-10", expiry: "2027-06-10", lowThreshold: 5 },
//   { id: "INV-004", name: "Shoe Bags", category: "Packaging", stock: 280, unit: "pcs", supplier: "PackRight", purchaseDate: "2026-06-20", expiry: null, lowThreshold: 50 },
//   { id: "INV-005", name: "Shoe Tags", category: "Tags", stock: 14, unit: "rolls", supplier: "TagMaker PH", purchaseDate: "2026-06-01", expiry: null, lowThreshold: 5 },
//   { id: "INV-006", name: "Zip Ties", category: "Packaging", stock: 2, unit: "bags", supplier: "FastenersPH", purchaseDate: "2026-06-25", expiry: null, lowThreshold: 3 },
// ];

// export const mockPricing: PricingService[] = [
//   { id: 1, service: "Basic Clean", basePrice: 350, description: "Standard cleaning for regular sneakers", duration: "1-2 days" },
//   { id: 2, service: "Deep Clean", basePrice: 500, description: "Thorough cleaning for heavily soiled shoes", duration: "2-3 days" },
//   { id: 3, service: "Sole Whitening", basePrice: 350, description: "Whitening treatment for rubber soles", duration: "1 day" },
//   { id: 4, service: "Restoration", basePrice: 800, description: "Full restoration for damaged shoes", duration: "3-5 days" },
//   { id: 5, service: "Customization", basePrice: 1500, description: "Custom painting and design", duration: "5-7 days" },
//   { id: 6, service: "Repaint", basePrice: 1200, description: "Color repaint for leather/canvas shoes", duration: "3-5 days" },
//   { id: 7, service: "Waterproofing", basePrice: 600, description: "Water-resistant protective coating", duration: "1 day" },
//   { id: 8, service: "Deodorizing", basePrice: 200, description: "Odor elimination treatment", duration: "Same day" },
// ];

// export const mockAuditLogs: AuditLog[] = [
//   { id: "LOG-001", user: "Juan Dela Cruz", action: "Job Modified", detail: "Changed status of TK-20260629-001 from Assessment to Cleaning", time: "2026-06-29 13:00", ip: "192.168.1.10", device: "Chrome / Windows", before: "Assessment", after: "Cleaning" },
//   { id: "LOG-002", user: "Rosa Garcia", action: "Employee Edited", detail: "Updated contact number for Pedro Santos", time: "2026-06-29 11:30", ip: "192.168.1.22", device: "Safari / macOS", before: "09173333330", after: "09173333333" },
//   { id: "LOG-003", user: "Juan Dela Cruz", action: "Branch Updated", detail: "Changed manager of Quezon City branch", time: "2026-06-28 16:00", ip: "192.168.1.10", device: "Chrome / Windows", before: "Carlos Lim", after: "Miguel Torres" },
//   { id: "LOG-004", user: "Juan Dela Cruz", action: "Pricing Updated", detail: "Updated price for Deep Clean service", time: "2026-06-28 14:00", ip: "192.168.1.10", device: "Chrome / Windows", before: "₱450", after: "₱500" },
//   { id: "LOG-005", user: "Rosa Garcia", action: "Password Reset", detail: "Reset password for user: pedro@taketwo.ph", time: "2026-06-27 10:00", ip: "192.168.1.22", device: "Firefox / Windows", before: "—", after: "—" },
//   { id: "LOG-006", user: "Juan Dela Cruz", action: "Employee Deleted", detail: "Deleted employee record for Antonio Bautista", time: "2026-06-26 15:30", ip: "192.168.1.10", device: "Chrome / Windows", before: "Active", after: "Deleted" },
// ];

// export const mockNotifications: Notification[] = [
//   { id: 1, type: "warning", title: "Low Inventory Alert", message: "Zip Ties stock is critically low (2 bags remaining)", time: "10 min ago", read: false },
//   { id: 2, type: "success", title: "Job Ready for Release", message: "TK-20260629-002 (Ana Reyes) is ready for pickup at Makati branch", time: "1 hour ago", read: false },
//   { id: 3, type: "info", title: "Employee Login", message: "Maria Cruz logged in from Manila branch at 08:15", time: "3 hours ago", read: false },
//   { id: 4, type: "error", title: "Sync Failed", message: "Failed to synchronize Manila branch data. Last sync: 2 hours ago.", time: "2 hours ago", read: false },
//   { id: 5, type: "info", title: "Job Overdue", message: "TK-20260627-022 has been in Assessment status for over 48 hours", time: "5 hours ago", read: true },
//   { id: 6, type: "success", title: "Backup Completed", message: "Automatic database backup completed successfully at 02:00", time: "6 hours ago", read: true },
// ];

// export const mockStorageBins: { branch: string; bins: StorageBin[] }[] = [
//   {
//     branch: "Manila", bins: [
//       { id: "MNL-B-01", name: "B-01", capacity: 10, occupied: ["TK-20260701-001-01"], available: 9, reserved: 0 },
//       { id: "MNL-B-02", name: "B-02", capacity: 10, occupied: [], available: 10, reserved: 0 },
//       { id: "MNL-B-03", name: "B-03", capacity: 10, occupied: ["TK-20260629-001-01", "TK-20260629-001-02"], available: 8, reserved: 0 },
//       { id: "MNL-B-04", name: "B-04", capacity: 10, occupied: [], available: 10, reserved: 2 },
//       { id: "MNL-B-05", name: "B-05", capacity: 10, occupied: ["TK-20260630-003-01"], available: 9, reserved: 0 },
//     ],
//   },
//   {
//     branch: "Makati", bins: [
//       { id: "MKT-B-01", name: "B-01", capacity: 8, occupied: ["TK-20260629-002-01"], available: 7, reserved: 0 },
//       { id: "MKT-B-02", name: "B-02", capacity: 8, occupied: [], available: 8, reserved: 1 },
//       { id: "MKT-B-03", name: "B-03", capacity: 8, occupied: [], available: 8, reserved: 0 },
//     ],
//   },
//   {
//     branch: "Quezon City", bins: [
//       { id: "QZC-B-01", name: "B-01", capacity: 8, occupied: [], available: 8, reserved: 0 },
//       { id: "QZC-B-02", name: "B-02", capacity: 8, occupied: ["TK-20260701-001-01"], available: 7, reserved: 0 },
//       { id: "QZC-B-03", name: "B-03", capacity: 8, occupied: [], available: 7, reserved: 1 },
//     ],
//   },
// ];
