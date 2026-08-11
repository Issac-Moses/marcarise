import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SERVICE_OPTIONS = [
  "Video Editing",
  "Social Media Management",
  "Personal Branding",
  "UI/UX Design",
  "Web Development",
  "Content Strategy",
  "Branding",
  "Video Production",
];

const schema = z.object({
  full_name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z
    .string()
    .min(6, "Please enter a valid phone number.")
    .max(20, "Too long."),
  services: z
    .array(z.string())
    .min(1, "Pick at least one service you're interested in."),
  website_url: z
    .string()
    .max(200, "Too long.")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
});

type FormData = z.infer<typeof schema>;

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpzzawl";
const LINKEDIN_URL =
  (import.meta.env as Record<string, string>).REACT_APP_LINKEDIN_URL ||
  "https://www.linkedin.com/company/marcarise";

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      services: [],
      website_url: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {

  setSubmitting(true);

  try {

    const payload = {
      _subject: `New Contact Form Submission from ${data.full_name}`,
      _replyto: data.email,
      name: data.full_name,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      services: data.services.join(", "),
      website_url: data.website_url || "N/A",
      message: data.message,
    };

    const response = await fetch(
      FORMSPREE_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log(result);

    if (response.ok) {

      setSubmitted(true);

   toast({
  title: (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <CheckCircle2 className="text-white" size={20} />
      </div>

      <div>
        <p className="font-black text-white text-base tracking-tight">
          Message Delivered 🚀
        </p>

        <p className="text-white/70 text-sm font-medium">
          Marca Rise team will contact you shortly.
        </p>
      </div>
    </div>
  ),

  className:
    "border border-white/10 bg-[#050816]/95 backdrop-blur-2xl text-white rounded-[24px] shadow-[0_20px_80px_rgba(124,12,231,0.35)] px-5 py-4",
});

      form.reset();

    } else {

      const errorMessage = result.errors
        ? result.errors.map((e: { message: string }) => e.message).join(" ")
        : result.detail || "Could not send your message.";

      toast({
        title: "Couldn't send",
        description: errorMessage,
      });

    }

  } catch (error) {

    console.log(error);

    toast({
      title: "Server Error",
      description:
        "Something went wrong.",
    });

  } finally {

    setSubmitting(false);

  }

}
  const selectedServices = form.watch("services");

  return (
    <div className="min-h-screen bg-[#f7f5ff] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Section className="max-w-4xl text-center mx-auto">
            <p className="uppercase tracking-[0.35em] text-blue-600 text-xs sm:text-sm font-black mb-5 sm:mb-6">
              Contact Marca Rise
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1] tracking-tight mb-6 sm:mb-8">
              Let's Build
              <br />
              <span className="text-blue-600">Something Amazing</span>
            </h1>

            <p className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Tell us about your brand. We'll get back to you within one
              business day with a clear next step.
            </p>
          </Section>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-blue-100 shadow-[0_20px_60px_rgba(124,12,231,0.08)] p-6 sm:p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6 mb-8 sm:mb-10">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3">
                        Send a Message
                      </h2>
                      <p className="text-slate-500 text-base sm:text-lg">
                        Fill out the form. We'll be in your inbox shortly.
                      </p>
                    </div>
                  </div>

                  {submitted ? (
                    <div
                      data-testid="contact-success-state"
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <CheckCircle2 className="text-blue-600" size={36} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-3xl font-black mb-3">
                        Message received.
                      </h3>
                      <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
                        Thanks for reaching out. We'll get back to you within
                        one business day.
                      </p>
                      <button

  type="button"
  onClick={() => {

    setSubmitted(false);

    // mobile safe scroll reset
    window.scrollTo(0, 0);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    requestAnimationFrame(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });

    });

  }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300"
                        data-testid="contact-send-another-btn"
                      >
                        Send another
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        data-testid="contact-form"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Your name"
                                    data-testid="contact-input-name"
                                    className="h-14 rounded-2xl border-blue-100 bg-blue-50/40 focus:border-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="you@brand.com"
                                    data-testid="contact-input-email"
                                    className="h-14 rounded-2xl border-blue-100 bg-blue-50/40 focus:border-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                  Phone Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="+91 XXXXX XXXXX"
                                    data-testid="contact-input-phone"
                                    className="h-14 rounded-2xl border-blue-100 bg-blue-50/40 focus:border-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="website_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-slate-700">
                                  Current Website URL
                                  <span className="text-slate-400 font-normal ml-1">
                                    (optional)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="https://yourbrand.com"
                                    data-testid="contact-input-website"
                                    className="h-14 rounded-2xl border-blue-100 bg-blue-50/40 focus:border-blue-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">
                                Services Interested In
                              </FormLabel>
                              <div
                                className="grid sm:grid-cols-2 gap-3 mt-2"
                                data-testid="contact-services-group"
                              >
                                {SERVICE_OPTIONS.map((opt) => {
                                  const checked = field.value?.includes(opt);
                                  return (
                                    <label
                                      key={opt}
                                      className={`
                                        flex items-center gap-3 px-5 py-4 rounded-2xl border cursor-pointer
                                        transition-all duration-200 select-none
                                        ${checked
                                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                                          : "bg-blue-50/40 border-blue-100 text-slate-700 hover:border-blue-300"}
                                      `}
                                      data-testid={`contact-service-${opt
                                        .toLowerCase()
                                        .replace(/\s|\//g, "-")}`}
                                    >
                                      <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={checked}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            field.onChange([
                                              ...(field.value || []),
                                              opt,
                                            ]);
                                          } else {
                                            field.onChange(
                                              (field.value || []).filter(
                                                (v: string) => v !== opt,
                                              ),
                                            );
                                          }
                                        }}
                                      />
                                      <span
                                        className={`
                                          w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2
                                          ${checked
                                            ? "bg-white border-white text-blue-600"
                                            : "border-blue-200 bg-white"}
                                        `}
                                      >
                                        {checked && (
                                          <CheckCircle2 size={14} strokeWidth={3} />
                                        )}
                                      </span>
                                      <span className="font-semibold text-sm">
                                        {opt}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                              {selectedServices?.length > 0 && (
                                <p className="mt-3 text-xs text-slate-400">
                                  {selectedServices.length} selected
                                </p>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">
                                Your Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={6}
                                  placeholder="A quick line about your brand, goal and timeline…"
                                  data-testid="contact-input-message"
                                  className="rounded-2xl border-blue-100 bg-blue-50/40 focus:border-blue-500 resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <button
                          type="submit"
                          disabled={submitting}
                          data-testid="contact-submit-btn"
                          className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold text-lg transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-3 shadow-xl shadow-blue-200"
                        >
                          {submitting ? (
                            <>
                              <span className="inline-block w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-blue-600 text-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(124,12,231,0.2)] relative overflow-hidden">
                <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full border border-white/10" />

                <h3 className="text-3xl font-black mb-8">Contact Info</h3>

                <div className="space-y-8">
                  <a
                    href="tel:+918925535344"
                    className="flex items-start gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Phone</p>
                      <p className="font-semibold text-lg">+91 89255 35344</p>
                    </div>
                  </a>

                  <a
                    href="mailto:sam.marcarise@gmail.com"
                    className="flex items-start gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Email</p>
                      <p className="font-semibold text-lg">
                        info@marcarise.in
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Location</p>
                      <p className="font-semibold text-lg">Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="bg-white rounded-[32px] border border-blue-100 p-8 shadow-[0_20px_60px_rgba(124,12,231,0.06)]">
                <h3 className="text-2xl font-black mb-6">Connect With Us</h3>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/918925535344"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-social-whatsapp"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                  >
                    <SiWhatsapp
                      size={22}
                      className="text-blue-600 group-hover:text-white"
                    />
                    <span className="font-semibold">WhatsApp</span>
                  </a>

                  <a
                    href="https://instagram.com/marcarise.in"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-social-instagram"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                  >
                    <SiInstagram
                      size={22}
                      className="text-blue-600 group-hover:text-white"
                    />
                    <span className="font-semibold">Instagram</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/marca-rise/"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="contact-social-linkedin"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                  >
                    <FaLinkedin
                      size={22}
                      className="text-blue-600 group-hover:text-white"
                    />
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}