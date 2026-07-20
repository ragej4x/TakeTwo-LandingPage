import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/Navigation";
import {
  Package,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

type ServiceStatus =
  | "Received"
  | "Assessment"
  | "Cleaning"
  | "Drying"
  | "Restoration"
  | "Quality Check"
  | "Packaging"
  | "Ready for Release"
  | "Released"
  | "Cancelled";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
}

interface ProductOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  address: string;
  estimatedDelivery: string;
}

interface ServiceTimeline {
  status: ServiceStatus;
  time: string;
  by: string;
}

interface CleanJob {
  id: string;
  date: string;
  status: ServiceStatus;
  branch: string;
  services: string[];
  shoes: string[];
  total: number;
  timeline: ServiceTimeline[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const mockProductOrders: ProductOrder[] = [
  {
    id: "ORD-20260712-001",
    date: "2026-07-12",
    status: "Out for Delivery",
    items: [
      {
        name: "TAKETWO Sneaker Foam Kit",
        qty: 1,
        price: 899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
      },
      {
        name: "TAKETWO Sole Whitener",
        qty: 2,
        price: 450,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=80&h=80&fit=crop",
      },
    ],
    total: 1799,
    address: "123 Makati Ave, Makati City",
    estimatedDelivery: "July 15, 2026",
  },
  {
    id: "ORD-20260705-003",
    date: "2026-07-05",
    status: "Delivered",
    items: [
      {
        name: "TAKETWO Premium Brush Set",
        qty: 1,
        price: 650,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=80&h=80&fit=crop",
      },
    ],
    total: 650,
    address: "456 BGC, Taguig City",
    estimatedDelivery: "July 8, 2026",
  },
  {
    id: "ORD-20260715-007",
    date: "2026-07-15",
    status: "Processing",
    items: [
      {
        name: "TAKETWO Waterproof Shield",
        qty: 1,
        price: 750,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
      },
      {
        name: "TAKETWO Deodorizer Spray",
        qty: 3,
        price: 280,
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=80&h=80&fit=crop",
      },
    ],
    total: 1590,
    address: "789 Quezon Ave, Quezon City",
    estimatedDelivery: "July 18, 2026",
  },
];

const mockCleanJobs: CleanJob[] = [
  {
    id: "TK-20260712-004",
    date: "2026-07-12",
    status: "Cleaning",
    branch: "Manila",
    services: ["Deep Clean", "Sole Whitening"],
    shoes: ["Nike Air Force 1 (White)", "Adidas Ultraboost (Black)"],
    total: 850,
    timeline: [
      { status: "Received", time: "2026-07-12 09:00", by: "Juan Dela Cruz" },
      { status: "Assessment", time: "2026-07-12 10:30", by: "Maria Cruz" },
      { status: "Cleaning", time: "2026-07-12 13:00", by: "Maria Cruz" },
    ],
  },
  {
    id: "TK-20260708-002",
    date: "2026-07-08",
    status: "Ready for Release",
    branch: "Makati",
    services: ["Basic Clean"],
    shoes: ["New Balance 990 (Grey)"],
    total: 350,
    timeline: [
      { status: "Received", time: "2026-07-08 08:00", by: "Rosa Garcia" },
      { status: "Assessment", time: "2026-07-08 09:00", by: "Pedro Santos" },
      { status: "Cleaning", time: "2026-07-08 11:00", by: "Pedro Santos" },
      { status: "Drying", time: "2026-07-08 14:00", by: "Pedro Santos" },
      { status: "Quality Check", time: "2026-07-08 16:00", by: "Rosa Garcia" },
      { status: "Packaging", time: "2026-07-08 17:00", by: "Rosa Garcia" },
      { status: "Ready for Release", time: "2026-07-09 08:00", by: "Rosa Garcia" },
    ],
  },
  {
    id: "TK-20260701-001",
    date: "2026-07-01",
    status: "Released",
    branch: "Quezon City",
    services: ["Restoration", "Sole Whitening", "Deodorizing"],
    shoes: ["Jordan 1 Retro High (Red)", "Yeezy 350 V2 (Cream)"],
    total: 2200,
    timeline: [
      { status: "Received", time: "2026-07-01 09:00", by: "Miguel Torres" },
      { status: "Assessment", time: "2026-07-01 10:00", by: "Elena Villanueva" },
      { status: "Cleaning", time: "2026-07-01 12:00", by: "Elena Villanueva" },
      { status: "Restoration", time: "2026-07-02 09:00", by: "Elena Villanueva" },
      { status: "Quality Check", time: "2026-07-02 14:00", by: "Miguel Torres" },
      { status: "Packaging", time: "2026-07-02 15:00", by: "Miguel Torres" },
      { status: "Ready for Release", time: "2026-07-02 16:00", by: "Miguel Torres" },
      { status: "Released", time: "2026-07-03 10:00", by: "Miguel Torres" },
    ],
  },
];

// ─── Constants ─────────────────────────────────────────────────────────────────

const ORDER_STEPS: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const SERVICE_STEPS: ServiceStatus[] = [
  "Received",
  "Assessment",
  "Cleaning",
  "Drying",
  "Restoration",
  "Quality Check",
  "Packaging",
  "Ready for Release",
  "Released",
];

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  "Pending": "bg-amber-50 text-amber-700 border border-amber-200",
  "Processing": "bg-blue-50 text-blue-700 border border-blue-200",
  "Shipped": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Out for Delivery": "bg-orange-50 text-orange-700 border border-orange-200",
  "Delivered": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Cancelled": "bg-red-50 text-red-700 border border-red-200",
};

const SERVICE_STATUS_STYLES: Record<ServiceStatus, string> = {
  "Received": "bg-slate-50 text-slate-700 border border-slate-200",
  "Assessment": "bg-blue-50 text-blue-700 border border-blue-200",
  "Cleaning": "bg-cyan-50 text-cyan-700 border border-cyan-200",
  "Drying": "bg-amber-50 text-amber-700 border border-amber-200",
  "Restoration": "bg-orange-50 text-orange-700 border border-orange-200",
  "Quality Check": "bg-purple-50 text-purple-700 border border-purple-200",
  "Packaging": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Ready for Release": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Released": "bg-green-50 text-green-700 border border-green-200",
  "Cancelled": "bg-red-50 text-red-700 border border-red-200",
};

// ─── Helper Components ─────────────────────────────────────────────────────────

function StatusBadge({ status, type }: { status: string; type: "order" | "service" }) {
  const styles =
    type === "order"
      ? ORDER_STATUS_STYLES[status as OrderStatus] ?? ""
      : SERVICE_STATUS_STYLES[status as ServiceStatus] ?? "";
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles}`}>
      {status}
    </span>
  );
}

function OrderProgressBar({ status }: { status: OrderStatus }) {
  if (status === "Cancelled") return null;
  const currentIndex = ORDER_STEPS.indexOf(status);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-0">
        {ORDER_STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors
                    ${active ? "bg-neutral-900 text-white" : done ? "bg-neutral-700 text-white" : "bg-neutral-100 text-neutral-400"}`}
                >
                  {done && !active ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Circle className={`w-3 h-3 ${active ? "fill-white" : ""}`} />
                  )}
                </div>
                <span className={`text-[10px] text-center whitespace-nowrap hidden sm:block ${done ? "text-neutral-700 font-medium" : "text-neutral-400"}`}>
                  {step}
                </span>
              </div>
              {i < ORDER_STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 ${i < currentIndex ? "bg-neutral-700" : "bg-neutral-100"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceTimeline({ timeline, currentStatus }: { timeline: ServiceTimeline[]; currentStatus: ServiceStatus }) {
  return (
    <div className="mt-4 space-y-0">
      {SERVICE_STEPS.map((step, i) => {
        const entry = timeline.find((t) => t.status === step);
        const done = !!entry;
        const active = step === currentStatus && currentStatus !== "Released" && currentStatus !== "Cancelled";
        const isCancelled = currentStatus === "Cancelled" && step === "Cancelled";

        if (!done && step !== currentStatus && !isCancelled) {
          if (SERVICE_STEPS.indexOf(step) > SERVICE_STEPS.indexOf(currentStatus)) {
            return (
              <div key={step} className="flex items-start gap-3 pb-4">
                <div className="flex flex-col items-center flex-none">
                  <div className="w-6 h-6 rounded-full bg-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
                    <Circle className="w-2.5 h-2.5 text-neutral-300" />
                  </div>
                  {i < SERVICE_STEPS.length - 1 && <div className="w-0.5 h-6 bg-neutral-100 mt-1" />}
                </div>
                <div className="pt-0.5">
                  <p className="text-sm text-neutral-300 font-medium">{step}</p>
                </div>
              </div>
            );
          }
          return null;
        }

        return (
          <div key={step} className="flex items-start gap-3 pb-4">
            <div className="flex flex-col items-center flex-none">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${active ? "border-neutral-900 bg-neutral-900" : done ? "border-neutral-700 bg-neutral-700" : "border-neutral-200 bg-neutral-100"}`}
              >
                {done && !active ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                ) : active ? (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                ) : null}
              </div>
              {i < SERVICE_STEPS.length - 1 && (
                <div className={`w-0.5 h-6 mt-1 ${done ? "bg-neutral-700" : "bg-neutral-100"}`} />
              )}
            </div>
            <div className="pt-0.5 flex-1">
              <p className={`text-sm font-medium ${active ? "text-neutral-900" : done ? "text-neutral-700" : "text-neutral-300"}`}>
                {step}
              </p>
              {entry && (
                <p className="text-xs text-neutral-400 mt-0.5">
                  {entry.time} · by {entry.by}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Product Order Card ────────────────────────────────────────────────────────

function ProductOrderCard({ order }: { order: ProductOrder }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs text-neutral-400 font-mono">{order.id}</span>
            <StatusBadge status={order.status} type="order" />
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {order.date}
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" /> {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </span>
          </div>
          {order.status !== "Cancelled" && order.status !== "Delivered" && (
            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Est. delivery: {order.estimatedDelivery}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-semibold text-neutral-900">₱{order.total.toLocaleString()}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-neutral-100"
          >
            <div className="p-5 space-y-4">
              {/* Progress bar */}
              {order.status !== "Cancelled" && <OrderProgressBar status={order.status} />}
              {order.status === "Cancelled" && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <XCircle className="w-4 h-4" /> This order was cancelled.
                </div>
              )}

              {/* Items */}
              <div className="space-y-3 pt-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-neutral-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{item.name}</p>
                      <p className="text-xs text-neutral-400">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      ₱{(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery address */}
              <div className="flex items-start gap-2 pt-1 text-sm text-neutral-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-none" />
                <span>{order.address}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Clean Job Card ────────────────────────────────────────────────────────────

function CleanJobCard({ job }: { job: CleanJob }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs text-neutral-400 font-mono">{job.id}</span>
            <StatusBadge status={job.status} type="service" />
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {job.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {job.branch} Branch
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {job.services.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 bg-neutral-50 border border-neutral-100 rounded-full text-neutral-600">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-semibold text-neutral-900">₱{job.total.toLocaleString()}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-neutral-100"
          >
            <div className="p-5 space-y-4">
              {/* Shoes */}
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Shoes</p>
                <div className="space-y-1">
                  {job.shoes.map((shoe, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-none" />
                      {shoe}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Service Progress</p>
                <ServiceTimeline timeline={job.timeline} currentStatus={job.status} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function Orders() {
  const [activeTab, setActiveTab] = useState<"orders" | "service">("orders");

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-neutral-900">Track Orders</h1>
          <p className="text-sm text-neutral-500 mt-1">Stay updated on your purchases and shoe cleaning jobs.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "orders"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <Package className="w-4 h-4" />
            Item Orders
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "service"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Shoe Clean Service
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "orders" ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {mockProductOrders.map((order) => (
                <ProductOrderCard key={order.id} order={order} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {mockCleanJobs.map((job) => (
                <CleanJobCard key={job.id} job={job} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
