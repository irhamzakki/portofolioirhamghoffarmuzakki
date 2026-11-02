import { useEffect, useRef, useState, type ReactNode } from "react";
import cvAsset from "@/assets/cv-irham.asset.json";

/* ================= Data ================= */

const NAV = [
  { id: "home", label: "Home" },
  { id: "work", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const TICKER = [
  "FULL-STACK WEB DEVELOPMENT",
  "DATA SCIENCE",
  "MACHINE LEARNING",
  "DATABASE MANAGEMENT",
  "HEALTH INFORMATICS",
  "UI/UX",
];

const STATS = [
  { value: "3,59", label: "IPK — Cum Laude" },
  { value: "2022–2026", label: "S1 Informatika, UNIMUS" },
  { value: "2 Instansi", label: "Pemerintah & Kampus" },
];

const PROJECTS = [
  {
    no: "01",
    title: "Portal Alumni & Kemahasiswaan",
    org: "Biro Kemahasiswaan UNIMUS",
    period: "Okt 2025 — Sekarang",
    desc: "Menyentralisasi layanan alumni dan kemahasiswaan universitas: merancang arsitektur basis data terintegrasi, membangun antarmuka (UI/UX), serta menerapkan sistem otentikasi akun mahasiswa yang aman pada portal resmi.",
    tags: ["Database Architecture", "UI/UX", "Authentication", "Web App"],
    wide: true,
  },
  {
    no: "02",
    title: "Ruangku",
    org: "Dinkominfotik Kabupaten Brebes",
    period: "Agu — Des 2024",
    desc: "Modul server-side dan antarmuka publik untuk pengelolaan layanan informasi publik serta pengarsipan data instansi, dengan optimasi query SQL dan integrasi RESTful API.",
    tags: ["PHP", "SQL Optimization", "RESTful API", "Git"],
  },
  {
    no: "03",
    title: "Sistem Pendataan Pengabdian Masyarakat",
    org: "Biro Kemahasiswaan UNIMUS",
    period: "2025",
    desc: "Sistem pendataan kegiatan pengabdian masyarakat di lingkungan universitas beserta pengelolaan pembaruannya secara berkala.",
    tags: ["Web App", "Data Management"],
  },
];

const EXPERIENCE = [
  {
    role: "Staf Magang Kemahasiswaan & Alumni",
    org: "Pengembang Sistem — Biro Kemahasiswaan UNIMUS",
    period: "Okt 2025 — Sekarang",
    bullets: [
      "Menginisiasi, merancang arsitektur basis data, dan membangun komponen antarmuka (UI/UX) situs web Portal Alumni & Kemahasiswaan untuk menyentralisasi layanan serta mempercepat akses informasi mahasiswa.",
      "Merancang struktur basis data alumni yang terintegrasi dan mengimplementasikan sistem otentikasi akun mahasiswa pada portal resmi Biro Kemahasiswaan secara aman.",
      "Merancang aset visual kreatif, banner interaktif, dan materi publikasi prestasi mahasiswa untuk meningkatkan engagement serta citra positif universitas di platform digital.",
      "Mengelola fungsi hubungan masyarakat serta bertindak sebagai koordinator teknis dan fasilitator kegiatan kemahasiswaan tingkat universitas.",
      "Membuat Sistem Pendataan Pengabdian Masyarakat dan mengelola pembaruannya.",
    ],
  },
  {
    role: "Web Developer Intern",
    org: "Dinkominfotik Kabupaten Brebes",
    period: "Agu 2024 — Des 2024",
    bullets: [
      "Mengembangkan modul server-side dan antarmuka publik pada aplikasi web Ruangku untuk pengelolaan layanan informasi publik dan pengarsipan data instansi.",
      "Melakukan optimasi query SQL serta refactoring kode CSS/JS untuk mempercepat waktu respons pengembalian data (query response time) dan meningkatkan page load speed.",
      "Menghubungkan antarmuka pengguna dengan RESTful API backend serta melakukan pengujian dan debugging API menggunakan Postman dan Chrome DevTools.",
      "Bekerja sama secara aktif dengan tim IT instansi menggunakan Git version control untuk mengelola source code dan menyelesaikan merge conflict.",
    ],
  },
];

const LEADERSHIP = [
  "Koordinator Mahasiswa KKN",
  "Mentor Al-Islam & Kemuhammadiyahan (LPPM UNIMUS)",
  "Delegasi Pendidikan Dasar MENWA — Rindam IV/Diponegoro, Magelang",
  "Diklat Bela Negara — Kementerian Pertahanan RI, Dodiklatpur Klaten",
];

const TRAININGS = [
  { name: "Seminar & Pelatihan Oracle Academy — Dedomena", year: "2023" },
  { name: "Pelatihan Database Programming with SQL", year: "2023" },
  { name: "Kuliah Umum: Peluang Teknologi Informasi di Era Industry 4.0 & Society 5.0", year: "2023" },
  { name: "Pendidikan Dasar Resimen Mahasiswa (MENWA Rindam IV/Diponegoro, Magelang)", year: "2023" },
  { name: "Diklat Bela Negara — Kementerian Pertahanan RI, Dodiklatpur Klaten", year: "2023" },
  { name: "Program Penguatan Nilai Empat Pilar Kebangsaan — Kesbangpol", year: "2025" },
  { name: "Pelatihan Mentoring Al-Islam & Kemuhammadiyahan — LPPM UNIMUS", year: "2023–2026" },
];

const SKILL_GROUPS = [
  {
    title: "Pemrograman & Web",
    items: ["Python", "PHP", "JavaScript (ES6+)", "HTML5", "CSS3", "C++", "SQL"],
  },
  {
    title: "Framework & Database",
    items: ["Laravel", "CodeIgniter", "Bootstrap 5", "Tailwind CSS", "MySQL — Optimization & Triggers"],
  },
  {
    title: "Tools & Software",
    items: ["Git & GitHub", "Postman", "Figma", "Visual Studio Code", "XAMPP", "Canva", "MS Office"],
  },
];

const SOFT_SKILLS = [
  "Leadership & Kerja Sama Tim",
  "Public Speaking & Komunikasi Strategis",
  "Problem Solving & Analytical Thinking",
  "Koordinasi Proyek & Manajemen Acara",
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/irham-ghoffar" },
  { label: "GitHub", href: "https://github.com/irhamghoffar" },
  { label: "Instagram", href: "https://www.instagram.com/irhamgh.mz/" },
];

/* ================= Primitives ================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.classList.contains("motion-off")) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${on ? "reveal-on" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function SectionHead({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <Reveal>
        <p className="text-xs font-semibold tracking-[0.35em] text-cine">{index}</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="mt-3 font-display text-4xl leading-none tracking-wide md:text-6xl">{title}</h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={120}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  download,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      className="inline-flex items-center justify-center gap-2 bg-cine px-7 py-3 font-display text-sm tracking-widest text-paper transition-colors hover:bg-cine-deep"
    >
      {children}
    </a>
  );
}

function GhostButton({
  href,
  children,
  download,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      className="inline-flex items-center justify-center gap-2 border border-line px-7 py-3 font-display text-sm tracking-widest text-paper transition-colors hover:border-cine hover:text-cine"
    >
      {children}
    </a>
  );
}

/* ================= Header ================= */

export function Header() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleMotion = () => {
    const next = !motion;
    setMotion(next);
    document.documentElement.classList.toggle("motion-off", !next);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#home" className="font-display text-sm tracking-[0.2em] md:text-base">
          IRHAM GHOFFAR <span className="text-cine">MUZAKKI</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`text-xs font-semibold tracking-widest transition-colors ${
                active === n.id ? "text-cine" : "text-mute hover:text-paper"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleMotion}
            aria-pressed={!motion}
            className="flex items-center gap-2 border border-line px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-mute transition-colors hover:border-cine hover:text-paper"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${motion ? "bg-cine" : "bg-mute"}`} />
            MOTION {motion ? "ON" : "OFF"}
          </button>
          <a
            href="#contact"
            className="bg-cine px-5 py-2 font-display text-xs tracking-widest text-paper transition-colors hover:bg-cine-deep"
          >
            LET'S TALK
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Buka menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
        >
          <span className={`h-px w-5 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-ink/95 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm font-semibold tracking-widest ${
                  active === n.id ? "text-cine" : "text-mute"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <button
              onClick={toggleMotion}
              className="flex items-center gap-2 border border-line px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-mute"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${motion ? "bg-cine" : "bg-mute"}`} />
              MOTION {motion ? "ON" : "OFF"}
            </button>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-cine px-5 py-2 font-display text-xs tracking-widest text-paper"
            >
              LET'S TALK
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* ================= Hero ================= */

function PhotoCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -left-4 -top-4 h-full w-full border border-cine/40" aria-hidden="true" />
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center border border-line bg-card">
        <span className="font-display text-8xl leading-none tracking-wide text-paper md:text-9xl">IGM</span>
        <span className="mt-4 font-hand text-2xl text-mute">foto profil — segera</span>
      </div>
      <div className="absolute -bottom-4 -right-4 h-full w-full border border-line" aria-hidden="true" />
      <p className="mt-8 text-center text-[10px] font-semibold tracking-[0.35em] text-mute">
        SEMARANG, INDONESIA
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div
        className="hero-word pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 whitespace-nowrap text-[24vw] md:top-10 md:text-[17vw]"
        aria-hidden="true"
      >
        PORTFOLIO
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:pt-24">
        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.35em] text-cine">
              PORTFOLIO — 2026 / SEMARANG, INDONESIA
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide md:text-7xl">
              BUILDING DIGITAL <span className="text-cine">EXPERIENCES.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 font-hand text-2xl text-mute md:text-3xl">
              Turning ideas into functional digital experiences.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 font-display text-lg tracking-[0.15em] md:text-xl">
              IRHAM GHOFFAR MUZAKKI
            </p>
            <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-mute">
              INFORMATICS FRESH GRADUATE — FULL-STACK WEB · DATA SCIENCE · MACHINE LEARNING
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-mute">
              Saya Irham Ghoffar Muzakki, fresh graduate S1 Informatika dengan fokus pada pengembangan
              aplikasi web, manajemen basis data, serta penerapan Data Science dan Machine Learning.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton href="#work">LIHAT PROYEK</PrimaryButton>
              <GhostButton href={cvAsset.url} download>
                UNDUH CV
              </GhostButton>
              <span className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-mute">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cine" />
                TERSEDIA UNTUK KOLABORASI
              </span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl text-paper md:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-mute">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <PhotoCard />
        </Reveal>
      </div>

      <div className="relative overflow-hidden border-y border-line py-4">
        <div className="marquee-track items-center gap-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
              {TICKER.map((t) => (
                <span key={t} className="flex items-center gap-10 font-display text-lg tracking-widest text-mute">
                  {t}
                  <span className="text-cine">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Selected Work ================= */

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="01 — PROJECTS"
          title="SELECTED WORK"
          subtitle="Projects that turn ideas into solutions."
        />
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.no}
              delay={i * 80}
              className={`bg-card p-8 md:p-10 ${p.wide ? "md:col-span-2" : ""}`}
            >
              <article className="flex h-full flex-col">
                <p className="font-display text-3xl text-cine/70">{p.no}</p>
                <h3 className="mt-4 font-display text-2xl tracking-wide">{p.title}</h3>
                <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-mute">
                  {p.org} — {p.period}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">{p.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-line px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-mute"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= About ================= */

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
        <div>
          <SectionHead index="02 — ABOUT" title="TENTANG SAYA" />
          <Reveal>
            <p className="text-sm leading-relaxed text-mute">
              Saya adalah mahasiswa S1 Informatika Universitas Muhammadiyah Semarang dengan predikat
              Cum Laude (IPK 3,59) yang memiliki keahlian dalam pengembangan aplikasi web Full-Stack
              (Frontend &amp; Backend), arsitektur basis data, serta penerapan Data Science dan
              Machine Learning.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Berpengalaman di instansi pemerintah dan kampus, saya terbiasa mengembangkan modul web
              instansi (Ruangku), mengoptimalkan query basis data MySQL, merancang RESTful API, serta
              mengelola portal digital dan layanan kemahasiswaan.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Dengan keterampilan komunikasi, analisis sistem, dan penyelesaian masalah yang baik,
              saya berkomitmen memberikan kontribusi terbaik untuk mendukung perkembangan dan inovasi
              teknologi.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-hand text-3xl text-cine">
              "Konsentrasi Kesehatan Informatika — teknologi yang berdampak langsung pada orang."
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="text-xs font-semibold tracking-[0.35em] text-cine">PENDIDIKAN</h3>
          </Reveal>
          <div className="mt-6 space-y-px border border-line bg-line">
            <Reveal className="bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg tracking-wide">
                  S1 INFORMATIKA — KONSENTRASI KESEHATAN INFORMATIKA
                </h4>
                <span className="text-xs font-semibold text-mute">2022 — 2026</span>
              </div>
              <p className="mt-1 text-sm text-mute">Universitas Muhammadiyah Semarang</p>
              <p className="mt-2 font-display text-2xl text-cine">
                IPK 3,59 <span className="font-body text-xs font-semibold tracking-[0.2em] text-mute">CUM LAUDE</span>
              </p>
            </Reveal>
            <Reveal delay={80} className="bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg tracking-wide">PONDOK PESANTREN DARUTTAQWA</h4>
                <span className="text-xs font-semibold text-mute">Jun 2017 — Jul 2022</span>
              </div>
              <p className="mt-1 text-sm text-mute">Kabupaten Ponorogo</p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <h3 className="mt-10 text-xs font-semibold tracking-[0.35em] text-cine">FAKTA CEPAT</h3>
          </Reveal>
          <Reveal delay={160}>
            <dl className="mt-4 divide-y divide-line border border-line">
              {(
                [
                  ["Lokasi", "Semarang, Indonesia"],
                  ["Email", "Irhamzakkii@gmail.com"],
                  ["Telepon", "085792251325"],
                  ["Status", "Fresh Graduate — terbuka untuk kolaborasi"],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-[10px] font-semibold tracking-[0.25em] text-mute">{k.toUpperCase()}</dt>
                  <dd className="text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Experience ================= */

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="03 — EXPERIENCE"
          title="PENGALAMAN"
          subtitle="Pengalaman kerja, kepemimpinan, dan pelatihan yang membentuk cara saya bekerja."
        />

        <div className="space-y-px border border-line bg-line">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role} delay={i * 80} className="bg-card p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                <div>
                  <h3 className="font-display text-2xl tracking-wide">{e.role}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-cine">{e.org}</p>
                </div>
                <span className="text-xs font-semibold tracking-[0.2em] text-mute">{e.period}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-mute">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-cine" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="text-xs font-semibold tracking-[0.35em] text-cine">KEPEMIMPINAN &amp; ORGANISASI</h3>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-5 divide-y divide-line border border-line">
                {LEADERSHIP.map((l) => (
                  <li key={l} className="flex items-center gap-3 px-5 py-3 text-sm text-mute">
                    <span className="h-1 w-1 rounded-full bg-cine" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h3 className="text-xs font-semibold tracking-[0.35em] text-cine">PELATIHAN &amp; SERTIFIKASI</h3>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-5 divide-y divide-line border border-line">
                {TRAININGS.map((t) => (
                  <li key={t.name} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <span className="text-sm text-mute">{t.name}</span>
                    <span className="shrink-0 text-xs font-semibold text-cine">{t.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Skills ================= */

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="04 — SKILLS"
          title="KEAHLIAN"
          subtitle="Perangkat yang saya gunakan untuk membangun solusi digital dari hulu ke hilir."
        />
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="bg-card p-8">
              <p className="font-display text-3xl text-cine/70">0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl tracking-wide">{g.title.toUpperCase()}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="border border-line px-3 py-1.5 text-xs font-semibold text-mute transition-colors hover:border-cine hover:text-cine"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-12 border border-line p-8">
            <h3 className="text-xs font-semibold tracking-[0.35em] text-cine">SOFT SKILL</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {SOFT_SKILLS.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-mute">
                  <span className="h-px w-6 bg-cine" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Contact ================= */

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.35em] text-cine">05 — CONTACT</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 font-display text-5xl leading-none tracking-wide md:text-7xl">
            LET'S BUILD <span className="text-cine">SOMETHING.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-mute">
            Terbuka untuk peluang karier, proyek pengembangan web, dan kolaborasi di bidang Data
            Science maupun Machine Learning. Hubungi saya melalui kanal di bawah.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="mailto:Irhamzakkii@gmail.com">IRHAMZAKKII@GMAIL.COM</PrimaryButton>
            <GhostButton href="tel:+6285792251325">0857 9225 1325</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="mx-auto mt-10 grid max-w-2xl gap-px border border-line bg-line md:grid-cols-4">
            {[
              ...SOCIALS.map((s) => ({ label: s.label, href: s.href })),
              { label: "Portofolio Drive", href: "https://drive.google.com/drive/folders/13YUGtzvoUeifO3h2C8U9Sc2VgLR1e4la?usp=sharing" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="bg-card px-5 py-5 font-display text-sm tracking-widest text-mute transition-colors hover:text-cine"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Footer ================= */

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-mute md:flex-row">
        <span className="font-display text-sm tracking-[0.2em] text-paper">
          IRHAM <span className="text-cine">G. M.</span>
        </span>
        <span>© 2026 Irham Ghoffar Muzakki — Semarang, Indonesia</span>
        <span className="font-hand text-lg">Turning ideas into functional digital experiences.</span>
      </div>
    </footer>
  );
}
