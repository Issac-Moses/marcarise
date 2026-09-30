import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

type Cert = Record<string, string>;

const ROWS: { key: string; label: string }[] = [
  { key: "certificate_id", label: "Certificate ID" },
  { key: "student_name", label: "Student" },
  { key: "college_name", label: "College" },
  { key: "department", label: "Department" },
  { key: "internship_role", label: "Internship Role" },
  { key: "internship_domain", label: "Domain" },
  { key: "project_name", label: "Project" },
  { key: "technologies", label: "Technologies" },
  { key: "internship_duration", label: "Duration" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "mentor", label: "Mentor" },
  { key: "grade", label: "Grade" },
  { key: "issue_date", label: "Issue Date" },
];

export function CertificateVerificationCard({
  status,
  certificate,
}: {
  status: "verified" | "revoked" | "not_found";
  certificate: Cert | null;
}) {
  if (status === "not_found" || !certificate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        data-testid="cert-card-not-found"
        className="rounded-2xl border border-red-200 bg-white/90 backdrop-blur p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <XCircle size={20} />
          <span>Certificate Not Found</span>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          I couldn't find a certificate matching that ID in the Marca Rise
          verification database.
        </p>
      </motion.div>
    );
  }

  const revoked = status === "revoked";
  const rows = ROWS.filter((r) => certificate[r.key] && certificate[r.key].trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      data-testid={revoked ? "cert-card-revoked" : "cert-card-verified"}
      className="overflow-hidden rounded-2xl border shadow-[0_10px_40px_rgba(124,12,231,0.15)]"
      style={{ borderColor: revoked ? "#f5c86d" : "#c6adfe" }}
    >
      {/* header */}
      <div
        className="flex items-center gap-2 px-4 py-3 text-white"
        style={{
          background: revoked
            ? "linear-gradient(135deg,#b45309,#78350f)"
            : "linear-gradient(135deg,#6D28D9,#4C1D95)",
        }}
      >
        {revoked ? (
          <AlertTriangle size={20} />
        ) : (
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 size={20} />
          </motion.span>
        )}
        <span className="font-black tracking-wide text-sm">
          {revoked ? "CERTIFICATE REVOKED" : "CERTIFICATE VERIFIED"}
        </span>
      </div>

      {/* body */}
      <div className="bg-white/95 backdrop-blur px-4 py-3">
        <div className="divide-y divide-purple-50">
          {rows.map((r) => (
            <div key={r.key} className="flex items-start justify-between gap-4 py-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold shrink-0">
                {r.label}
              </span>
              <span className="text-sm text-slate-800 font-medium text-right">
                {certificate[r.key]}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Status
            </span>
            <span
              className="text-xs font-black px-2.5 py-1 rounded-full"
              style={{
                color: revoked ? "#b45309" : "#15803d",
                background: revoked ? "#fef3c7" : "#dcfce7",
              }}
            >
              {certificate.certificate_status ||
                (revoked ? "REVOKED" : "ACTIVE")}
            </span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-purple-50 text-center">
          <span className="text-[11px] text-slate-400">
            Issued by <span className="font-bold text-purple-700">Marca Rise</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
