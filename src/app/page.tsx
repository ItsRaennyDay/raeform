"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, X, Instagram, Linkedin, Mail } from "lucide-react"
import { MeshGradient } from "@paper-design/shaders-react"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"

type FormDataState = {
  name: string
  email: string
  interest: string
  message: string
}

export default function Page() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    interest: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [isSubmitComplete, setIsSubmitComplete] = useState(false)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
    setTimeout(() => setContextMenu(null), 3000)
  }

  const launchConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 35,
      origin: { y: 0.6 },
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error("Submission failed")
      }

      setFormData({
        name: "",
        email: "",
        interest: "",
        message: "",
      })

      setSuccessOpen(true)
      launchConfetti()
    } catch (error) {
      window.alert("Something went wrong while submitting the form.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div onContextMenu={handleContextMenu}>
      {isSubmitComplete ? (
        <HeroGeometric 
          badge="Welcome to RAEFORM"
          title1="Thank You,"
          title2="See you soon!"
        />
      ) : (
        <main className="relative min-h-screen overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <MeshGradient
              className="absolute inset-0 h-full w-full"
              colors={["#000000", "#111111", "#2a2a2a", "#ffffff"]}
              speed={0.6}
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <section className="relative z-10">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 md:px-10 lg:px-16">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] backdrop-blur-sm" style={{
                background: 'linear-gradient(to right, #00DBFF, #46A1FE, #8793FE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Raeform is Coming Soon
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Bringing tomorrow&apos;s ideas today.
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                RAEFORM is building a sharper digital home for brands, founders,
                and growing businesses that need thoughtful design, streamlined
                systems, and websites that actually move people to act.
              </p>

              <p className="mt-5 max-w-xl text-xs leading-7 text-white/55 sm:text-sm">
                The full site is on the way. Join the list to be the first to
                know when it launches and get updates on new services, projects,
                and releases.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border bg-white/5 p-5 backdrop-blur-sm" style={{borderColor: 'rgba(0, 219, 255, 0.2)'}}>
                  <p className="text-xs uppercase tracking-[0.24em]" style={{color: 'rgba(0, 219, 255, 0.7)'}}>
                    Focus
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Web design, branding, funnels, and digital systems.
                  </p>
                </div>
                <div className="rounded-3xl border bg-white/5 p-5 backdrop-blur-sm" style={{borderColor: 'rgba(70, 161, 254, 0.2)'}}>
                  <p className="text-xs uppercase tracking-[0.24em]" style={{color: 'rgba(70, 161, 254, 0.7)'}}>
                    Built For
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Small businesses, nonprofits, and founders with vision.
                  </p>
                </div>
                <div className="rounded-3xl border bg-white/5 p-5 backdrop-blur-sm" style={{borderColor: 'rgba(135, 147, 254, 0.2)'}}>
                  <p className="text-xs uppercase tracking-[0.24em]" style={{color: 'rgba(135, 147, 254, 0.7)'}}>
                    Launch Note
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Get first access to updates, offers, and new releases.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Follow or contact Us</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/byraeform/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    style={{borderColor: 'rgba(0, 219, 255, 0.3)'}}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/raeform/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    style={{borderColor: 'rgba(70, 161, 254, 0.3)'}}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:rae@byraeform.com"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    style={{borderColor: 'rgba(135, 147, 254, 0.3)'}}
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="rounded-[2rem] border bg-black/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-sm sm:p-8" style={{borderColor: 'rgba(0, 219, 255, 0.15)'}}>
                <div className="mb-6">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                    Stay in the loop
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                    Join the RAEFORM list
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-white/60">
                    Drop your details below and get notified when the site goes
                    live.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-white/75"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 transition"
                      style={{borderColor: 'rgba(0, 219, 255, 0.2)'}}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-white/75"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 transition"
                      style={{borderColor: 'rgba(70, 161, 254, 0.2)'}}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="mb-2 block text-sm text-white/75"
                    >
                      What are you interested in?
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full rounded-2xl border bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                      style={{borderColor: 'rgba(70, 161, 254, 0.3)'}}
                      required
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="web-design">Web Design</option>
                      <option value="branding">Branding</option>
                      <option value="funnels-automations">
                        Funnels &amp; Automations
                      </option>
                      <option value="general-updates">General Updates</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm text-white/75"
                    >
                      Message <span className="text-white/35">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me a little about what you're building."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 transition"
                      style={{borderColor: 'rgba(135, 147, 254, 0.2)'}}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70 transition"
                    style={{
                      backgroundImage: isSubmitting ? 'linear-gradient(to right, #ffffff, #ffffff)' : 'linear-gradient(135deg, #ffffff 0%, #f0f0ff 100%)',
                      backgroundSize: '200% 200%'
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Notify me when it launches"}
                  </button>
                </form>

                <p className="mt-4 text-xs leading-5 text-white/40">
                  By joining, you&apos;ll receive launch updates and occasional
                  emails about Raeform offers and releases.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-6 text-sm text-white/35">
            <p>© 2026 RAEFORM. All rights reserved.</p>
          </div>
        </div>
      </section>

          <AnimatePresence>
            {successOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setSuccessOpen(false)
                    setIsSubmitComplete(true)
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 24 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="relative z-[101] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 p-8 text-white shadow-2xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessOpen(false)
                      setIsSubmitComplete(true)
                    }}
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="text-center text-2xl font-semibold tracking-tight">
                    You&apos;re on the list
                  </h3>

                  <p className="mt-3 text-center text-sm leading-6 text-white/65">
                    Your details have been submitted successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSuccessOpen(false)
                      setIsSubmitComplete(true)
                    }}
                    className="mt-6 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      )}

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-none fixed z-[200] rounded-lg border border-white/20 bg-black/90 px-3 py-2 text-xs text-white/80 backdrop-blur-sm"
            style={{
              left: `${contextMenu.x + 10}px`,
              top: `${contextMenu.y + 10}px`,
            }}
          >
            Need help? Contact us at rae@byraeform.com
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
