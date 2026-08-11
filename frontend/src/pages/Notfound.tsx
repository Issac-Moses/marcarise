import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function Notfound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-slate-900 transition-colors duration-300 px-6">
      <Card className="w-full max-w-md mx-4 shadow-2xl border border-slate-200 rounded-[32px]">
        <CardContent className="pt-10 pb-8 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
              <AlertCircle className="text-blue-600" size={36} strokeWidth={2.4} />
            </div>
            <h1 className="text-5xl font-black text-slate-900">404</h1>
            <p className="text-xl font-bold text-slate-700 mt-1">
              Page Not Found
            </p>
          </div>

          <p className="mt-4 text-sm text-slate-500 mb-8">
            The page you're looking for doesn't exist — or maybe it just moved.
          </p>

          <Link href="/">
            <span
              data-testid="notfound-home-btn"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Home size={18} />
              Back to Home
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
