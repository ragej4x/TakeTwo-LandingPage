import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Camera,
  CheckCircle2,
  Upload,
  X,
  ArrowRight,
  Sparkles,
  FileText,
  Home,
} from "lucide-react";

// ─── User context placeholder — leave blank until auth is wired up ────────────

const CURRENT_USER = {
  isLoggedIn: false,
  full_name: "",
  phone_number: "",
  email: "",
  address: "",
};

// ─── Admin-configured fixed drop-off locations ────────────────────────────────

const FIXED_LOCATIONS = [
  {
    id: "MNL",
    name: "Manila – Rizal Ave",
    address: "123 Rizal Ave, Ermita, Manila",
    hours: "Mon–Sat 9AM–6PM · Sun 10AM–4PM",
  },
  {
    id: "MKT",
    name: "Makati – Ayala Ave",
    address: "456 Ayala Ave, Makati City",
    hours: "Mon–Sat 9AM–7PM · Sun 10AM–5PM",
  },
  {
    id: "QZC",
    name: "Quezon City – Commonwealth",
    address: "789 Commonwealth Ave, QC",
    hours: "Mon–Sat 9AM–6PM",
  },
  {
    id: "BGC",
    name: "BGC – 5th Ave",
    address: "5th Ave cor 25th St, BGC, Taguig",
    hours: "Mon–Sun 10AM–8PM",
  },
  {
    id: "PSG",
    name: "Pasig – Ortigas",
    address: "88 San Miguel Ave, Ortigas, Pasig",
    hours: "Mon–Sat 9AM–6PM",
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

type DropoffType = "location" | "address";

interface DropoffForm {
  full_name: string;
  phone_number: string;
  email: string;
  code: string;
  dropoff_type: DropoffType;
  branch: string; // fixed location id — populated when dropoff_type = "location"
  address: string; // user address — populated when dropoff_type = "address"
  service: string;
  service_price: number | null;
  number_of_pairs: number;
  photo_url: string;
  notes: string;
}

interface PricingService {
  id: number;
  name: string;
  price: number;
  description?: string | null;
}

const STEPS = [
  "Customer Info",
  "Drop-off Location",
  "Service Selection",
  "Photo & Notes",
  "Review",
];

// ─── Shared primitives ─────────────────────────────────────────────────────────

function Label({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
      {children}
      {optional && (
        <span className="normal-case font-normal ml-1 text-neutral-300">
          (optional)
        </span>
      )}
    </label>
  );
}

function TextInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
  readOnly,
}: {
  icon: React.ElementType;
  placeholder?: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={
          onChange ? (e) => onChange(e.target.value) : undefined
        }
        readOnly={readOnly}
        className={`w-full pl-10 pr-4 py-3 text-sm border rounded-xl transition-all placeholder:text-neutral-300
          ${
            readOnly
              ? "bg-neutral-100 border-neutral-100 text-neutral-500 cursor-default"
              : "bg-neutral-50 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          }`}
      />
    </div>
  );
}

// ─── Step 1: Customer Info ─────────────────────────────────────────────────────

function Step1({
  form,
  setForm,
}: {
  form: DropoffForm;
  setForm: (f: DropoffForm) => void;
}) {
  const { isLoggedIn } = CURRENT_USER;

  return (
    
    <div className="space-y-5">
      {isLoggedIn && (
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl">
          <div className="w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center flex-none">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-neutral-700 truncate">
              {form.full_name}
            </p>
            <p className="text-xs text-neutral-400 truncate">
              {form.email}
            </p>
          </div>
          <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Logged in
          </span>
        </div>
      )}

      
      {!isLoggedIn && (
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl">
          <div className="w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center flex-none">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-sm text-neutral-600">
            No account needed — you can submit this drop-off as a guest.
          </p>
        </div>
      )}

      <div className="space-y-1.5">
        <Label>Full Name</Label>
        <TextInput
          icon={User}
          placeholder="Juan dela Cruz"
          value={form.full_name}
          onChange={
            isLoggedIn
              ? undefined
              : (v) => setForm({ ...form, full_name: v })
          }
          readOnly={isLoggedIn}
        />
        {isLoggedIn && (
          <p className="text-xs text-neutral-400">
            Pre-filled from your profile
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Phone Number</Label>
        <TextInput
          icon={Phone}
          placeholder="09171234567"
          type="tel"
          value={form.phone_number}
          onChange={
            isLoggedIn
              ? undefined
              : (v) => setForm({ ...form, phone_number: v })
          }
          readOnly={isLoggedIn}
        />
      </div>

      <div className="space-y-1.5">
        <Label optional>Email Address</Label>
        <TextInput
          icon={Mail}
          placeholder="you@email.com"
          type="email"
          value={form.email}
          onChange={
            isLoggedIn
              ? undefined
              : (v) => setForm({ ...form, email: v })
          }
          readOnly={isLoggedIn}
        />
        {!isLoggedIn && (
          <p className="text-xs text-neutral-400">
            {"We'll send status updates here"}
          </p>
        )}
      </div>


      <div className="space-y-1.5">
        <Label optional>Tracking Code</Label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400 select-none">#</span>
          <input
            type="text"
            maxLength={8}
            placeholder="e.g. AB3XY7PQ"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
            className="w-full pl-8 pr-4 py-3 text-sm font-mono tracking-widest bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-300 placeholder:font-sans placeholder:tracking-normal uppercase"
          />
        </div>
        <p className="text-xs text-neutral-400">If you already have a code from our staff, enter it here</p>
      </div>
    </div>
  );
}

// ─── Step 2: Drop-off Location ─────────────────────────────────────────────────

function Step2({
  form,
  setForm,
}: {
  form: DropoffForm;
  setForm: (f: DropoffForm) => void;
}) {
  const setType = (t: DropoffType) =>
    setForm({
      ...form,
      dropoff_type: t,
      branch: "",
      address: "",
    });
  const selectedLocation = FIXED_LOCATIONS.find(
    (l) => l.id === form.branch,
  );

  return (
    <div className="space-y-5">
      {/* Toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setType("location")}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center
            ${
              form.dropoff_type === "location"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-100 bg-white text-neutral-600 hover:border-neutral-300"
            }`}
        >
          <Building2 className="w-5 h-5" />
          <div>
            <p className="text-xs font-semibold">
              TAKETWO Location
            </p>
            <p
              className={`text-[10px] mt-0.5 ${form.dropoff_type === "location" ? "text-neutral-300" : "text-neutral-400"}`}
            >
              Drop off at a branch
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setType("address")}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center
            ${
              form.dropoff_type === "address"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-100 bg-white text-neutral-600 hover:border-neutral-300"
            }`}
        >
          <Home className="w-5 h-5" />
          <div>
            <p className="text-xs font-semibold">My Address</p>
            <p
              className={`text-[10px] mt-0.5 ${form.dropoff_type === "address" ? "text-neutral-300" : "text-neutral-400"}`}
            >
              Door-to-Door Drop-Off
            </p>
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Fixed branch locations */}
        {form.dropoff_type === "location" && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <Label>Select a Branch</Label>
            {FIXED_LOCATIONS.map((loc) => {
              const selected = form.branch === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, branch: loc.id })
                  }
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                    ${
                      selected
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-100 bg-white hover:border-neutral-200"
                    }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-none mt-0.5 transition-colors
                    ${selected ? "border-neutral-900 bg-neutral-900" : "border-neutral-300"}`}
                  >
                    {selected && (
                      <div className="w-full h-full rounded-full scale-[0.4] bg-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800">
                      {loc.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {loc.address}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {loc.hours}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* User address */}
        {form.dropoff_type === "address" && (
          <motion.div
            key="address"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <Label>Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              <textarea
                placeholder="Unit 12B, 45 Ayala Ave, Makati City, 1226"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                rows={3}
                className="w-full pl-10 pr-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-300 resize-none"
              />
            </div>
            {CURRENT_USER.isLoggedIn &&
              CURRENT_USER.address &&
              form.address !== CURRENT_USER.address && (
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      address: CURRENT_USER.address,
                    })
                  }
                  className="flex items-center gap-2 text-xs text-neutral-600 border border-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  Use my saved address
                </button>
              )}
            {CURRENT_USER.isLoggedIn &&
              form.address === CURRENT_USER.address && (
                <p className="text-xs text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Using
                  your saved address
                </p>
              )}
            <p className="text-xs text-neutral-400">
              Our team will contact you to arrange a pickup
              schedule.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nothing selected yet */}
      {!form.dropoff_type && (
        <p className="text-xs text-neutral-400 text-center pt-2">
          Choose how you want to drop off your shoes above.
        </p>
      )}
    </div>
  );
}

// ─── Step 3: Service Selection ─────────────────────────────────────────────────

function Step3({
  form,
  setForm,
  pricingOptions,
  loading,
  error,
}: {
  form: DropoffForm;
  setForm: (f: DropoffForm) => void;
  pricingOptions: PricingService[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <Label>Select a Service</Label>
        {loading ? (
          <div className="px-4 py-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-500 text-center">
            Loading services…
          </div>
        ) : error ? (
          <div className="px-4 py-6 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-3">
            {pricingOptions.map((item) => {
              const selected = form.service === item.name;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      service: item.name,
                      service_price: item.price,
                    })
                  }
                  className={`w-full p-4 rounded-3xl border transition-all text-left ${
                    selected
                      ? "border-neutral-900 bg-neutral-100"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-sm text-neutral-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">
                      ₱{item.price.toLocaleString()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="space-y-4">
          <Label>Number of Pairs</Label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,160px)_1fr] items-end">
            <select
              value={form.number_of_pairs <= 10 ? String(form.number_of_pairs) : "custom"}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "custom") {
                  setForm({ ...form, number_of_pairs: Math.max(11, form.number_of_pairs || 11) });
                } else {
                  setForm({ ...form, number_of_pairs: Number(value) });
                }
              }}
              className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-sm"
            >
              {[...Array(10)].map((_, idx) => {
                const count = idx + 1;
                return (
                  <option key={count} value={String(count)}>
                    {count} pair{count > 1 ? "s" : ""}
                  </option>
                );
              })}
              <option value="custom">Custom number</option>
            </select>

            {form.number_of_pairs > 10 && (
              <div className="space-y-2">
                <input
                  type="number"
                  min={1}
                  value={form.number_of_pairs}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      number_of_pairs: Math.max(1, Number(e.target.value) || 1),
                    })
                  }
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-sm"
                />
                <p className="text-xs text-neutral-400">
                  Enter the exact number of pairs for this request.
                </p>
              </div>
            )}
          </div>
          {form.number_of_pairs <= 10 && (
            <p className="text-xs text-neutral-400">
              Select 1–10 pairs, or choose "Custom number" for a higher quantity.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Step4({
  form,
  setForm,
}: {
  form: DropoffForm;
  setForm: (f: DropoffForm) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(
    form.photo_url,
  );

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm({ ...form, photo_url: url });
  };

  return (
    <div className="space-y-6">
      {/* Photo upload */}
      <div>
        <Label optional>Shoe Photo</Label>
        <div
          onClick={() => fileRef.current?.click()}
          className={`relative mt-1 rounded-2xl border-2 border-dashed cursor-pointer transition-colors duration-200
            ${preview ? "border-neutral-200 bg-white" : "border-neutral-200 bg-neutral-50 hover:border-neutral-400"}`}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Shoe preview"
                className="w-full h-52 object-cover rounded-2xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview("");
                  setForm({ ...form, photo_url: "" });
                }}
                className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-neutral-600" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-neutral-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Upload shoe photo
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  JPG, PNG or WEBP · Max 10MB
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 border border-neutral-200 px-3 py-1.5 rounded-lg bg-white">
                <Upload className="w-3.5 h-3.5" /> Choose file
              </div>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        <p className="text-xs text-neutral-400 mt-2">
          Helps us identify your shoes faster
        </p>
      </div>

      {/* Notes */}
      <div>
        <Label optional>Notes for our team</Label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
          <textarea
            placeholder="e.g. Right sole is separating, please prioritize the glue repair. Avoid bleach on the suede panels."
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
            rows={4}
            className="w-full pl-10 pr-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-300 resize-none"
          />
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Any special instructions, damage descriptions, or
          service requests
        </p>
      </div>

    </div>
  );
}

// ─── Step 4: Photo & Notes ─────────────────────────────────────────────────────

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-neutral-100 last:border-0">
      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex-none">
        {label}
      </span>
      <span className="text-sm text-neutral-800 text-right">
        {value}
      </span>
    </div>
  );
}

function Step5({ form }: { form: DropoffForm }) {
  const selectedLocation = FIXED_LOCATIONS.find(
    (l) => l.id === form.branch,
  );
  const dropoffDisplay =
    form.dropoff_type === "location" && selectedLocation
      ? selectedLocation.name
      : form.dropoff_type === "address"
        ? "Home pickup – " + form.address
        : "";

  return (
    <div className="space-y-5">
      <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
        <ReviewRow label="Full Name" value={form.full_name} />
        <ReviewRow label="Phone" value={form.phone_number} />
        <ReviewRow label="Email" value={form.email} />
        <ReviewRow label="Tracking Code" value={form.code} />
        <ReviewRow label="Service" value={form.service || "Not selected"} />
        <ReviewRow
          label="Estimated Price"
          value={form.service_price != null ? `₱${form.service_price.toLocaleString()}` : "—"}
        />
        <ReviewRow
          label="Number of Pairs"
          value={String(form.number_of_pairs)}
        />
        <ReviewRow label="Drop-off" value={dropoffDisplay} />
        {form.dropoff_type === "address" && (
          <ReviewRow label="Address" value={form.address} />
        )}
        <ReviewRow label="Notes" value={form.notes} />
      </div>

      {form.photo_url && (
        <div>
          <Label>Shoe Photo</Label>
          <img
            src={form.photo_url}
            alt="Shoe"
            className="w-full h-40 object-cover rounded-xl border border-neutral-100"
          />
        </div>
      )}

      <p className="text-xs text-neutral-400 leading-relaxed">
        By submitting this form you authorize TAKETWO to receive
        and process your footwear. A tracking code will be
        issued to you upon receipt.
      </p>
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────

function SuccessScreen({
  name,
  dropoffType,
  locationName,
}: {
  name: string;
  dropoffType: DropoffType;
  locationName: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-6 gap-5"
    >
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          {dropoffType === "location"
            ? "Drop-off registered!"
            : "Pickup request sent!"}
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          {dropoffType === "location"
            ? `Thanks, ${name.split(" ")[0]}. Bring your shoes to ${locationName}.`
            : `Thanks, ${name.split(" ")[0]}. We'll contact you to schedule your pickup.`}
        </p>
      </div>

      <div className="bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-5 w-full text-left space-y-2">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          What happens next
        </p>
        {[
          dropoffType === "location"
            ? `Bring your shoes to ${locationName}`
            : "Our team will call to schedule pickup",
          "Staff will inspect and assign a tracking code",
          'Track your job under "Shoe Clean Service"',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center flex-none mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-neutral-700">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 w-full">
        <Link
          to="/orders"
          className="flex-1 py-3 border border-neutral-200 text-sm font-semibold text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors text-center"
        >
          Track Orders
        </Link>
        <Link
          to="/"
          className="flex-1 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-colors text-center"
        >
          Go Home
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function buildInitialForm(): DropoffForm {
  return {
    full_name: CURRENT_USER.isLoggedIn ? CURRENT_USER.full_name : "",
    phone_number: CURRENT_USER.isLoggedIn
      ? CURRENT_USER.phone_number
      : "",
    email: CURRENT_USER.isLoggedIn ? CURRENT_USER.email : "",
    code: "",
    dropoff_type: "location",
    branch: "",
    address: CURRENT_USER.isLoggedIn ? CURRENT_USER.address : "",
    service: "",
    service_price: null,
    number_of_pairs: 1,
    photo_url: "",
    notes: "",
  };
}

function validate(
  step: number,
  form: DropoffForm,
): string | null {
  if (step === 0) {
    if (!form.full_name.trim()) return "Full name is required.";
    if (!form.phone_number.trim())
      return "Phone number is required.";
  }
  if (step === 1) {
    if (form.dropoff_type === "location" && !form.branch)
      return "Please select a drop-off location.";
    if (form.dropoff_type === "address" && !form.address.trim())
      return "Please enter your address.";
  }
  if (step === 2) {
    if (!form.service.trim())
      return "Please select a service.";
    if (form.number_of_pairs < 1)
      return "Please enter the number of pairs.";
  }
  return null;
}

function parseErrorDetail(detail: unknown): string {
  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const msg = (item as { msg?: unknown }).msg;
          if (typeof msg === "string") return msg;
          const loc = (item as { loc?: unknown[] }).loc;
          if (Array.isArray(loc) && loc.length > 0) {
            const location = loc[loc.length - 1];
            return typeof location === "string" ? location : "Validation error";
          }
        }
        return "Validation error";
      })
      .filter(Boolean)
      .join("; ");
  }

  if (detail && typeof detail === "object") {
    if ("detail" in detail) {
      return parseErrorDetail((detail as { detail?: unknown }).detail);
    }
    if ("message" in detail) {
      const message = (detail as { message?: unknown }).message;
      if (typeof message === "string") return message;
    }
  }

  return "Unable to submit drop-off request.";
}

export function Dropoff() {
  const API_BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL ?? "") as string;
  const [step, setStep] = useState(0);
  const [form, setForm] =
    useState<DropoffForm>(buildInitialForm);
  const [pricingOptions, setPricingOptions] = useState<PricingService[]>([]);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedLocation = FIXED_LOCATIONS.find(
    (l) => l.id === form.branch,
  );

  const fetchPricingOptions = async () => {
    setPricingLoading(true);
    setPricingError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/pricing?is_active=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || "Unable to load service pricing.");
      }

      const pricing = (await response.json()) as PricingService[];
      setPricingOptions(pricing);
    } catch (err) {
      setPricingError(err instanceof Error ? err.message : "Unable to load service pricing.");
    } finally {
      setPricingLoading(false);
    }
  };

  useEffect(() => {
    if (step === 2 && pricingOptions.length === 0 && !pricingLoading) {
      void fetchPricingOptions();
    }
  }, [step, pricingOptions.length, pricingLoading]);

  const next = () => {
    const err = validate(step, form);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      const codeClean = form.code.trim().toUpperCase();
      if (!codeClean || codeClean.length !== 8) {
        throw new Error("Please enter the 8-character tracking code provided by staff.");
      }
      const payload = {
        code: codeClean,
        customer: {
          full_name: form.full_name.trim(),
          phone_number: form.phone_number.trim(),
          email: form.email.trim() ? form.email.trim() : null,
        },
        shoe_brand: null,
        shoe_model: null,
        shoe_color: null,
        service_type: form.service || (form.dropoff_type === "location" ? "branch_dropoff" : "address_dropoff"),
        special_instructions: form.notes.trim() ? form.notes.trim() : null,
        photo_urls: form.photo_url ? [form.photo_url] : [],
        number_of_pairs: form.number_of_pairs,
      };

      const response = await fetch(`${API_BASE_URL}/store/dropoff/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const raw = await response.clone().text();
        let detailMessage = "Unable to submit drop-off request.";

        try {
          const data = raw ? JSON.parse(raw) : {};
          const detail = typeof data === "object" && data !== null ? (data as { detail?: unknown }).detail : undefined;
          detailMessage = parseErrorDetail(detail ?? data);
        } catch {
          detailMessage = raw || detailMessage;
        }

        throw new Error(detailMessage);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit drop-off request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl tracking-tight">
            <span className="font-light">TAKE</span>
            <span className="font-semibold">TWO</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-600 font-medium">
              Drop-off Form
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
        {submitted ? (
          <SuccessScreen
            name={form.full_name}
            dropoffType={form.dropoff_type}
            locationName={selectedLocation?.name ?? ""}
          />
        ) : (
          <>
            {/* Progress stepper */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center flex-1 last:flex-none"
                  >
                    <button
                      onClick={() => i < step && setStep(i)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-none
                        ${
                          i === step
                            ? "bg-neutral-900 text-white"
                            : i < step
                              ? "bg-neutral-700 text-white cursor-pointer hover:bg-neutral-600"
                              : "bg-neutral-100 text-neutral-400"
                        }`}
                    >
                      {i < step ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-1.5 transition-colors ${i < step ? "bg-neutral-700" : "bg-neutral-100"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {STEPS[step]}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Step {step + 1} of {STEPS.length}
              </p>
            </div>

            {/* Step content */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                >
                  {step === 0 && (
                    <Step1 form={form} setForm={setForm} />
                  )}
                  {step === 1 && (
                    <Step2 form={form} setForm={setForm} />
                  )}
                  {step === 2 && (
                    <Step3
                      form={form}
                      setForm={setForm}
                      pricingOptions={pricingOptions}
                      loading={pricingLoading}
                      error={pricingError}
                    />
                  )}
                  {step === 3 && (
                    <Step4 form={form} setForm={setForm} />
                  )}
                  {step === 4 && <Step5 form={form} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-500 mb-3 px-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={back}
                  className="flex-none px-5 py-3 border border-neutral-200 text-sm font-semibold text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  className="flex-1 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={loading}
                  className="flex-1 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Drop-off{" "}
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}