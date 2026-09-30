import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, FileSpreadsheet, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { API, authHeaders } from "@/lib/mjApi";

type PreviewRow = Record<string, string>;
type Preview = {
  total: number;
  rows: PreviewRow[];
  errors: { row: number; message: string }[];
  existing_ids: string[];
  existing_count: number;
};

export function ExcelUploader({
  onClose,
  onDone,
}: {
  onClose: () => void;
  onDone: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<"pick" | "reading" | "preview" | "importing" | "done">("pick");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [dupMode, setDupMode] = useState<"skip" | "update">("skip");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ inserted: number; updated: number; skipped: number } | null>(null);
  const [fileName, setFileName] = useState("");

  async function handleFile(file: File) {
    setError("");
    setFileName(file.name);
    setStage("reading");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch(`${API}/admin/certificates/import/preview`, {
        method: "POST",
        headers: { ...authHeaders() },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Could not read the file.");
        setStage("pick");
        return;
      }
      setPreview(data);
      setStage("preview");
    } catch {
      setError("Upload failed. Please try again.");
      setStage("pick");
    }
  }

  async function commit() {
    if (!preview) return;
    setStage("importing");
    try {
      const res = await fetch(`${API}/admin/certificates/import/commit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ rows: preview.rows, duplicate_mode: dupMode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Import failed.");
        setStage("preview");
        return;
      }
      setResult(data);
      setStage("done");
    } catch {
      setError("Import failed. Please try again.");
      setStage("preview");
    }
  }

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        data-testid="excel-uploader"
        className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl bg-[#0B0B0D] border border-purple-800/40 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-black">
            <FileSpreadsheet size={20} className="text-purple-400" /> Import Certificates from Excel
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white" data-testid="excel-close">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-white">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-3 text-red-300 text-sm">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {(stage === "pick" || stage === "reading") && (
            <div
              onClick={() => stage === "pick" && fileRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-purple-700/50 bg-purple-900/10 py-16 flex flex-col items-center justify-center gap-3 hover:bg-purple-900/20 transition"
              data-testid="excel-dropzone"
            >
              {stage === "reading" ? (
                <>
                  <Loader2 className="animate-spin text-purple-400" size={36} />
                  <p className="text-white/70">Reading spreadsheet…</p>
                </>
              ) : (
                <>
                  <UploadCloud size={40} className="text-purple-400" />
                  <p className="font-semibold">Click to upload an .xlsx file</p>
                  <p className="text-white/50 text-sm">
                    Columns: Certificate ID, Student Name, College, Department, Role, Duration, Project, Technologies, Status, Issue Date…
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                data-testid="excel-file-input"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          )}

          {stage === "preview" && preview && (
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-purple-600/30 border border-purple-500/50 px-4 py-1.5 text-sm font-bold">
                  {preview.total} certificates detected
                </span>
                {preview.errors.length > 0 && (
                  <span className="rounded-full bg-amber-600/25 border border-amber-500/50 px-4 py-1.5 text-sm">
                    {preview.errors.length} row error(s)
                  </span>
                )}
                {preview.existing_count > 0 && (
                  <span className="rounded-full bg-blue-600/25 border border-blue-500/50 px-4 py-1.5 text-sm">
                    {preview.existing_count} existing ID(s) detected
                  </span>
                )}
                <span className="text-white/50 text-sm">{fileName}</span>
              </div>

              {preview.existing_count > 0 && (
                <div className="mb-4 rounded-xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-white/80 mb-2 font-semibold">
                    Some Certificate IDs already exist. What should I do?
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={dupMode === "skip"} onChange={() => setDupMode("skip")} />
                      Skip duplicates
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={dupMode === "update"} onChange={() => setDupMode("update")} />
                      Update existing records
                    </label>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-white/10 overflow-hidden max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 sticky top-0">
                    <tr className="text-left text-white/60">
                      <th className="px-3 py-2 font-semibold">Certificate ID</th>
                      <th className="px-3 py-2 font-semibold">Student</th>
                      <th className="px-3 py-2 font-semibold">College</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((r, i) => (
                      <tr key={i} className="border-t border-white/5">
                        <td className="px-3 py-2 font-mono text-purple-300">{r.certificate_id}</td>
                        <td className="px-3 py-2">{r.student_name}</td>
                        <td className="px-3 py-2 text-white/70">{r.college_name}</td>
                        <td className="px-3 py-2">
                          <span className="text-xs uppercase font-bold text-white/60">
                            {r.certificate_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {preview.errors.length > 0 && (
                <div className="mt-3 max-h-28 overflow-y-auto text-xs text-amber-300/90 space-y-1">
                  {preview.errors.map((e, i) => (
                    <div key={i}>Row {e.row}: {e.message}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {stage === "importing" && (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-purple-400" size={36} />
              <p className="text-white/70">Importing certificates…</p>
            </div>
          )}

          {stage === "done" && result && (
            <div className="py-14 flex flex-col items-center gap-3 text-center" data-testid="excel-done">
              <CheckCircle2 size={48} className="text-green-400" />
              <p className="text-xl font-black">Import complete</p>
              <p className="text-white/70">
                {result.inserted} added · {result.updated} updated · {result.skipped} skipped
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
          {stage === "preview" && (
            <>
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:bg-white/5">
                Cancel
              </button>
              <button
                onClick={commit}
                disabled={!preview || preview.total === 0}
                data-testid="excel-import-confirm"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-40"
              >
                Import {preview?.total ?? 0} Certificates
              </button>
            </>
          )}
          {stage === "done" && (
            <button
              onClick={() => {
                onDone();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
            >
              Done
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
