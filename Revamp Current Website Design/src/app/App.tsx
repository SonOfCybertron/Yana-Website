import { useState, useEffect } from "react";
import {
  submitInquiry, submitServiceRequest, submitSupportTicket,
  subscribeCareerNotification,
} from "@/api/api";
import {
  Search, ChevronDown, Menu, X, Phone, Mail,
  MapPin, Linkedin, Facebook, Youtube, Download, FileText,
  MessageSquare, PhoneCall, ArrowRight, Star, Shield, Award,
  Microscope, FlaskConical, Wrench, CheckCircle, Filter,
  SlidersHorizontal, Grid3X3, List, ChevronLeft, Quote,
  Beaker, Gauge, Zap, Building2, Users, Globe, Clock,
  ChevronRight, HelpCircle, BookOpen, FolderOpen, PhoneIncoming,
  ChevronUp, Languages, Book, Loader2, Headset, AlertCircle
} from "lucide-react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
type Lang = "EN" | "FIL";
const T = {
  EN: {
    tagline: "Growth through Science, since 1979",
    home: "Home", products: "Products", services: "Services",
    about: "About Us", careers: "Careers", contact: "Contact Us",
    support: "Support", resources: "Resources",
    searchPlaceholder: "Search products, brands, categories...",
    heroTitle1: "YOUR TRUSTED PARTNER IN",
    heroTitle2: "CHEMICAL SUPPLIES",
    heroTitle3: "& LABORATORY EQUIPMENT",
    heroSub: "Delivering high-quality reagents, instruments, and solutions for every scientific need — serving the Philippines since 1979.",
    browseProducts: "Browse Products", requestConsultation: "Request Consultation",
    findProduct: "Find Your Product", searchByName: "Search by name, brand, or category...",
    allBrands: "All Brands", allCategories: "All Categories",
    searchProducts: "Search Products", featuredProducts: "Featured Products",
    viewAllProducts: "View all products", requestQuote: "Request Quote",
    viewDetails: "View Details", contactSales: "Contact Sales",
    downloadDatasheet: "Download Datasheet", productBrochure: "Product Brochure",
    productInquiry: "Product Inquiry", requestCallback: "Request Callback",
    brandPartners: "Our Brand Partners", technicalServices: "Technical Services",
    servicesSubtitle: "Factory-trained technicians providing calibration, repair, and maintenance across the Philippines.",
    learnMore: "Learn more", trustedBy: "Trusted by Leading Organizations",
    readyToEquip: "Ready to Equip Your Laboratory?",
    readySubtitle: "Get expert consultation, competitive quotes, and full technical support from our team.",
    browseCatalog: "Browse Catalog", allProducts: "All Products",
    productsFound: "products found", noProducts: "No products found",
    noProductsSub: "Try adjusting your search or filters",
    needHelp: "Need Help?", needHelpSub: "Talk to our technical sales team for expert product recommendations.",
    quickAccess: "Quick Access", faqs: "FAQs", helpDesk: "Help Desk",
    contactDirectory: "Contact Directory", resourceLibrary: "Resource Library",
    manuals: "Manuals", certificates: "Certificates",
    datasheets: "Datasheets", productDocs: "Product Documents",
    submitRequest: "Submit Request", submitMessage: "Submit Message",
    sendMessage: "Send Us a Message", backToProducts: "Back to Products",
    technicalSpecs: "Technical Specifications", scopeOfServices: "Scope of Services",
    requestService: "Request This Service", requestAService: "Request a Service",
    formSubtitle: "Fill out the form below and our team will get back to you within 24 hours.",
    notifyMe: "Notify Me of Openings", noJobs: "No Open Positions Right Now",
    noJobsSub: "We don't have any active job postings at the moment, but we are always looking for talented individuals.",
    joinTeam: "Join Our Team", careersTitle: "Careers at Yana Chemodities",
    careersSubtitle: "Join our growing team of dedicated professionals and be a part of Yana Chemodities Inc. today!",
    aboutTitle: "About Yana Chemodities", ourStory: "Our Story",
    fourDecades: "Four Decades of Scientific Excellence",
    mission: "Mission", vision: "Vision", contactTitle: "Contact Us",
    contactSubtitle: "We'd love to hear from you. Fill out the form or reach us directly.",
    filters: "Filters", clearFilters: "Clear",
    brand: "Brand", category: "Category", equipType: "Equipment Type", availability: "Availability",
    inquiryType: "Inquiry Type", concern: "Comment / Concern",
  },
  FIL: {
    tagline: "Paglago sa Pamamagitan ng Agham, mula 1979",
    home: "Tahanan", products: "Mga Produkto", services: "Mga Serbisyo",
    about: "Tungkol sa Amin", careers: "Karera", contact: "Makipag-ugnayan",
    support: "Suporta", resources: "Mga Mapagkukunan",
    searchPlaceholder: "Maghanap ng produkto, brand, kategorya...",
    heroTitle1: "ANG INYONG PINAGKAKATIWALAANG KASOSYO SA",
    heroTitle2: "KEMIKAL NA SUPLAY",
    heroTitle3: "AT KAGAMITANG PANLABORATORYO",
    heroSub: "Naghahatid ng mataas na kalidad na reagent, instrumento, at solusyon para sa bawat pangangailangan sa agham — naglilingkod sa Pilipinas mula 1979.",
    browseProducts: "I-browse ang Mga Produkto", requestConsultation: "Humiling ng Konsultasyon",
    findProduct: "Hanapin ang Inyong Produkto", searchByName: "Maghanap ayon sa pangalan, brand, o kategorya...",
    allBrands: "Lahat ng Brand", allCategories: "Lahat ng Kategorya",
    searchProducts: "Maghanap ng Produkto", featuredProducts: "Mga Tampok na Produkto",
    viewAllProducts: "Tingnan ang lahat ng produkto", requestQuote: "Humiling ng Quote",
    viewDetails: "Tingnan ang Detalye", contactSales: "Makipag-usap sa Sales",
    downloadDatasheet: "I-download ang Datasheet", productBrochure: "Brochure ng Produkto",
    productInquiry: "Katanungan sa Produkto", requestCallback: "Humiling ng Tawag",
    brandPartners: "Aming Mga Brand na Kasosyo", technicalServices: "Mga Teknikal na Serbisyo",
    servicesSubtitle: "Mga technician na sinanay ng pabrika na nagbibigay ng kalibrasyon, pagkukumpuni, at pagpapanatili sa buong Pilipinas.",
    learnMore: "Matuto pa", trustedBy: "Pinagkakatiwalaan ng Mga Nangungunang Organisasyon",
    readyToEquip: "Handa na bang I-equip ang Inyong Laboratoryo?",
    readySubtitle: "Makakuha ng dalubhasang konsultasyon, mapagkumpetensyang quote, at kumpletong teknikal na suporta mula sa aming koponan.",
    browseCatalog: "I-browse ang Katalogo", allProducts: "Lahat ng Produkto",
    productsFound: "mga produkto ang natagpuan", noProducts: "Walang natagpuang produkto",
    noProductsSub: "Subukang baguhin ang inyong paghahanap o mga filter",
    needHelp: "Kailangan ng Tulong?", needHelpSub: "Makipag-usap sa aming koponan ng teknikal na benta.",
    quickAccess: "Mabilis na Access", faqs: "Mga FAQ", helpDesk: "Help Desk",
    contactDirectory: "Direktoryo ng Kontak", resourceLibrary: "Aklatan ng Mapagkukunan",
    manuals: "Mga Manwal", certificates: "Mga Sertipiko",
    datasheets: "Mga Datasheet", productDocs: "Mga Dokumento ng Produkto",
    submitRequest: "Isumite ang Kahilingan", submitMessage: "Isumite ang Mensahe",
    sendMessage: "Magpadala ng Mensahe", backToProducts: "Bumalik sa Mga Produkto",
    technicalSpecs: "Mga Teknikal na Detalye", scopeOfServices: "Saklaw ng Mga Serbisyo",
    requestService: "Humiling ng Serbisyong Ito", requestAService: "Humiling ng Serbisyo",
    formSubtitle: "Punan ang form sa ibaba at ang aming koponan ay makikipag-ugnayan sa inyo sa loob ng 24 na oras.",
    notifyMe: "Abisuhan Ako", noJobs: "Walang Bukas na Posisyon sa Ngayon",
    noJobsSub: "Wala kaming mga aktibong job posting sa ngayon, ngunit lagi kaming naghahanap ng mga mahuhusay na indibidwal.",
    joinTeam: "Sumali sa Aming Koponan", careersTitle: "Karera sa Yana Chemodities",
    careersSubtitle: "Sumali sa aming lumalagong koponan ng mga dedikadong propesyonal at maging bahagi ng Yana Chemodities Inc. ngayon!",
    aboutTitle: "Tungkol sa Yana Chemodities", ourStory: "Ang Aming Kwento",
    fourDecades: "Apat na Dekada ng Kahusayan sa Agham",
    mission: "Misyon", vision: "Bisyon", contactTitle: "Makipag-ugnayan",
    contactSubtitle: "Nais naming marinig kayo. Punan ang form o makipag-ugnayan sa amin nang direkta.",
    filters: "Mga Filter", clearFilters: "I-clear",
    brand: "Brand", category: "Kategorya", equipType: "Uri ng Kagamitan", availability: "Availability",
    inquiryType: "Uri ng Katanungan", concern: "Komento / Alalahanin",
  },
} as const;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const BRANDS = ["Advantech", "Asecos", "Atago", "Brand", "Corning", "Elma", "Miele", "Metrohm", "Sartorius", "Thermo Fisher"];
const CATEGORIES = ["Equipments", "Laboratory Glass & Plastic Wares", "Industrial Line", "Chemicals", "Miscellaneous"];
const EQUIPMENT_TYPES = ["Analytical Instruments", "Centrifuges", "Dispensers & Burettes", "Filtration", "Measuring & Monitoring", "Sieves & Shakers", "Sonicators", "Storage Cabinets"];

const PRODUCTS = [
  { id: 1, name: "Refractometer PAL-α", brand: "Atago", category: "Equipments", type: "Analytical Instruments", price: "POA", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=420&fit=crop&auto=format", tag: "Featured", specs: { "Measurement Range": "0–85% Brix", "Resolution": "0.1% Brix", "Accuracy": "±0.2% Brix", "Temperature": "10–100°C" }, description: "Handheld digital refractometer for precise Brix measurement in food, beverage, and industrial applications." },
  { id: 2, name: "PP Membrane, ProfileII", brand: "Advantech", category: "Equipments", type: "Filtration", price: "POA", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=420&fit=crop&auto=format", tag: "New", specs: { "Material": "Polypropylene", "Pore Size": "0.2–10 µm", "Diameter": "47–293 mm", "Max Temp": "121°C" }, description: "High-performance PP membrane filters for particle analysis and quality control in laboratory settings." },
  { id: 3, name: "In-line Brix Monitor CM-BASEα", brand: "Atago", category: "Equipments", type: "Measuring & Monitoring", price: "POA", image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&h=420&fit=crop&auto=format", tag: "Featured", specs: { "Range": "0–85% Brix", "Output": "4-20 mA / RS-232C", "Connection": "1/2\" NPT", "Protection": "IP65" }, description: "Continuous in-line Brix monitoring solution for production line quality control and process automation." },
  { id: 4, name: "Automatic Digital Refractometer RX-7000α", brand: "Atago", category: "Equipments", type: "Analytical Instruments", price: "POA", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=420&fit=crop&auto=format", tag: "Best Seller", specs: { "Range": "0–100% Brix", "Accuracy": "±0.03% Brix", "Sample Volume": "0.3 mL", "Measurement Time": "3 sec" }, description: "Fully automated benchtop refractometer with Peltier temperature control for high-precision measurements." },
  { id: 5, name: "Digital Refractometer for Isopropyl Alcohol", brand: "Atago", category: "Equipments", type: "Analytical Instruments", price: "POA", image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=420&fit=crop&auto=format", tag: "", specs: { "Range": "0–100% IPA", "Accuracy": "±0.2%", "Temperature Comp": "10–40°C", "Protection": "IP65" }, description: "Dedicated refractometer for accurate isopropyl alcohol concentration measurement in pharmaceutical and industrial use." },
  { id: 6, name: "MIELE PLW 8615", brand: "Miele", category: "Equipments", type: "Analytical Instruments", price: "POA", image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&h=420&fit=crop&auto=format", tag: "New", specs: { "Capacity": "2 x DIN baskets", "Temp Range": "22–90°C", "Water Pressure": "1–6 bar", "Noise Level": "< 55 dB" }, description: "Professional laboratory glassware washer with validated cleaning processes for pharmaceutical and research labs." },
  { id: 7, name: "Chemical Safety Storage Cabinet", brand: "Asecos", category: "Equipments", type: "Storage Cabinets", price: "POA", image: "https://images.unsplash.com/photo-1581093196867-ca0e9e5d08ff?w=600&h=420&fit=crop&auto=format", tag: "Featured", specs: { "Capacity": "30–200 L", "Fire Resistance": "90 min", "Material": "Double-walled steel", "Standard": "EN 14470-1" }, description: "EN 14470-1 certified safety storage cabinet for flammable liquids, acids, and hazardous chemicals." },
  { id: 8, name: "Sonicator Ultrasonic Cleaner", brand: "Elma", category: "Equipments", type: "Sonicators", price: "POA", image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&h=420&fit=crop&auto=format", tag: "", specs: { "Frequency": "37 kHz", "Tank Volume": "3–120 L", "Power": "150–1800 W", "Timer": "1–99 min" }, description: "High-performance ultrasonic cleaning systems for precision parts, laboratory instruments, and industrial components." },
  { id: 9, name: "ASTM Test Sieves", brand: "Advantech", category: "Equipments", type: "Sieves & Shakers", price: "POA", image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&h=420&fit=crop&auto=format", tag: "", specs: { "Standard": "ASTM E11", "Frame": "8\", 12\" dia", "Mesh Range": "No.4–No.635", "Material": "Stainless Steel" }, description: "ASTM-certified woven wire test sieves for particle size analysis in soil, pharmaceutical, and food industries." },
  { id: 10, name: "Bottle-top Dispenser", brand: "Brand", category: "Laboratory Glass & Plastic Wares", type: "Dispensers & Burettes", price: "POA", image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&h=420&fit=crop&auto=format", tag: "Best Seller", specs: { "Volume": "1–100 mL", "Material": "PTFE/Borosilicate", "Autoclavable": "Yes", "Chemical Resistance": "Excellent" }, description: "Precision bottle-top dispensers for accurate, contamination-free liquid dispensing with chemical resistance." },
  { id: 11, name: "Corning Cell Counter", brand: "Corning", category: "Equipments", type: "Analytical Instruments", price: "POA", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=420&fit=crop&auto=format", tag: "New", specs: { "Count Range": "1×10⁴–1×10⁷/mL", "Accuracy": "±10%", "Sample Volume": "10 µL", "Results": "< 30 sec" }, description: "Automated cell counter for rapid, accurate viability and concentration measurements in cell culture workflows." },
  { id: 12, name: "Micropipette Set", brand: "Brand", category: "Laboratory Glass & Plastic Wares", type: "Dispensers & Burettes", price: "POA", image: "https://images.unsplash.com/photo-1576086476234-1103be98f096?w=600&h=420&fit=crop&auto=format", tag: "", specs: { "Volumes": "0.1–1000 µL", "Accuracy": "±0.6%", "Tip Ejector": "One-touch", "Standard": "ISO 8655" }, description: "ISO 8655-certified air displacement micropipettes for precise liquid handling in molecular biology and diagnostics." },
];

const SERVICES = [
  { icon: Gauge, title: "Calibration", description: "ISO 17025-accredited calibration services for all analytical instruments, ensuring measurement accuracy and regulatory compliance.", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=500&fit=crop&auto=format" },
  { icon: Shield, title: "Testing & Certification", description: "Comprehensive testing and certification programs against ISO, ASTM, and Philippine regulatory requirements.", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop&auto=format" },
  { icon: Wrench, title: "Repair", description: "Expert repair by factory-trained technicians. Genuine spare parts, rapid turnaround, and full warranty on repaired instruments.", image: "https://images.unsplash.com/photo-1581093196867-ca0e9e5d08ff?w=800&h=500&fit=crop&auto=format" },
  { icon: CheckCircle, title: "Preventive Maintenance", description: "Scheduled preventive maintenance to maximize equipment uptime and maintain GMP, GLP, and ISO compliance.", image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&h=500&fit=crop&auto=format" },
];

const STATS = [
  { value: "45+", label: "Years in Business", labelFIL: "Taon sa Negosyo", icon: Clock },
  { value: "1,000+", label: "Buying Companies", labelFIL: "Aktibong Kumpanya", icon: Building2 },
  { value: "100+", label: "Dealer Network", labelFIL: "Network ng Dealer", icon: Globe },
  { value: "70+", label: "Expert Employees", labelFIL: "Mga Eksperto", icon: Users },
];

const TESTIMONIALS = [
  { quote: "Yana has been our trusted supplier for over 15 years. Their technical expertise and after-sales support are unmatched in the Philippines.", author: "Dr. Maria Santos", role: "Lab Manager", company: "University of Santo Tomas" },
  { quote: "The calibration team is exceptionally professional. Our instruments are always returned on time and in perfect condition.", author: "Engr. Jose Reyes", role: "QC Head", company: "San Miguel Corporation" },
  { quote: "Competitive pricing, genuine products, and responsive sales team. Yana Chemodities is our go-to for all lab equipment needs.", author: "Ms. Christine Lim", role: "Procurement Manager", company: "Philippine Heart Center" },
];

const FAQS = [
  { q: "How do I request a product quote?", a: "Click 'Request Quote' on any product page, use our Quick Access panel, or contact our sales team directly. We respond within 24 business hours." },
  { q: "Do you offer after-sales support and warranties?", a: "Yes. All products come with manufacturer warranties. We also offer calibration, repair, preventive maintenance, and testing through our certified technical team." },
  { q: "Which areas in the Philippines do you serve?", a: "We have offices in Quezon City (Manila) and Cebu City. Technical and delivery services cover all of Luzon, Visayas, and Mindanao." },
  { q: "Can I download product datasheets and manuals?", a: "Yes. Datasheets, brochures, and safety documents are available in our Resource Library, filterable by brand, type, or category." },
  { q: "How do I schedule a calibration service?", a: "Visit our Services page and fill out the service request form, or contact our service department directly to schedule a date." },
  { q: "Do you carry genuine brand products?", a: "Yes. We are an authorized distributor for all brands we carry, including Atago, Advantech, Asecos, Corning, Elma, Miele, Metrohm, Sartorius, and Thermo Fisher." },
  { q: "What is your lead time for orders?", a: "In-stock items typically ship within 1–3 business days. Imported or made-to-order equipment: 2–8 weeks. Our sales team confirms upon order." },
  { q: "Can you provide ISO certification documents?", a: "Yes. ISO calibration certificates, test reports, and compliance documentation are available upon request through our Resource Library." },
];

const RESOURCES = [
  { id: 1, title: "Atago Refractometer PAL Series Manual", type: "Manual", brand: "Atago", format: "PDF", size: "3.2 MB", date: "2024-01" },
  { id: 2, title: "Advantech Test Sieve Operating Manual", type: "Manual", brand: "Advantech", format: "PDF", size: "1.8 MB", date: "2023-11" },
  { id: 3, title: "Elma Ultrasonic Cleaner User Guide", type: "Manual", brand: "Elma", format: "PDF", size: "4.1 MB", date: "2024-03" },
  { id: 4, title: "Miele PLW 8615 Installation Manual", type: "Manual", brand: "Miele", format: "PDF", size: "5.5 MB", date: "2024-02" },
  { id: 5, title: "ISO 17025 Calibration Certificate", type: "Certificate", brand: "Yana Chemodities", format: "PDF", size: "0.9 MB", date: "2025-01" },
  { id: 6, title: "Yana Chemodities ISO 9001 Certificate", type: "Certificate", brand: "Yana Chemodities", format: "PDF", size: "0.7 MB", date: "2024-08" },
  { id: 7, title: "Asecos Safety Cabinet EN 14470-1 Cert.", type: "Certificate", brand: "Asecos", format: "PDF", size: "1.1 MB", date: "2024-06" },
  { id: 8, title: "Atago PAL-α Refractometer Datasheet", type: "Datasheet", brand: "Atago", format: "PDF", size: "0.6 MB", date: "2024-04" },
  { id: 9, title: "Advantech PP Membrane ProfileII Datasheet", type: "Datasheet", brand: "Advantech", format: "PDF", size: "0.4 MB", date: "2023-12" },
  { id: 10, title: "Corning Cell Counter Datasheet", type: "Datasheet", brand: "Corning", format: "PDF", size: "0.8 MB", date: "2024-05" },
  { id: 11, title: "Elma EC 120 H Sonicator Datasheet", type: "Datasheet", brand: "Elma", format: "PDF", size: "0.5 MB", date: "2024-01" },
  { id: 12, title: "Yana Chemodities Full Product Catalog 2025", type: "Product Document", brand: "Yana Chemodities", format: "PDF", size: "18.4 MB", date: "2025-01" },
  { id: 13, title: "Asecos Chemical Safety Cabinet Brochure", type: "Product Document", brand: "Asecos", format: "PDF", size: "3.6 MB", date: "2024-07" },
  { id: 14, title: "Brand Bottle-top Dispenser Safety Data Sheet", type: "Product Document", brand: "Brand", format: "PDF", size: "1.2 MB", date: "2024-03" },
  { id: 15, title: "Sartorius Analytical Balance Quick Start Guide", type: "Manual", brand: "Sartorius", format: "PDF", size: "2.3 MB", date: "2024-06" },
];

const CONTACT_DIRECTORY = [
  { department: "Product Sales", contact: "sales@yanachemodities.com", phone: "+63 927 794 3497", desc: "Product inquiries, quotations, and orders" },
  { department: "Technical Service", contact: "service@yanachemodities.com", phone: "+63 956 235 5483", desc: "Calibration, repair, and maintenance scheduling" },
  { department: "Customer Support", contact: "support@yanachemodities.com", phone: "+63 956 235 5484", desc: "After-sales support, complaints, and general concerns" },
  { department: "Finance / Billing", contact: "finance@yanachemodities.com", phone: "8781-1048", desc: "Invoice queries, payments, and billing concerns" },
  { department: "Manila Office", contact: "manila@yanachemodities.com", phone: "8732-0171", desc: "151 Kaliraya Street, Quezon City" },
  { department: "Cebu Office", contact: "cebu@yanachemodities.com", phone: "+63 945 847 9543", desc: "Cebu City Branch" },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Page = "home" | "products" | "services" | "about" | "careers" | "contact" | "product-detail" | "support" | "resources";
interface Product { id: number; name: string; brand: string; category: string; type: string; price: string; image: string; tag: string; specs: Record<string, string>; description: string; }

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function SectionLabel({ children, light }: { children: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span className={`w-5 h-px ${light ? "bg-[#9ccc65]" : "bg-[#69b400]"}`} />
      <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${light ? "text-[#9ccc65]" : "text-[#69b400]"}`}>{children}</span>
    </div>
  );
}

function TagBadge({ tag }: { tag: string }) {
  if (!tag) return null;
  const cls = tag === "New" ? "bg-[#60A5FA] text-white" : tag === "Best Seller" ? "bg-amber-500 text-white" : "bg-[#69b400] text-white";
  return <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${cls}`}>{tag}</span>;
}

function FormInput({ label, required: req, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">{label}{req && <span className="text-[#69b400] ml-0.5">*</span>}</label>
      <input required={req} {...props} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 transition-all placeholder:text-gray-400" />
    </div>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full bg-[#69b400] text-white font-semibold py-3.5 rounded-xl hover:bg-[#558b2f] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[#69b400]/20">
      {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : children}
    </button>
  );
}

// ─── MOBILE BOTTOM BAR ────────────────────────────────────────────────────────
function MobileBottomBar({ setPage }: { setPage: (p: Page) => void }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", product: "" });
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "success">("idle");

  async function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    setQuoteState("loading");
    try {
      await submitInquiry({ type: "Request Quote", name: quoteForm.name, email: quoteForm.email, phone: quoteForm.phone, product_name: quoteForm.product, message: `Quick quote request for: ${quoteForm.product || "general inquiry"}` });
      setQuoteState("success");
    } catch {
      setQuoteState("idle");
    }
  }

  function closeQuote() { setQuoteOpen(false); setQuoteState("idle"); setQuoteForm({ name: "", email: "", phone: "", product: "" }); }

  return (
    <>
      {/* Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          {[
            { icon: MessageSquare, label: "Quote", action: () => setQuoteOpen(true) },
            { icon: PhoneCall, label: "Call", action: () => window.open("tel:+639277943497") },
            { icon: Search, label: "Search", action: () => setPage("products") },
            { icon: Mail, label: "Email", action: () => setPage("contact") },
          ].map(({ icon: Icon, label, action }) => (
            <button key={label} onClick={action}
              className="flex flex-col items-center gap-1 py-3 text-[#5A6478] hover:text-[#69b400] active:bg-gray-50 transition-colors">
              <Icon size={18} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick quote modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={closeQuote}>
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            {quoteState === "success" ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="text-[#69b400] mx-auto mb-3" />
                <p className="font-bold text-[#1e293b]">Request Sent!</p>
                <p className="text-[#5A6478] text-sm mt-1">We'll get back to you within 24 hours.</p>
                <button onClick={closeQuote} className="mt-4 text-sm text-[#69b400] font-semibold">Close</button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-[#1e293b]">Quick Quote Request</h3>
                  <button type="button" onClick={closeQuote} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
                </div>
                <div className="space-y-3">
                  <FormInput label="Name" required placeholder="Your full name" value={quoteForm.name} onChange={e => setQuoteForm(p => ({ ...p, name: e.target.value }))} />
                  <FormInput label="Email" required type="email" placeholder="your@email.com" value={quoteForm.email} onChange={e => setQuoteForm(p => ({ ...p, email: e.target.value }))} />
                  <FormInput label="Phone" type="tel" placeholder="+63 9XX XXX XXXX" value={quoteForm.phone} onChange={e => setQuoteForm(p => ({ ...p, phone: e.target.value }))} />
                  <div>
                    <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Product of Interest</label>
                    <input placeholder="Product name or model" value={quoteForm.product} onChange={e => setQuoteForm(p => ({ ...p, product: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 transition-all" />
                  </div>
                  <SubmitBtn loading={quoteState === "loading"}><MessageSquare size={15} /> Send Request</SubmitBtn>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── DESKTOP QUICK ACCESS WIDGET ──────────────────────────────────────────────
function QuickAccessWidget({ setPage, t }: { setPage: (p: Page) => void; t: typeof T["EN"] }) {
  const [open, setOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [cbForm, setCbForm] = useState({ name: "", phone: "", company: "", time: "Morning (8AM–12PM)" });
  const [cbState, setCbState] = useState<"idle" | "loading" | "success">("idle");
  const [iqForm, setIqForm] = useState({ name: "", company: "", email: "", product: "", message: "" });
  const [iqState, setIqState] = useState<"idle" | "loading" | "success">("idle");

  async function handleCallback(e: React.FormEvent) {
    e.preventDefault();
    setCbState("loading");
    try {
      await submitInquiry({ type: "Callback", name: cbForm.name, email: "", phone: cbForm.phone, company: cbForm.company, message: `Preferred callback time: ${cbForm.time}`, preferred_time: cbForm.time });
      setCbState("success");
    } catch { setCbState("idle"); }
  }

  async function handleInquiry(e: React.FormEvent) {
    e.preventDefault();
    setIqState("loading");
    try {
      await submitInquiry({ type: "Product Inquiry", name: iqForm.name, email: iqForm.email, company: iqForm.company, product_name: iqForm.product, message: iqForm.message || `Inquiry about: ${iqForm.product}` });
      setIqState("success");
    } catch { setIqState("idle"); }
  }

  function closeCallback() { setCallbackOpen(false); setCbState("idle"); setCbForm({ name: "", phone: "", company: "", time: "Morning (8AM–12PM)" }); }
  function closeInquiry() { setInquiryOpen(false); setIqState("idle"); setIqForm({ name: "", company: "", email: "", product: "", message: "" }); }

  const actions = [
    { icon: MessageSquare, label: t.requestQuote, color: "bg-[#69b400]", action: () => setPage("contact") },
    { icon: PhoneCall, label: t.contactSales, color: "bg-[#60A5FA]", action: () => setPage("contact") },
    { icon: FileText, label: t.productInquiry, color: "bg-[#4A5568]", action: () => setInquiryOpen(true) },
    { icon: PhoneIncoming, label: t.requestCallback, color: "bg-[#7cb342]", action: () => setCallbackOpen(true) },
  ];

  return (
    <>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2">
        {open && (
          <div className="mr-1 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 w-56 mb-1">
            <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#5A6478] mb-3 px-1">{t.quickAccess}</div>
            <div className="space-y-1.5">
              {actions.map(a => (
                <button key={a.label} onClick={() => { a.action(); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 text-sm font-medium text-[#1e293b] hover:text-[#69b400] bg-gray-50 hover:bg-[#f0f9e8] rounded-lg px-3 py-2.5 transition-all text-left">
                  <div className={`${a.color} w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <a.icon size={13} className="text-white" />
                  </div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => setOpen(o => !o)}
          className="bg-[#69b400] hover:bg-[#558b2f] text-white rounded-l-xl px-3 py-5 shadow-xl transition-all flex flex-col items-center gap-2">
          {open ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          <span className="text-[9px] font-bold tracking-widest uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            {t.quickAccess}
          </span>
        </button>
      </div>

      {/* Callback modal */}
      {callbackOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeCallback}>
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-[#1e293b]">{t.requestCallback}</h3>
              <button type="button" onClick={closeCallback} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            {cbState === "success" ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="text-[#69b400] mx-auto mb-3" />
                <p className="font-bold text-[#1e293b]">Callback Requested!</p>
                <p className="text-[#5A6478] text-sm mt-1">Our team will call you at your preferred time.</p>
                <button onClick={closeCallback} className="mt-4 text-sm text-[#69b400] font-semibold">Close</button>
              </div>
            ) : (
              <form onSubmit={handleCallback} className="space-y-3">
                <FormInput label="Full Name" required placeholder="Your name" value={cbForm.name} onChange={e => setCbForm(p => ({ ...p, name: e.target.value }))} />
                <FormInput label="Phone Number" required type="tel" placeholder="+63 9XX XXX XXXX" value={cbForm.phone} onChange={e => setCbForm(p => ({ ...p, phone: e.target.value }))} />
                <FormInput label="Company" placeholder="Your organization" value={cbForm.company} onChange={e => setCbForm(p => ({ ...p, company: e.target.value }))} />
                <div>
                  <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Preferred Time</label>
                  <select value={cbForm.time} onChange={e => setCbForm(p => ({ ...p, time: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] bg-white">
                    <option>Morning (8AM–12PM)</option>
                    <option>Afternoon (1PM–5PM)</option>
                  </select>
                </div>
                <SubmitBtn loading={cbState === "loading"}><PhoneIncoming size={15} /> {t.requestCallback}</SubmitBtn>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Product inquiry modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeInquiry}>
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-[#1e293b]">{t.productInquiry}</h3>
              <button type="button" onClick={closeInquiry} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            {iqState === "success" ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="text-[#69b400] mx-auto mb-3" />
                <p className="font-bold text-[#1e293b]">Inquiry Submitted!</p>
                <p className="text-[#5A6478] text-sm mt-1">We'll respond within 24 hours.</p>
                <button onClick={closeInquiry} className="mt-4 text-sm text-[#69b400] font-semibold">Close</button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-3">
                <FormInput label="Name" required placeholder="Your full name" value={iqForm.name} onChange={e => setIqForm(p => ({ ...p, name: e.target.value }))} />
                <FormInput label="Company" placeholder="Your organization" value={iqForm.company} onChange={e => setIqForm(p => ({ ...p, company: e.target.value }))} />
                <FormInput label="Email" required type="email" placeholder="your@email.com" value={iqForm.email} onChange={e => setIqForm(p => ({ ...p, email: e.target.value }))} />
                <FormInput label="Product of Interest" placeholder="Product name or model" value={iqForm.product} onChange={e => setIqForm(p => ({ ...p, product: e.target.value }))} />
                <div>
                  <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Message</label>
                  <textarea rows={3} placeholder="Describe your requirements..." value={iqForm.message} onChange={e => setIqForm(p => ({ ...p, message: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 transition-all resize-none" />
                </div>
                <SubmitBtn loading={iqState === "loading"}><MessageSquare size={15} /> Submit Inquiry</SubmitBtn>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function NavBar({ page, setPage, lang, setLang, t }: { page: Page; setPage: (p: Page) => void; lang: Lang; setLang: (l: Lang) => void; t: typeof T["EN"] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (p: Page) => { setPage(p); setProductMenuOpen(false); setServiceMenuOpen(false); setSupportMenuOpen(false); setMobileOpen(false); };

  return (
    <>
      {/* Top contact bar — desktop only */}
      <div className="hidden md:flex bg-[#1e293b] text-white text-xs py-2 px-6 items-center justify-between">
        <div className="flex items-center gap-5">
          <a href="tel:+639277943497" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"><Phone size={11} /> +63 927 794 3497</a>
          <a href="mailto:info@yanachemodities.com" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"><Mail size={11} /> info@yanachemodities.com</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">{t.tagline}</span>
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
            {(["EN", "FIL"] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider transition-all ${lang === l ? "bg-white text-[#1e293b]" : "text-gray-400 hover:text-white"}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 flex-shrink-0 mr-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#69b400] to-[#558b2f] rounded-xl flex items-center justify-center shadow-md shadow-[#69b400]/30">
              <FlaskConical size={19} className="text-white" />
            </div>
            <div className="leading-none hidden sm:block">
              <div className="font-bold text-[14px] text-[#1e293b] font-['Barlow_Condensed'] tracking-wide">YANA CHEMODITIES</div>
              <div className="text-[9px] text-[#5A6478] tracking-[0.2em] uppercase">Inc.</div>
            </div>
          </button>

          {/* Search — desktop */}
          <div className="flex-1 max-w-sm hidden lg:block">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input onKeyDown={e => { if (e.key === "Enter") go("products"); }}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#69b400] focus:bg-white focus:ring-2 focus:ring-[#69b400]/10 transition-all placeholder:text-gray-400" />
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {[{ label: t.home, page: "home" as Page }, { label: t.about, page: "about" as Page }].map(({ label, page: p }) => (
              <button key={p} onClick={() => go(p)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === p ? "text-[#69b400] bg-[#f0f9e8]" : "text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50"}`}>{label}</button>
            ))}

            {/* Products */}
            <div className="relative" onMouseEnter={() => setProductMenuOpen(true)} onMouseLeave={() => setProductMenuOpen(false)}>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${page === "products" ? "text-[#69b400] bg-[#f0f9e8]" : "text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50"}`}>
                {t.products} <ChevronDown size={13} className={`transition-transform ${productMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {productMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[620px]">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-6 grid grid-cols-3 gap-5">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#5A6478] mb-3">Categories</p>
                      {CATEGORIES.map(c => <button key={c} onClick={() => go("products")} className="block text-sm text-[#4A5568] hover:text-[#69b400] mb-2 text-left transition-colors">{c}</button>)}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#5A6478] mb-3">Top Brands</p>
                      {BRANDS.slice(0, 6).map(b => <button key={b} onClick={() => go("products")} className="block text-sm text-[#4A5568] hover:text-[#69b400] mb-2 transition-colors">{b}</button>)}
                      <button onClick={() => go("products")} className="text-xs text-[#69b400] font-semibold flex items-center gap-1 mt-1 hover:underline">All brands <ChevronRight size={11} /></button>
                    </div>
                    <div className="bg-gradient-to-br from-[#f0f9e8] to-[#e8f5e9] rounded-xl p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#69b400] mb-3">Quick Access</p>
                      {[{ icon: Star, label: t.featuredProducts, page: "products" as Page }, { icon: Zap, label: "New Arrivals", page: "products" as Page }, { icon: Download, label: "Download Catalog", page: "resources" as Page }].map(item => (
                        <button key={item.label} onClick={() => go(item.page)} className="flex items-center gap-2 text-sm text-[#2D5A35] hover:text-[#69b400] mb-3 last:mb-0 w-full font-medium">
                          <item.icon size={14} /> {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="relative" onMouseEnter={() => setServiceMenuOpen(true)} onMouseLeave={() => setServiceMenuOpen(false)}>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${page === "services" ? "text-[#69b400] bg-[#f0f9e8]" : "text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50"}`}>
                {t.services} <ChevronDown size={13} className={`transition-transform ${serviceMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {serviceMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-4">
                    {SERVICES.map(s => (
                      <button key={s.title} onClick={() => go("services")} className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50 rounded-lg px-3 py-2.5 mb-1 last:mb-0 text-left w-full transition-colors">
                        <s.icon size={14} className="text-[#69b400]" /> {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Support */}
            <div className="relative" onMouseEnter={() => setSupportMenuOpen(true)} onMouseLeave={() => setSupportMenuOpen(false)}>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${page === "support" || page === "resources" ? "text-[#69b400] bg-[#f0f9e8]" : "text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50"}`}>
                {t.support} <ChevronDown size={13} className={`transition-transform ${supportMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {supportMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-4">
                    {[{ icon: HelpCircle, label: t.faqs }, { icon: Headset, label: t.helpDesk }, { icon: Users, label: t.contactDirectory }].map(item => (
                      <button key={item.label} onClick={() => go("support")} className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-[#69b400] hover:bg-gray-50 rounded-lg px-3 py-2.5 mb-1 last:mb-0 w-full transition-colors">
                        <item.icon size={14} className="text-[#69b400]" /> {item.label}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button onClick={() => go("resources")} className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-[#60A5FA] hover:bg-blue-50 rounded-lg px-3 py-2.5 w-full transition-colors">
                        <BookOpen size={14} className="text-[#60A5FA]" /> {t.resourceLibrary}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => go("contact")} className="ml-1 bg-[#69b400] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#558b2f] transition-all shadow-md shadow-[#69b400]/25">
              {t.contact}
            </button>

            <div className="flex items-center gap-0.5 border border-gray-200 rounded-lg p-0.5 ml-1">
              {(["EN", "FIL"] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${lang === l ? "bg-[#69b400] text-white" : "text-gray-400 hover:text-[#69b400]"}`}>{l}</button>
              ))}
            </div>
          </div>

          {/* Mobile right controls */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <button onClick={() => go("products")} className="p-2 rounded-lg text-[#5A6478] hover:text-[#69b400] hover:bg-gray-50"><Search size={20} /></button>
            <button onClick={() => setLang(lang === "EN" ? "FIL" : "EN")} className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-[#5A6478]">
              <Languages size={12} /> {lang}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-[#1e293b] hover:bg-gray-50">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder={t.searchPlaceholder} className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#69b400]" />
            </div>
            {([["home", t.home], ["products", t.products], ["services", t.services], ["support", t.support], ["resources", t.resourceLibrary], ["about", t.about], ["careers", t.careers], ["contact", t.contact]] as [Page, string][]).map(([p, label]) => (
              <button key={p} onClick={() => go(p)} className={`flex items-center justify-between w-full text-sm font-medium py-3 px-3 rounded-xl transition-colors ${page === p ? "text-[#69b400] bg-[#f0f9e8]" : "text-[#1e293b] hover:bg-gray-50"}`}>
                {label} {page === p && <ChevronRight size={14} className="text-[#69b400]" />}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, setPage, setSelectedProduct, t }: { product: Product; setPage: (p: Page) => void; setSelectedProduct: (p: Product) => void; t: typeof T["EN"] }) {
  return (
    <div onClick={() => { setSelectedProduct(product); setPage("product-detail"); }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#69b400]/25 hover:shadow-xl hover:shadow-[#69b400]/8 transition-all duration-300 cursor-pointer group flex flex-col">
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {product.tag && <div className="absolute top-3 left-3"><TagBadge tag={product.tag} /></div>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#69b400] mb-1">{product.brand}</p>
        <h3 className="font-semibold text-[#1e293b] text-sm leading-snug mb-3 flex-1 line-clamp-2">{product.name}</h3>
        <div className="flex gap-2">
          <button onClick={e => { e.stopPropagation(); setPage("contact"); }}
            className="flex-1 text-xs font-semibold bg-[#69b400] text-white py-2.5 rounded-xl hover:bg-[#558b2f] active:scale-[0.98] transition-all text-center shadow-sm">
            {t.requestQuote}
          </button>
          <button onClick={e => { e.stopPropagation(); }}
            className="text-xs font-medium border border-[#69b400]/30 text-[#69b400] py-2.5 px-3 rounded-xl hover:bg-[#f0f9e8] active:scale-[0.98] transition-all">
            <Download size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedProduct, t, lang }: { setPage: (p: Page) => void; setSelectedProduct: (p: Product) => void; t: typeof T["EN"]; lang: Lang }) {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [testimIdx, setTestimIdx] = useState(0);
  const featured = PRODUCTS.filter(p => p.tag === "Featured" || p.tag === "Best Seller");

  useEffect(() => {
    const timer = setInterval(() => setCarouselIdx(i => (i + 1) % featured.length), 4500);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] min-h-[600px] sm:min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1800&h=900&fit=crop&auto=format" alt="Laboratory" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/85 to-[#0f172a]/40" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#69b400]/20 border border-[#69b400]/40 text-[#9ccc65] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 bg-[#9ccc65] rounded-full animate-pulse flex-shrink-0" />
                {t.tagline}
              </div>
              <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5 sm:mb-6">
                {t.heroTitle1}<br />
                <span className="text-[#9ccc65]">{t.heroTitle2}</span><br />
                {t.heroTitle3}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-lg">{t.heroSub}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setPage("products")} className="bg-[#69b400] hover:bg-[#7cb342] text-white font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#69b400]/30">
                  {t.browseProducts} <ArrowRight size={16} />
                </button>
                <button onClick={() => setPage("contact")} className="border border-white/25 text-white hover:bg-white/10 font-medium px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  <PhoneCall size={16} /> {t.requestConsultation}
                </button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-8 sm:mt-10">
                {[{ icon: Shield, text: "ISO Certified" }, { icon: Award, text: "Genuine Products" }, { icon: Users, text: "1,000+ Clients" }].map(b => (
                  <div key={b.text} className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <b.icon size={13} className="text-[#9ccc65]" /> {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Search card */}
            <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-4">{t.findProduct}</h3>
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input placeholder={t.searchByName} className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#69b400] placeholder:text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {[{ label: t.allBrands, opts: BRANDS }, { label: t.allCategories, opts: CATEGORIES }].map(sel => (
                  <select key={sel.label} className="px-3 py-2.5 bg-white/15 text-white rounded-xl text-sm focus:outline-none border border-white/20 focus:border-white/40">
                    <option className="text-black" value="">{sel.label}</option>
                    {sel.opts.map(o => <option key={o} className="text-black">{o}</option>)}
                  </select>
                ))}
              </div>
              <button onClick={() => setPage("products")} className="w-full bg-[#69b400] hover:bg-[#7cb342] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#69b400]/30">
                <Search size={15} /> {t.searchProducts}
              </button>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Refractometer", "Sieves", "Centrifuge", "Dispenser"].map(tag => (
                  <button key={tag} onClick={() => setPage("products")} className="text-xs text-white/60 hover:text-white border border-white/15 hover:border-white/35 px-3 py-1.5 rounded-full transition-all">{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gradient-to-r from-[#69b400] to-[#1a5c33] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                <s.icon size={20} className="text-[#9ccc65]" />
              </div>
              <div className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
              <div className="text-green-200 text-xs sm:text-sm mt-1">{lang === "FIL" ? s.labelFIL : s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Carousel ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <SectionLabel>Curated Selection</SectionLabel>
            <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b]">{t.featuredProducts}</h2>
          </div>
          <button onClick={() => setPage("products")} className="hidden sm:flex text-sm text-[#69b400] font-semibold items-center gap-1 hover:gap-2 transition-all">
            {t.viewAllProducts} <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-black/5 mb-5">
          <div className="grid lg:grid-cols-2 min-h-[320px] sm:min-h-[380px]">
            <div className="relative overflow-hidden h-56 sm:h-72 lg:h-auto">
              <img src={featured[carouselIdx]?.image} alt={featured[carouselIdx]?.name} className="w-full h-full object-cover transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
              {featured[carouselIdx]?.tag && (
                <div className="absolute top-4 left-4"><TagBadge tag={featured[carouselIdx].tag} /></div>
              )}
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#69b400] mb-1.5">{featured[carouselIdx]?.brand}</p>
              <h3 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-bold text-[#1e293b] mb-3 leading-tight">{featured[carouselIdx]?.name}</h3>
              <p className="text-[#5A6478] text-sm leading-relaxed mb-5 line-clamp-3">{featured[carouselIdx]?.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {Object.entries(featured[carouselIdx]?.specs || {}).slice(0, 4).map(([k, v]) => (
                  <div key={k} className="bg-[#F4F6F8] rounded-xl p-2.5">
                    <div className="text-[9px] text-[#5A6478] uppercase tracking-wider font-semibold">{k}</div>
                    <div className="text-xs font-bold text-[#1e293b] font-['JetBrains_Mono'] mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5">
                <button onClick={() => setPage("contact")} className="flex-1 bg-[#69b400] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#558b2f] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#69b400]/20">
                  <MessageSquare size={14} /> {t.requestQuote}
                </button>
                <button onClick={() => { setSelectedProduct(featured[carouselIdx]); setPage("product-detail"); }} className="flex-1 border-2 border-gray-200 text-[#1e293b] text-sm font-semibold py-3 rounded-xl hover:border-[#69b400] hover:text-[#69b400] transition-all flex items-center justify-center gap-2">
                  <FileText size={14} /> {t.viewDetails}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5">
          <button onClick={() => setCarouselIdx(i => (i - 1 + featured.length) % featured.length)} className="p-2 rounded-full border border-gray-200 hover:border-[#69b400] hover:text-[#69b400] transition-all"><ChevronLeft size={14} /></button>
          {featured.map((_, i) => (
            <button key={i} onClick={() => setCarouselIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === carouselIdx ? "bg-[#69b400] w-7" : "bg-gray-300 w-2 hover:bg-gray-400"}`} />
          ))}
          <button onClick={() => setCarouselIdx(i => (i + 1) % featured.length)} className="p-2 rounded-full border border-gray-200 hover:border-[#69b400] hover:text-[#69b400] transition-all"><ChevronRight size={14} /></button>
        </div>

        <div className="sm:hidden text-center mt-5">
          <button onClick={() => setPage("products")} className="text-sm text-[#69b400] font-semibold flex items-center gap-1 mx-auto">{t.viewAllProducts} <ArrowRight size={14} /></button>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="pb-10 sm:pb-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCTS.slice(0, 8).map(p => <ProductCard key={p.id} product={p} setPage={setPage} setSelectedProduct={setSelectedProduct} t={t} />)}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => setPage("products")} className="inline-flex items-center gap-2 border-2 border-[#69b400] text-[#69b400] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#69b400] hover:text-white transition-all shadow-sm">
            {t.browseCatalog} <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Brand Partners ── */}
      <section className="bg-white py-10 sm:py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionLabel>{t.brandPartners}</SectionLabel>
          <div className="flex flex-wrap gap-4 sm:gap-8 mt-2">
            {BRANDS.map(b => (
              <div key={b} className="font-['Barlow_Condensed'] font-bold text-base sm:text-lg text-gray-300 hover:text-[#69b400] transition-colors cursor-pointer">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Teaser ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <SectionLabel>After-Sales Support</SectionLabel>
          <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b]">{t.technicalServices}</h2>
          <p className="text-[#5A6478] mt-3 max-w-lg mx-auto text-sm">{t.servicesSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(s => (
            <div key={s.title} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:shadow-[#69b400]/8 hover:border-[#69b400]/20 transition-all duration-300 group">
              <div className="w-11 h-11 bg-[#f0f9e8] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#69b400] transition-colors duration-300">
                <s.icon size={20} className="text-[#69b400] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-[#1e293b] mb-2">{s.title}</h3>
              <p className="text-[#5A6478] text-sm leading-relaxed line-clamp-3">{s.description}</p>
              <button onClick={() => setPage("services")} className="mt-4 text-xs text-[#69b400] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                {t.learnMore} <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#0f172a] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <SectionLabel light>Client Testimonials</SectionLabel>
            <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-white">{t.trustedBy}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t2, i) => (
              <div key={i} onClick={() => setTestimIdx(i)}
                className={`bg-white/5 border rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 ${testimIdx === i ? "border-[#69b400] bg-white/10 shadow-lg shadow-[#69b400]/20" : "border-white/10 hover:border-white/20"}`}>
                <Quote size={24} className={`mb-3 ${testimIdx === i ? "text-[#9ccc65]" : "text-white/20"}`} />
                <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t2.quote}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#69b400]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#9ccc65] font-bold text-xs">{t2.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs">{t2.author}</p>
                    <p className="text-gray-400 text-[11px]">{t2.role} · {t2.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative bg-gradient-to-br from-[#69b400] to-[#0f4523] py-14 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-bold text-white mb-3">{t.readyToEquip}</h2>
          <p className="text-green-200 text-sm sm:text-base mb-8">{t.readySubtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button onClick={() => setPage("contact")} className="bg-white text-[#69b400] font-semibold px-7 py-3.5 rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2 shadow-xl">
              <PhoneCall size={16} /> {t.requestConsultation}
            </button>
            <button onClick={() => setPage("products")} className="border-2 border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Microscope size={16} /> {t.browseCatalog}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ setPage, setSelectedProduct, t }: { setPage: (p: Page) => void; setSelectedProduct: (p: Product) => void; t: typeof T["EN"] }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [tag, setTag] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
      (!brand || p.brand === brand) && (!category || p.category === category) &&
      (!type || p.type === type) && (!tag || p.tag === tag);
  });

  const activeFiltersCount = [brand, category, type, tag].filter(Boolean).length;
  const clearFilters = () => { setBrand(""); setCategory(""); setType(""); setTag(""); };

  const FiltersContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#1e293b] flex items-center gap-2"><Filter size={14} /> {t.filters}</span>
        {activeFiltersCount > 0 && <button onClick={clearFilters} className="text-xs font-semibold text-[#69b400] hover:underline">{t.clearFilters}</button>}
      </div>

      {[{ label: t.brand, value: brand, setter: setBrand, opts: BRANDS },
        { label: t.category, value: category, setter: setCategory, opts: CATEGORIES },
        { label: t.equipType, value: type, setter: setType, opts: EQUIPMENT_TYPES }].map(f => (
        <div key={f.label}>
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#5A6478] mb-2">{f.label}</p>
          <select value={f.value} onChange={e => f.setter(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#69b400] bg-white">
            <option value="">All</option>
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}

      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#5A6478] mb-2">{t.availability}</p>
        <div className="space-y-2">
          {["Featured", "Best Seller", "New"].map(tg => (
            <label key={tg} className={`flex items-center gap-2.5 text-sm cursor-pointer px-3 py-2.5 rounded-xl transition-all ${tag === tg ? "bg-[#f0f9e8] text-[#69b400] font-medium" : "hover:bg-gray-50"}`}>
              <input type="radio" name="tag" value={tg} checked={tag === tg} onChange={e => setTag(e.target.value)} className="accent-[#69b400]" /> {tg}
            </label>
          ))}
          <label className={`flex items-center gap-2.5 text-sm cursor-pointer px-3 py-2.5 rounded-xl transition-all ${tag === "" ? "bg-[#f0f9e8] text-[#69b400] font-medium" : "hover:bg-gray-50"}`}>
            <input type="radio" name="tag" value="" checked={tag === ""} onChange={() => setTag("")} className="accent-[#69b400]" /> All
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#69b400] to-[#558b2f] rounded-2xl p-4 text-white">
        <h4 className="font-semibold text-sm mb-1.5">{t.needHelp}</h4>
        <p className="text-green-200 text-xs mb-3 leading-relaxed">{t.needHelpSub}</p>
        <button onClick={() => setPage("contact")} className="bg-white text-[#69b400] font-bold text-xs w-full py-2.5 rounded-xl hover:bg-green-50 transition-all">{t.contactSales}</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <SectionLabel>Product Catalog</SectionLabel>
        <h1 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b]">{t.allProducts}</h1>
      </div>

      {/* Search + toolbar */}
      <div className="flex gap-2 sm:gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 shadow-sm" />
        </div>
        {/* Mobile filter btn */}
        <button onClick={() => setFilterDrawerOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#1e293b] shadow-sm relative">
          <Filter size={15} />
          {activeFiltersCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#69b400] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
        </button>
        <div className="hidden sm:flex gap-1">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-3 rounded-xl border transition-all ${sidebarOpen ? "border-[#69b400] bg-[#f0f9e8] text-[#69b400]" : "border-gray-200 text-gray-500 hover:border-[#69b400]"}`}><SlidersHorizontal size={15} /></button>
          <button onClick={() => setViewMode("grid")} className={`p-3 rounded-xl border transition-all ${viewMode === "grid" ? "bg-[#69b400] text-white border-[#69b400]" : "border-gray-200 text-gray-500 hover:border-[#69b400]"}`}><Grid3X3 size={15} /></button>
          <button onClick={() => setViewMode("list")} className={`p-3 rounded-xl border transition-all ${viewMode === "list" ? "bg-[#69b400] text-white border-[#69b400]" : "border-gray-200 text-gray-500 hover:border-[#69b400]"}`}><List size={15} /></button>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[brand, category, type, tag].filter(Boolean).map(f => (
            <span key={f} className="bg-[#f0f9e8] text-[#69b400] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              {f}
              <button onClick={() => { if (f === brand) setBrand(""); if (f === category) setCategory(""); if (f === type) setType(""); if (f === tag) setTag(""); }} className="hover:bg-[#69b400]/10 rounded-full p-0.5"><X size={11} /></button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-5 sm:gap-6">
        {/* Sidebar — desktop */}
        {sidebarOpen && (
          <aside className="hidden md:block w-52 lg:w-56 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-4 self-start sticky top-[5rem]">
            <FiltersContent />
          </aside>
        )}

        {/* Product results */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#5A6478] mb-4 font-medium">{filtered.length} {t.productsFound}</p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <Search size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-[#1e293b]">{t.noProducts}</p>
              <p className="text-sm text-[#5A6478] mt-1">{t.noProductsSub}</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} setPage={setPage} setSelectedProduct={setSelectedProduct} t={t} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(p => (
                <div key={p.id} onClick={() => { setSelectedProduct(p); setPage("product-detail"); }}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-lg hover:border-[#69b400]/20 transition-all cursor-pointer">
                  <img src={p.image} alt={p.name} className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-xl bg-gray-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#69b400]">{p.brand}</p>
                    <h3 className="font-semibold text-[#1e293b] mt-0.5 mb-1 text-sm leading-snug">{p.name}</h3>
                    <p className="text-[#5A6478] text-xs leading-relaxed line-clamp-2 hidden sm:block">{p.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-2">
                    {p.tag && <TagBadge tag={p.tag} />}
                    <button onClick={e => { e.stopPropagation(); setPage("contact"); }} className="text-xs bg-[#69b400] text-white px-3 py-2 rounded-lg hover:bg-[#558b2f] transition-all whitespace-nowrap font-semibold">{t.requestQuote}</button>
                    <button onClick={e => e.stopPropagation()} className="text-xs border border-gray-200 text-[#5A6478] px-3 py-2 rounded-lg hover:border-[#69b400] transition-all flex items-center gap-1 justify-center"><Download size={11} /> Sheet</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden" onClick={() => setFilterDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white w-full rounded-t-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-[#1e293b]">{t.filters}</h3>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <FiltersContent />
            <button onClick={() => setFilterDrawerOpen(false)} className="w-full mt-5 bg-[#69b400] text-white font-bold py-3.5 rounded-xl hover:bg-[#558b2f] transition-all shadow-lg shadow-[#69b400]/20">
              Show {filtered.length} {t.productsFound}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetailPage({ product, setPage, t }: { product: Product; setPage: (p: Page) => void; t: typeof T["EN"] }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => setPage("products")} className="flex items-center gap-2 text-sm text-[#5A6478] hover:text-[#69b400] mb-5 sm:mb-6 transition-colors font-medium">
        <ChevronLeft size={16} /> {t.backToProducts}
      </button>
      <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
        <div>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 mb-3 shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-64 sm:h-80 object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => (
              <button key={i} onClick={() => setActiveImg(i)} className={`overflow-hidden rounded-xl border-2 transition-all ${activeImg === i ? "border-[#69b400]" : "border-transparent hover:border-gray-300"}`}>
                <img src={product.image} alt="" className="w-full h-16 sm:h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          {product.tag && <div className="mb-3"><TagBadge tag={product.tag} /></div>}
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#69b400] mb-2">{product.brand}</p>
          <h1 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b] mb-4 leading-tight">{product.name}</h1>
          <p className="text-[#5A6478] leading-relaxed mb-6 text-sm sm:text-base">{product.description}</p>

          <div className="bg-[#F4F6F8] rounded-2xl p-4 sm:p-5 mb-6">
            <h3 className="font-bold text-[#1e293b] text-sm mb-3 flex items-center gap-2"><Gauge size={14} /> {t.technicalSpecs}</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="text-[9px] text-[#5A6478] uppercase tracking-wider font-semibold mb-1">{k}</div>
                  <div className="text-sm font-bold text-[#1e293b] font-['JetBrains_Mono']">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <button onClick={() => setPage("contact")} className="bg-[#69b400] text-white font-bold py-3.5 rounded-xl hover:bg-[#558b2f] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#69b400]/20">
              <MessageSquare size={15} /> {t.requestQuote}
            </button>
            <button onClick={() => setPage("contact")} className="border-2 border-[#69b400] text-[#69b400] font-bold py-3.5 rounded-xl hover:bg-[#f0f9e8] transition-all flex items-center justify-center gap-2">
              <PhoneCall size={15} /> {t.contactSales}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {[{ icon: Download, label: t.downloadDatasheet }, { icon: FileText, label: t.productBrochure }].map(btn => (
              <button key={btn.label} className="border border-gray-200 text-[#5A6478] font-medium py-3 rounded-xl hover:border-[#69b400] hover:text-[#69b400] transition-all flex items-center justify-center gap-2 text-sm">
                <btn.icon size={14} /> <span className="truncate">{btn.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#5A6478] pt-4 border-t border-gray-100">
            {[{ icon: Shield, text: "Genuine Products" }, { icon: Award, text: "ISO Certified" }, { icon: Wrench, text: "After-sales Support" }].map(b => (
              <span key={b.text} className="flex items-center gap-1.5"><b.icon size={12} className="text-[#69b400]" /> {b.text}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage, t }: { setPage: (p: Page) => void; t: typeof T["EN"] }) {
  const [active, setActive] = useState(0);
  const [svcForm, setSvcForm] = useState({ name: "", company: "", email: "", service_type: "", concern: "" });
  const [svcState, setSvcState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [svcError, setSvcError] = useState("");

  async function handleServiceSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSvcState("loading");
    try {
      await submitServiceRequest({ ...svcForm });
      setSvcState("success");
    } catch (err) {
      setSvcError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setSvcState("error");
    }
  }

  return (
    <div>
      <div className="relative bg-[#0f172a] py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionLabel light>After-Sales Support</SectionLabel>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold text-white mb-4">{t.scopeOfServices}</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">Factory-trained technicians delivering precision calibration, testing, repair, and maintenance services across the Philippines.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Tab selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 sm:mb-10">
          {SERVICES.map((s, i) => (
            <button key={s.title} onClick={() => setActive(i)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${active === i ? "border-[#69b400] bg-[#f0f9e8] shadow-md shadow-[#69b400]/10" : "border-gray-100 bg-white hover:border-[#69b400]/30"}`}>
              <s.icon size={20} className={`${active === i ? "text-[#69b400]" : "text-gray-400"} mb-2`} />
              <p className={`font-semibold text-sm leading-tight ${active === i ? "text-[#69b400]" : "text-[#1e293b]"}`}>{s.title}</p>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-black/5">
          <img src={SERVICES[active].image} alt={SERVICES[active].title} className="w-full h-56 sm:h-72 md:h-full object-cover" />
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="w-12 h-12 bg-[#f0f9e8] rounded-xl flex items-center justify-center mb-5">
              {(() => { const Icon = SERVICES[active].icon; return <Icon size={22} className="text-[#69b400]" />; })()}
            </div>
            <h2 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-bold text-[#1e293b] mb-3">{SERVICES[active].title}</h2>
            <p className="text-[#5A6478] leading-relaxed mb-5 sm:mb-6 text-sm">{SERVICES[active].description}</p>
            <div className="space-y-2.5 mb-6">
              {["ISO 17025 accredited procedures", "Traceable to national standards", "Certified technicians", "Documentation and certification provided"].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-[#1e293b]">
                  <CheckCircle size={14} className="text-[#69b400] flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
            <button onClick={() => setPage("contact")} className="w-full bg-[#69b400] text-white font-bold py-3.5 rounded-xl hover:bg-[#558b2f] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#69b400]/20">
              <MessageSquare size={15} /> {t.requestService}
            </button>
          </div>
        </div>
      </div>

      {/* Service request form */}
      <div className="bg-gradient-to-b from-[#F4F6F8] to-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xl shadow-black/5">
          <SectionLabel>{t.requestAService}</SectionLabel>
          <h3 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-bold text-[#1e293b] mb-1">{t.requestAService}</h3>
          <p className="text-[#5A6478] text-sm mb-6">{t.formSubtitle}</p>
          {svcState === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#f0f9e8] rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-[#69b400]" /></div>
              <p className="font-bold text-[#1e293b] text-lg">Request Submitted!</p>
              <p className="text-[#5A6478] text-sm mt-1">Our team will contact you within 24 hours.</p>
              <button onClick={() => setSvcState("idle")} className="mt-4 text-sm text-[#69b400] font-semibold hover:underline">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <FormInput label="Name" required placeholder="Your full name" value={svcForm.name} onChange={e => setSvcForm(p => ({ ...p, name: e.target.value }))} />
              <FormInput label="Company Name" placeholder="Your company" value={svcForm.company} onChange={e => setSvcForm(p => ({ ...p, company: e.target.value }))} />
              <FormInput label="Email Address" required type="email" placeholder="your@email.com" value={svcForm.email} onChange={e => setSvcForm(p => ({ ...p, email: e.target.value }))} />
              <div>
                <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Service Type<span className="text-[#69b400] ml-0.5">*</span></label>
                <select required value={svcForm.service_type} onChange={e => setSvcForm(p => ({ ...p, service_type: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 bg-white">
                  <option value="">Select Service Type</option>
                  {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">{t.concern}<span className="text-[#69b400] ml-0.5">*</span></label>
                <textarea required rows={4} placeholder="Describe your concern or requirements..."
                  value={svcForm.concern} onChange={e => setSvcForm(p => ({ ...p, concern: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 resize-none" />
              </div>
              {svcState === "error" && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{svcError}</p>}
              <SubmitBtn loading={svcState === "loading"}><MessageSquare size={15} /> {t.submitRequest}</SubmitBtn>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SUPPORT PAGE ─────────────────────────────────────────────────────────────
function SupportPage({ setPage, t }: { setPage: (p: Page) => void; t: typeof T["EN"] }) {
  const [activeTab, setActiveTab] = useState<"faqs" | "helpdesk" | "directory">("faqs");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketNo, setTicketNo] = useState("");
  const [ticketForm, setTicketForm] = useState({ name: "", email: "", category: "Product Inquiry", priority: "Medium", description: "" });
  const [ticketState, setTicketState] = useState<"idle" | "loading" | "error">("idle");
  const [ticketError, setTicketError] = useState("");

  async function handleTicketSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTicketState("loading");
    try {
      const res = await submitSupportTicket(ticketForm);
      setTicketNo(res.ticket_no ?? "");
      setTicketSent(true);
      setTicketState("idle");
    } catch (err) {
      setTicketError(err instanceof Error ? err.message : "Submission failed.");
      setTicketState("error");
    }
  }

  const tabs = [
    { id: "faqs" as const, label: t.faqs, icon: HelpCircle },
    { id: "helpdesk" as const, label: t.helpDesk, icon: Headset },
    { id: "directory" as const, label: t.contactDirectory, icon: Users },
  ];

  return (
    <div>
      <div className="relative bg-[#0f172a] py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionLabel light>Customer Support</SectionLabel>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold text-white mb-3">{t.support}</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm">Find answers, submit requests, and connect with our team.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1.5 mb-7 sm:mb-8 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-sm">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-[11px] sm:text-sm font-semibold transition-all leading-tight text-center ${activeTab === tab.id ? "bg-[#69b400] text-white shadow-md" : "text-[#5A6478] hover:text-[#69b400] hover:bg-gray-50"}`}>
              <tab.icon size={14} className="flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* FAQs */}
        {activeTab === "faqs" && (
          <div>
            <div className="relative mb-5">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search FAQs..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#69b400]" />
            </div>
            <div className="space-y-2.5">
              {FAQS.map((faq, i) => (
                <div key={i} className={`bg-white border rounded-2xl overflow-hidden transition-all ${openFaq === i ? "border-[#69b400]/30 shadow-md shadow-[#69b400]/5" : "border-gray-100 hover:border-gray-200"}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
                    <span className="font-semibold text-[#1e293b] text-sm">{faq.q}</span>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${openFaq === i ? "border-[#69b400] bg-[#69b400]" : "border-gray-200"}`}>
                      {openFaq === i ? <ChevronUp size={13} className="text-white" /> : <ChevronDown size={13} className="text-gray-400" />}
                    </div>
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-[#5A6478] leading-relaxed border-t border-gray-50 pt-4">{faq.a}</div>}
                </div>
              ))}
            </div>
            <div className="mt-7 bg-gradient-to-r from-[#f0f9e8] to-[#e8f5e9] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <HelpCircle size={28} className="text-[#69b400] flex-shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-[#1e293b] text-sm">Still have questions?</p>
                <p className="text-[#5A6478] text-xs mt-0.5">Our support team is happy to help with any concerns not covered above.</p>
              </div>
              <button onClick={() => setActiveTab("helpdesk")} className="bg-[#69b400] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#558b2f] transition-all shadow-md shadow-[#69b400]/20 whitespace-nowrap">
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Help Desk */}
        {activeTab === "helpdesk" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {[
                { icon: Clock, title: "Support Hours", desc: "Monday – Friday\n8:00 AM – 5:30 PM PHT" },
                { icon: Phone, title: "Phone Support", desc: "+63 927 794 3497\n+63 956 235 5483" },
                { icon: Mail, title: "Email Support", desc: "support@yanachemodities.com\nResponse within 24 hours" },
                { icon: AlertCircle, title: "Urgent Concerns", desc: "Skype: yana_chemodities_manila\nViber: +63 956 235 5484" },
              ].map(item => (
                <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-3 hover:border-[#69b400]/20 transition-all">
                  <div className="w-9 h-9 bg-[#f0f9e8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-[#69b400]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e293b] text-sm">{item.title}</p>
                    <p className="text-[#5A6478] text-xs mt-0.5 whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3 bg-white border border-gray-100 rounded-2xl p-5 sm:p-7 shadow-xl shadow-black/5">
              {ticketSent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#f0f9e8] rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-[#69b400]" /></div>
                  <p className="font-bold text-[#1e293b] text-lg">Ticket Submitted!</p>
                  {ticketNo && <span className="inline-block mt-2 mb-3 text-xs font-mono bg-[#f0f9e8] text-[#69b400] px-4 py-1.5 rounded-full font-bold">{ticketNo}</span>}
                  <p className="text-[#5A6478] text-sm">Our team will respond within 24 business hours.</p>
                  <button onClick={() => { setTicketSent(false); setTicketForm({ name: "", email: "", category: "Product Inquiry", priority: "Medium", description: "" }); }} className="mt-4 text-sm text-[#69b400] font-semibold hover:underline">Submit another</button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit}>
                  <SectionLabel>Submit a Ticket</SectionLabel>
                  <h3 className="font-['Barlow_Condensed'] text-xl sm:text-2xl font-bold text-[#1e293b] mb-4">Submit a Support Ticket</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <FormInput label="Name" required placeholder="Your full name" value={ticketForm.name} onChange={e => setTicketForm(p => ({ ...p, name: e.target.value }))} />
                      <FormInput label="Email" required type="email" placeholder="your@email.com" value={ticketForm.email} onChange={e => setTicketForm(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Issue Category<span className="text-[#69b400] ml-0.5">*</span></label>
                      <select value={ticketForm.category} onChange={e => setTicketForm(p => ({ ...p, category: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] bg-white">
                        {["Product Inquiry", "After-Sales Support", "Service Scheduling", "Billing Issue", "General Concern"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1e293b] block mb-2">Priority</label>
                      <div className="flex gap-2">
                        {["Low", "Medium", "High"].map(p => (
                          <label key={p} className={`flex-1 flex items-center justify-center gap-1.5 text-sm cursor-pointer border-2 rounded-xl py-2.5 transition-all font-medium ${ticketForm.priority === p ? "border-[#69b400] bg-[#f0f9e8] text-[#69b400]" : "border-gray-200 text-[#5A6478] hover:border-gray-300"}`}>
                            <input type="radio" name="priority" value={p} checked={ticketForm.priority === p} onChange={() => setTicketForm(prev => ({ ...prev, priority: p }))} className="sr-only" /> {p}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">Description<span className="text-[#69b400] ml-0.5">*</span></label>
                      <textarea required rows={4} placeholder="Describe your concern in detail..."
                        value={ticketForm.description} onChange={e => setTicketForm(p => ({ ...p, description: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 resize-none" />
                    </div>
                    {ticketState === "error" && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{ticketError}</p>}
                    <SubmitBtn loading={ticketState === "loading"}><MessageSquare size={15} /> Submit Ticket</SubmitBtn>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Contact Directory */}
        {activeTab === "directory" && (
          <div className="space-y-3">
            {CONTACT_DIRECTORY.map(d => (
              <div key={d.department} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-[#69b400]/20 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-[#1e293b]">{d.department}</p>
                    <p className="text-[#5A6478] text-xs mt-0.5">{d.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={`mailto:${d.contact}`} className="flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl hover:bg-[#60A5FA] hover:text-white transition-all">
                      <Mail size={11} /> <span className="max-w-[140px] truncate">{d.contact}</span>
                    </a>
                    <a href={`tel:${d.phone}`} className="flex items-center gap-1.5 text-xs font-semibold text-[#69b400] bg-[#f0f9e8] border border-[#69b400]/20 px-3 py-2 rounded-xl hover:bg-[#69b400] hover:text-white transition-all">
                      <Phone size={11} /> {d.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESOURCES PAGE ───────────────────────────────────────────────────────────
function ResourcesPage({ t }: { t: typeof T["EN"] }) {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const docTypes = ["Manual", "Certificate", "Datasheet", "Product Document"];
  const categories = ["All", ...docTypes];

  const filtered = RESOURCES.filter(r =>
    (!search || r.title.toLowerCase().includes(search.toLowerCase()) || r.brand.toLowerCase().includes(search.toLowerCase())) &&
    (!brandFilter || r.brand === brandFilter) &&
    (activeCategory === "All" || r.type === activeCategory)
  );

  const typeConfig: Record<string, { color: string; bg: string }> = {
    "Manual": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
    "Certificate": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
    "Datasheet": { color: "text-[#69b400]", bg: "bg-[#f0f9e8] border-green-200" },
    "Product Document": { color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  };
  const typeIcon = (type: string) => type === "Manual" ? Book : type === "Certificate" ? Award : type === "Datasheet" ? FileText : FolderOpen;

  return (
    <div>
      <div className="relative bg-[#0f172a] py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionLabel light>Downloads</SectionLabel>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold text-white mb-3">{t.resourceLibrary}</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm">Centralized access to product manuals, ISO certificates, datasheets, and technical documents.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${activeCategory === cat ? "bg-[#69b400] text-white shadow-md shadow-[#69b400]/20" : "bg-white border border-gray-200 text-[#5A6478] hover:border-[#69b400] hover:text-[#69b400]"}`}>
              {cat === "All" ? "All Documents" : cat === "Manual" ? t.manuals : cat === "Certificate" ? t.certificates : cat === "Datasheet" ? t.datasheets : t.productDocs}
            </button>
          ))}
        </div>

        {/* Search + brand filter */}
        <div className="flex gap-2.5 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents, brands..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#69b400]" />
          </div>
          <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="text-sm border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:border-[#69b400] bg-white min-w-[120px]">
            <option value="">All Brands</option>
            {[...new Set(RESOURCES.map(r => r.brand))].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        <p className="text-xs text-[#5A6478] font-medium mb-4">{filtered.length} document{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="space-y-2.5">
          {filtered.map(r => {
            const Icon = typeIcon(r.type);
            const cfg = typeConfig[r.type] ?? { color: "text-gray-600", bg: "bg-gray-50 border-gray-200" };
            return (
              <div key={r.id} className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-4 hover:border-[#69b400]/20 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-[#F4F6F8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#f0f9e8] transition-colors">
                  <Icon size={17} className="text-[#69b400]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1e293b] text-sm truncate">{r.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>{r.type}</span>
                    <span className="text-[11px] text-[#5A6478]">{r.brand}</span>
                    <span className="text-[11px] text-[#5A6478] hidden sm:block">{r.format} · {r.size}</span>
                    <span className="text-[11px] text-[#5A6478] hidden sm:block">Updated {r.date}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#69b400] border border-[#69b400]/25 px-3 py-2 rounded-xl hover:bg-[#69b400] hover:text-white hover:border-[#69b400] transition-all">
                  <Download size={12} /> <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <FolderOpen size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-[#1e293b]">No documents found</p>
              <p className="text-sm text-[#5A6478] mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-br from-[#0f172a] to-[#1a2536] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-['Barlow_Condensed'] text-xl sm:text-2xl font-bold text-white">Need a Specific Document?</p>
            <p className="text-gray-400 text-sm mt-1">If you cannot find what you need, contact our technical team and we will source it for you.</p>
          </div>
          <a href="mailto:info@yanachemodities.com" className="flex-shrink-0 flex items-center gap-2 bg-[#69b400] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#7cb342] transition-all text-sm shadow-lg shadow-[#69b400]/25">
            <Mail size={14} /> Request Document
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ t, lang }: { t: typeof T["EN"]; lang: Lang }) {
  return (
    <div>
      <div className="relative bg-[#0f172a] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&h=500&fit=crop&auto=format" alt="Laboratory" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionLabel light>Est. 1979</SectionLabel>
          <h1 className="font-['Barlow_Condensed'] text-5xl sm:text-6xl font-bold text-white mb-5">{t.aboutTitle}</h1>
          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">A leading provider of quality laboratory products and services in the Philippines, serving food, industrial, government, life science, educational, and pharmaceutical markets nationwide.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-center mb-12 sm:mb-16">
          <div>
            <SectionLabel>{t.ourStory}</SectionLabel>
            <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b] mb-5">{t.fourDecades}</h2>
            <div className="space-y-3 text-[#5A6478] text-sm sm:text-base leading-relaxed">
              <p>Yana Chemodities Inc. is a leading provider of quality laboratory products and services in the Philippines. We serve the food, industrial, government, life science, educational, and pharmaceutical markets as a nationwide distributor.</p>
              <p>Operating countrywide with offices in Manila and Cebu, our team of over 70 dedicated professionals serves more than 1,000 active buying companies and 100 dealers who trust us as their one-stop lab shop.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop&auto=format" alt="Laboratory professionals" className="rounded-2xl w-full h-60 sm:h-72 object-cover shadow-2xl" />
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-[#69b400] to-[#558b2f] text-white rounded-2xl p-4 shadow-xl">
              <div className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold">1979</div>
              <div className="text-green-200 text-xs font-medium">Year Founded</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-[#0f172a] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
            <SectionLabel light>{t.mission}</SectionLabel>
            <h3 className="font-['Barlow_Condensed'] text-xl sm:text-2xl font-bold mb-4">We Strive To "Benefit Society"</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">We believe in conducting our operations with honesty, integrity, and respect.</p>
            <div className="space-y-2.5">
              {["Providing assured quality at fair prices", "Satisfying our customers' needs", "Maintaining mutually beneficial supplier relationships"].map(item => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle size={13} className="text-[#9ccc65] flex-shrink-0 mt-0.5" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f0f9e8] to-[#e8f5e9] rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <SectionLabel>{t.vision}</SectionLabel>
            <h3 className="font-['Barlow_Condensed'] text-xl sm:text-2xl font-bold text-[#1e293b] mb-4">We strive "To Benefit Society"</h3>
            <p className="text-[#5A6478] text-sm leading-relaxed mb-4">Committed to providing quality products and services to meet our customers' needs.</p>
            <div className="space-y-2.5">
              {["Beneficial relationships with suppliers and customers", "Dedicated to customer satisfaction", "Stock availability and price stability"].map(item => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-[#1e293b]">
                  <CheckCircle size={13} className="text-[#69b400] flex-shrink-0 mt-0.5" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg hover:border-[#69b400]/20 transition-all">
              <div className="w-11 h-11 bg-[#f0f9e8] rounded-xl flex items-center justify-center mx-auto mb-3">
                <s.icon size={20} className="text-[#69b400]" />
              </div>
              <div className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-bold text-[#1e293b]">{s.value}</div>
              <div className="text-[#5A6478] text-xs sm:text-sm mt-1">{lang === "FIL" ? s.labelFIL : s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CAREERS PAGE ─────────────────────────────────────────────────────────────
function CareersPage({ t }: { t: typeof T["EN"] }) {
  const [careerEmail, setCareerEmail] = useState("");
  const [careerState, setCareerState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleCareerSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!careerEmail) return;
    setCareerState("loading");
    try {
      await subscribeCareerNotification(careerEmail);
      setCareerState("success");
    } catch {
      setCareerState("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-12">
        <SectionLabel>{t.joinTeam}</SectionLabel>
        <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold text-[#1e293b] mb-4">{t.careersTitle}</h1>
        <p className="text-[#5A6478] max-w-xl mx-auto text-sm sm:text-base">{t.careersSubtitle}</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center mb-6 shadow-xl shadow-black/5">
        <div className="w-16 h-16 bg-[#f0f9e8] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Microscope size={30} className="text-[#69b400]" />
        </div>
        <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-[#1e293b] mb-2">{t.noJobs}</h3>
        <p className="text-[#5A6478] text-sm mb-6 max-w-sm mx-auto">{t.noJobsSub}</p>
        {careerState === "success" ? (
          <p className="text-[#69b400] font-semibold text-sm flex items-center justify-center gap-2"><CheckCircle size={16} /> You're subscribed! We'll notify you when positions open.</p>
        ) : (
          <form onSubmit={handleCareerSubscribe} className="max-w-sm mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input required type="email" value={careerEmail} onChange={e => setCareerEmail(e.target.value)} placeholder="Enter your email"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10" />
              <button type="submit" disabled={careerState === "loading"}
                className="w-full sm:w-auto bg-[#69b400] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#558b2f] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-[#69b400]/20">
                {careerState === "loading" ? <Loader2 size={14} className="animate-spin" /> : t.notifyMe}
              </button>
            </div>
            {careerState === "error" && <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[{ icon: Beaker, title: "Scientific Culture", desc: "Work with cutting-edge laboratory equipment at the forefront of scientific advancement in the Philippines." }, { icon: Users, title: "Collaborative Team", desc: "Join a professional team serving top scientific institutions, hospitals, and industries nationwide." }, { icon: Award, title: "Growth Opportunities", desc: "Continuous training, factory certifications, and career development pathways for all employees." }].map(b => (
          <div key={b.title} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-[#69b400]/20 transition-all">
            <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center mb-3">
              <b.icon size={18} className="text-[#69b400]" />
            </div>
            <h4 className="font-bold text-[#1e293b] mb-2 text-sm">{b.title}</h4>
            <p className="text-[#5A6478] text-xs leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ t }: { t: typeof T["EN"] }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", address: "", type: "Product Inquiry", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await submitInquiry({ type: form.type, name: form.name, company: form.company, email: form.email, phone: form.phone, address: form.address, message: form.message });
      setState("success");
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setState("error");
    }
  }

  return (
    <div>
      <div className="relative bg-[#0f172a] py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionLabel light>Get in Touch</SectionLabel>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-bold text-white mb-3">{t.contactTitle}</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm">{t.contactSubtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
          {/* Offices */}
          <div className="md:col-span-2 space-y-4">
            {[
              { city: "Manila Office", address: "151 Kaliraya Street, Quezon City, Philippines", phone: ["+63 927 794 3497", "+63 956 235 5483", "+63 956 235 5484 (Viber)"], landline: ["8781-1048", "8732-0171", "8781-1047", "8732-0163"] },
              { city: "Cebu Office", address: "Cebu City, Philippines", phone: ["+63 945 847 9543"], landline: [] },
            ].map(o => (
              <div key={o.city} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#69b400]/20 hover:shadow-md transition-all">
                <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-[#1e293b] mb-3">{o.city}</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex gap-2.5"><MapPin size={14} className="text-[#69b400] flex-shrink-0 mt-0.5" /><span className="text-[#5A6478]">{o.address}</span></div>
                  <div className="flex gap-2.5"><Phone size={14} className="text-[#69b400] flex-shrink-0 mt-0.5" /><div className="text-[#5A6478]">{o.phone.map(p => <div key={p}>{p}</div>)}</div></div>
                  {o.landline.length > 0 && <div className="flex gap-2.5"><Phone size={14} className="text-gray-300 flex-shrink-0 mt-0.5" /><div className="text-[#5A6478]">{o.landline.map(l => <div key={l}>{l}</div>)}</div></div>}
                </div>
              </div>
            ))}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#69b400]/20 transition-all">
              <div className="flex gap-2.5 text-sm mb-2"><Mail size={14} className="text-[#69b400] flex-shrink-0 mt-0.5" /><span className="text-[#5A6478]">info@yanachemodities.com</span></div>
              <p className="text-xs text-[#5A6478]">Skype: <span className="font-bold text-[#1e293b]">yana_chemodities_manila</span></p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xl shadow-black/5">
            {state === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#f0f9e8] rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-[#69b400]" /></div>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-[#1e293b] mb-2">Message Sent!</h3>
                <p className="text-[#5A6478] text-sm">We will get back to you as soon as possible.</p>
                <button onClick={() => { setState("idle"); setForm({ name: "", company: "", email: "", phone: "", address: "", type: "Product Inquiry", message: "" }); }} className="mt-4 text-sm text-[#69b400] font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <SectionLabel>Message</SectionLabel>
                <h2 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-bold text-[#1e293b] mb-5">{t.sendMessage}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Name" required placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    <FormInput label="Company" placeholder="Your organization" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput label="Email Address" required type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    <FormInput label="Phone Number" type="tel" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <FormInput label="Address" placeholder="Your address" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
                  <div>
                    <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">{t.inquiryType}</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 bg-white">
                      {[t.productInquiry, t.requestQuote, "Service Request", t.requestConsultation, "General Inquiry"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1e293b] block mb-1.5">{t.concern}<span className="text-[#69b400] ml-0.5">*</span></label>
                    <textarea required rows={4} placeholder="Tell us what you need..."
                      value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#69b400] focus:ring-2 focus:ring-[#69b400]/10 resize-none" />
                  </div>
                  {state === "error" && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{errMsg}</p>}
                  <SubmitBtn loading={state === "loading"}><MessageSquare size={15} /> {t.submitMessage}</SubmitBtn>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage, t }: { setPage: (p: Page) => void; t: typeof T["EN"] }) {
  return (
    <footer className="bg-[#0f172a] text-white pt-12 sm:pt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
          <div className="col-span-2 md:col-span-2">
            <button onClick={() => setPage("home")} className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#69b400] to-[#558b2f] rounded-xl flex items-center justify-center shadow-lg shadow-[#69b400]/30">
                <FlaskConical size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[14px] font-['Barlow_Condensed'] tracking-wide">YANA CHEMODITIES, INC.</div>
                <div className="text-[9px] text-gray-500 tracking-[0.2em] uppercase">{t.tagline}</div>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">Your trusted partner in chemical supplies and laboratory equipment since 1979. Serving the Philippines nationwide.</p>
            <div className="flex gap-2.5">
              {[Linkedin, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center hover:border-[#69b400] hover:bg-[#69b400] transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">Company</p>
            <div className="space-y-2">
              {([["home", t.home], ["products", t.products], ["services", t.services], ["about", t.about], ["careers", t.careers], ["contact", t.contact]] as [Page, string][]).map(([p, label]) => (
                <button key={p} onClick={() => setPage(p)} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">Support</p>
            <div className="space-y-2 mb-5">
              {([["support", t.faqs], ["support", t.helpDesk], ["support", t.contactDirectory], ["resources", t.resourceLibrary]] as [Page, string][]).map(([p, label], i) => (
                <button key={i} onClick={() => setPage(p)} className="block text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
              ))}
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">Contact</p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2"><MapPin size={11} className="text-[#69b400] flex-shrink-0 mt-0.5" /> 151 Kaliraya St, QC</div>
              <div className="flex items-center gap-2"><Phone size={11} className="text-[#69b400]" /> +63 927 794 3497</div>
              <div className="flex items-center gap-2"><Mail size={11} className="text-[#69b400]" /> info@yanachemodities.com</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2025 Yana Chemodities Inc. All rights reserved.</span>
          <button className="hover:text-gray-300 transition-colors">Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lang, setLang] = useState<Lang>("EN");
  const t = T[lang];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div className="min-h-screen bg-[#F4F6F8]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar page={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />
      <main className="pb-16 md:pb-0">
        {page === "home" && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} t={t} lang={lang} />}
        {page === "products" && <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} t={t} />}
        {page === "product-detail" && selectedProduct && <ProductDetailPage product={selectedProduct} setPage={setPage} t={t} />}
        {page === "services" && <ServicesPage setPage={setPage} t={t} />}
        {page === "support" && <SupportPage setPage={setPage} t={t} />}
        {page === "resources" && <ResourcesPage t={t} />}
        {page === "about" && <AboutPage t={t} lang={lang} />}
        {page === "careers" && <CareersPage t={t} />}
        {page === "contact" && <ContactPage t={t} />}
      </main>
      <Footer setPage={setPage} t={t} />
      {/* Desktop quick access */}
      <QuickAccessWidget setPage={setPage} t={t} />
      {/* Mobile bottom bar */}
      <MobileBottomBar setPage={setPage} />
    </div>
  );
}
