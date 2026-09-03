/** Схема редактируемого контента сайта. Соответствует content.json. */

export type Language = 'english' | 'kazakh';

export interface Contacts {
  phone: string;
  phoneRaw: string;
  city: string;
  footerAbout: string;
}

export interface TrustItem {
  title: string;
  note: string;
}

export interface Course {
  to: string;
  title: string;
  lead: string;
  points: string[];
}

export interface HomeContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  courses: Course[];
}

export interface SolutionItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface SectionHead {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface SolutionsContent extends SectionHead {
  items: SolutionItem[];
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksContent extends SectionHead {
  steps: Step[];
}

export interface Teacher {
  name: string;
  role: string;
  facts: string[];
  about: string;
}

export interface TeachersContent extends SectionHead {
  items: Teacher[];
}

export interface Plan {
  name: string;
  lessons: string;
  price: string;
  oldPrice: string;
  pricePerLesson: string;
  duration: string;
  popular: boolean;
  discount: string;
  saving: string;
}

export interface PricingContent extends SectionHead {
  promo: string;
  plans: Plan[];
  includedTitle: string;
  included: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  guarantees: string[];
  cta: string;
}

export interface HeroBenefit {
  bold: string;
  text: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  benefits: HeroBenefit[];
  formTitle: string;
  formSubtitle: string;
  ctaButton: string;
}

export interface PainPoint {
  title: string;
  description: string;
}

export interface PainPointsContent extends SectionHead {
  footer: string;
  items: PainPoint[];
}

export interface ResultCase {
  image: string;
  title: string;
  story: string;
  testimonial: string;
  conclusion: string;
  duration: string;
}

export interface ResultsContent extends SectionHead {
  cta: string;
  cases: ResultCase[];
}

export interface Testimonial {
  text: string;
  parent: string;
  relation: string;
  image: string;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

/** Секции, которых может не быть у языка — например, кейсов на казахской странице. */
export interface LanguageContent {
  hero: HeroContent;
  painPoints: PainPointsContent;
  results: ResultsContent | null;
  testimonials: TestimonialsContent | null;
}

export interface SiteContent {
  version: number;
  updatedAt: string;
  contacts: Contacts;
  trust: TrustItem[];
  home: HomeContent;
  solutions: SolutionsContent;
  howItWorks: HowItWorksContent;
  teachers: TeachersContent;
  pricing: PricingContent;
  faq: FaqContent;
  contactForm: ContactFormContent;
  languages: Record<Language, LanguageContent>;
}
