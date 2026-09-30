import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, LogOut, Search, Plus, Upload, Download, Trash2, Edit3,
  ShieldCheck, ShieldOff, Loader2, Award, CheckCircle2, XOctagon, CalendarPlus,
} from "lucide-react";
import { API, authHeaders, getAdminToken, setAdminToken, clearAdminToken } from "@/lib/mjApi";
import { ExcelUploader } from "@/components/admin/ExcelUploader";
import { CertificateFormModal } from "@/components/admin/CertificateFormModal";

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    if (!getAdminToken()) {
      setAuthed(false);
      return;
    }
    try {
      const res = await fetch(`${API}/admin/me`, { headers: { ...authHeaders() } });
      setAuthed(res.ok);
      if (!res.ok) clearAdminToken();
    } catch {
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Marca Rise · Admin";
    checkAuth();
  }, [checkAuth]);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  return authed ? (
    <Dashboard onLogout={() => { clearAdminToken(); setAuthed(false); }} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  );
}

/* ------------------------------------------------- LOGIN */
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.detail === "string" ? data.detail : "Login failed.");
        setLoading(false);
        return;
      }
      setAdminToken(data.access_token);
      onSuccess();
    } catch {
      setError("Could not reach the server.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-3xl" />
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        data-testid="admin-login-form"
        className="relative w-full max-w-md rounded-3xl border border-purple-800/40 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-2 text-white font-black text-xl mb-1">
          <Sparkles className="text-purple-400" /> Marca Rise Admin
        </div>
        <p className="text-white/50 text-sm mb-7">Sign in to manage certificates.</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-3 text-red-300 text-sm" data-testid="admin-login-error">
            {error}
          </div>
        )}

        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="admin-email"
            className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-purple-500"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="admin-password"
            className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-purple-500"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          data-testid="admin-login-btn"
          className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 disabled:opacity-50 transition"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </motion.form>
    </div>
  );
}

/* ------------------------------------------------- DASHBOARD */
type Stats = { total: number; active: number; revoked: number; this_month: number };
type Cert = Record<string, string>;

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, revoked: 0, this_month: 0 });
  const [items, setItems] = useState<Cert[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [editing, setEditing] = useState<Cert | null | undefined>(undefined);
  const limit = 10;

  const loadStats = useCallback(async () => {
    const res = await fetch(`${API}/admin/stats`, { headers: { ...authHeaders() } });
    if (res.ok) setStats(await res.json());
  }, []);

  const loadList = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      search, status: statusFilter, page: String(page), limit: String(limit),
    });
    const res = await fetch(`${API}/admin/certificates?${params}`, { headers: { ...authHeaders() } });
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
    }
    setLoading(false);
  }, [search, statusFilter, page]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { loadList(); }, [loadList]);

  const refresh = () => { loadStats(); loadList(); };

  async function toggleStatus(c: Cert) {
    const next = (c.certificate_status || "").toLowerCase() === "revoked" ? "active" : "revoked";
    await fetch(`${API}/admin/certificates/${encodeURIComponent(c.certificate_id)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ status: next }),
    });
    refresh();
  }

  async function remove(c: Cert) {
    if (!window.confirm(`Delete certificate ${c.certificate_id}? This cannot be undone.`)) return;
    await fetch(`${API}/admin/certificates/${encodeURIComponent(c.certificate_id)}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    });
    refresh();
  }

  async function exportXlsx() {
    const res = await fetch(`${API}/admin/certificates/export`, { headers: { ...authHeaders() } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marca_rise_certificates.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    { label: "Total Certificates", value: stats.total, icon: Award, color: "#6D28D9" },
    { label: "Active", value: stats.active, icon: CheckCircle2, color: "#15803d" },
    { label: "Revoked", value: stats.revoked, icon: XOctagon, color: "#b45309" },
    { label: "Added This Month", value: stats.this_month, icon: CalendarPlus, color: "#A855F7" },
  ];

  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* topbar */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-[#0B0B0D]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black">
            <Sparkles className="text-purple-400" /> Marca Rise <span className="text-white/40 font-medium">Admin</span>
          </div>
          <button onClick={onLogout} data-testid="admin-logout" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl" style={{ background: s.color + "40" }} />
              <s.icon size={22} style={{ color: s.color }} />
              <div className="mt-3 text-3xl font-black">{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* toolbar */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1 rounded-xl border border-white/10 bg-white/5 px-3">
            <Search size={16} className="text-white/40" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by ID, student, college…"
              data-testid="admin-search"
              className="flex-1 bg-transparent py-2.5 text-sm outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            data-testid="admin-status-filter"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none"
          >
            <option value="" className="bg-[#0B0B0D]">All statuses</option>
            <option value="active" className="bg-[#0B0B0D]">Active</option>
            <option value="revoked" className="bg-[#0B0B0D]">Revoked</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} data-testid="admin-add-btn" className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-sm font-bold">
              <Plus size={16} /> Add
            </button>
            <button onClick={() => setShowUpload(true)} data-testid="admin-upload-btn" className="flex items-center gap-2 rounded-xl border border-purple-500/50 bg-purple-600/20 hover:bg-purple-600/40 px-4 py-2.5 text-sm font-bold">
              <Upload size={16} /> Upload Excel
            </button>
            <button onClick={exportXlsx} data-testid="admin-export-btn" className="flex items-center gap-2 rounded-xl border border-white/10 hover:bg-white/5 px-4 py-2.5 text-sm">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]" data-testid="admin-cert-table">
              <thead className="bg-white/5 text-white/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Certificate ID</th>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">College</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-white/40"><Loader2 className="animate-spin inline" /></td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-white/40">No certificates found.</td></tr>
                ) : (
                  items.map((c) => {
                    const revoked = (c.certificate_status || "").toLowerCase() === "revoked";
                    return (
                      <tr key={c.certificate_id} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-mono text-purple-300">{c.certificate_id}</td>
                        <td className="px-4 py-3">{c.student_name}</td>
                        <td className="px-4 py-3 text-white/60">{c.college_name}</td>
                        <td className="px-4 py-3 text-white/60">{c.internship_role}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ color: revoked ? "#fbbf24" : "#4ade80", background: revoked ? "#78350f40" : "#14532d40" }}>
                            {(c.certificate_status || "active").toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => setEditing(c)} title="Edit" data-testid={`edit-${c.certificate_id}`} className="p-2 rounded-lg hover:bg-white/10 text-white/70"><Edit3 size={15} /></button>
                            <button onClick={() => toggleStatus(c)} title={revoked ? "Activate" : "Revoke"} data-testid={`toggle-${c.certificate_id}`} className="p-2 rounded-lg hover:bg-white/10 text-white/70">
                              {revoked ? <ShieldCheck size={15} /> : <ShieldOff size={15} />}
                            </button>
                            <button onClick={() => remove(c)} title="Delete" data-testid={`delete-${c.certificate_id}`} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-white/60">
          <span>{total} certificate(s)</span>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded-lg border border-white/10 disabled:opacity-30 hover:bg-white/5">Prev</button>
            <span>Page {page} / {pages}</span>
            <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded-lg border border-white/10 disabled:opacity-30 hover:bg-white/5">Next</button>
          </div>
        </div>
      </div>

      {showUpload && <ExcelUploader onClose={() => setShowUpload(false)} onDone={refresh} />}
      {editing !== undefined && (
        <CertificateFormModal initial={editing} onClose={() => setEditing(undefined)} onSaved={refresh} />
      )}
    </div>
  );
}
