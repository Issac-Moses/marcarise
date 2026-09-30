import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { API, authHeaders } from "@/lib/mjApi";

const FIELDS: { key: string; label: string }[] = [
  { key: "certificate_id", label: "Certificate ID *" },
  { key: "student_name", label: "Student Name *" },
  { key: "college_name", label: "College Name" },
  { key: "department", label: "Department" },
  { key: "internship_role", label: "Internship Role" },
  { key: "internship_domain", label: "Internship Domain" },
  { key: "internship_duration", label: "Duration" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "project_name", label: "Project Name" },
  { key: "technologies", label: "Technologies" },
  { key: "mentor", label: "Mentor" },
  { key: "grade", label: "Grade" },
  { key: "issue_date", label: "Issue Date" },
  { key: "student_id", label: "Student ID (private)" },
  { key: "remarks", label: "Remarks (private)" },
];

export function CertificateFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Record<string, string> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = { certificate_status: "active" };
    FIELDS.forEach((f) => (base[f.key] = ""));
    return { ...base, ...(initial || {}) };
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.certificate_id?.trim() || !form.student_name?.trim()) {
      setError("Certificate ID and Student Name are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `${API}/admin/certificates/${encodeURIComponent(initial!.certificate_id)}`
        : `${API}/admin/certificates`;
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(typeof d.detail === "string" ? d.detail : "Could not save.");
        setSaving(false);
        return;
      }
      onSaved();
      onClose();
    } catch {
      setError("Could not save. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        data-testid="cert-form-modal"
        className="w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-3xl bg-[#0B0B0D] border border-purple-800/40 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-black">{isEdit ? "Edit Certificate" : "Add Certificate"}</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  {f.label}
                </span>
                <input
                  value={form[f.key] || ""}
                  disabled={isEdit && f.key === "certificate_id"}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  data-testid={`cert-field-${f.key}`}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm outline-none focus:border-purple-500 disabled:opacity-50"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">Status</span>
              <select
                value={form.certificate_status || "active"}
                onChange={(e) => setForm((s) => ({ ...s, certificate_status: e.target.value }))}
                data-testid="cert-field-status"
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm outline-none focus:border-purple-500"
              >
                <option value="active" className="bg-[#0B0B0D]">active</option>
                <option value="revoked" className="bg-[#0B0B0D]">revoked</option>
                <option value="inactive" className="bg-[#0B0B0D]">inactive</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:bg-white/5">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            data-testid="cert-save-btn"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save Certificate"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
