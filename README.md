# 🐾 Tassar – A Social Platform for Pet Owners

**Tassar** is a web application for current and future pet owners. Users can:

- Scroll through posts shared by others
- View and visit user profiles
- Discuss in a forum about various animals and topics
- Learn more about animal organizations
- Report and find lost pets

This project was developed as part of a final thesis with the goal of creating a social and informative platform for people who love animals.

Visit the website: [https://tassar.vercel.app/]

---

## 🚀 Getting Started

To run the project locally, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/your-username/tassar.git
cd tassar
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## ⚙️ Technical Stack

This project uses modern web technologies suitable for building a fullstack application:

### 🧠 Next.js (with TypeScript)

[Next.js](https://nextjs.org) is used as the main framework because it provides:

- Server-side rendering (SSR) for performance and SEO
- Fullstack capabilities via API routes
- Excellent support for TypeScript

### 🎨 Tailwind CSS

[Tailwind CSS](https://tailwindcss.com) is used for styling thanks to its:

- Utility-first approach
- Fast prototyping capabilities
- Simplicity and flexibility

### 🔥 Firebase

[Firebase](https://firebase.google.com) is used for backend and database services:

- **Firestore** for real-time database
- **Firebase Authentication** for user login
- **Firebase Storage** for uploading images
- Easy setup and seamless integration with Next.js

### ☁️ Hosting with Vercel

[Vercel](https://vercel.com) is used for hosting and deployment:

- Seamless integration with Next.js
- Fast deploys from GitHub
- Free hosting for small projects

---

## 📚 Documentation and Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🧪 API Routes

The project includes API routes accessible under `/api`. For example:

```bash
http://localhost:3000/api/hello
```

---

## 📂 Project Structure (Overview)

```plaintext
/public
└── images/                → Static images used in the project

/src
├── app/                   → Main Next.js app directory
│   ├── [your-routes]/     → Page-specific folders (e.g., /profile, /forum, etc.)
│   ├── layout.tsx         → Root layout component
│   ├── page.tsx           → Main landing page
│   └── global.css         → Global styles
├── components/            → UI components
├── context/               → Global context providers (e.g., AuthContext)
├── data/                  → Static or shared data files
├── hooks/                 → Custom React hooks
└── pages/                 → API routes
```

# Betygskriterier för examensarbete

## Icke godkänd (IG)

- [ ] Den studerande har inte uppfyllt samtliga krav som nämnts i uppgiften.

## Godkänt (G)

För att få Godkänt (G) på examensarbetet måste samtliga kursmål och krav uppfyllas.

### Planering och Research

- [x] Utföra en noggrann målgruppsanalys.
- [x] Använda ett projekthanteringsverktyg för backlog, t.ex. Trello eller Kanban.

### Design och Prototyping

- [x] Skapa wireframes och prototyp i Figma som följer UX/UI-principer.
- [x] Se till att designen är responsiv för minst två olika skärmstorlekar och följer WCAG 2.1-standarder.

### Applikationsutveckling

- [x] Utveckla med ett modernt JavaScript-ramverk.
- [x] Använd en databas för lagring och hämtning av data.
- [x] Implementera state-hantering och skapa dynamiska komponenter med reaktivitet och interaktivitet.
- [x] Följa WCAG 2.1-standarder och använda semantisk HTML.
- [x] **För webbapp**: Produkten ska vara responsiv och fungera korrekt på minst två skärmstorlekar (mobil och dator).
- [x] **För native mobilapp**: Produkten ska anpassas till olika skärmstorlekar och enhetsorienteringar (porträtt och landskap).

### Versionshantering

- [x] Arbeta med Git och ha ett repo på GitHub.

### Slutrapport

En 2–3 sidor lång rapport med:

- [x] Abstract på engelska.
- [x] Tech stack och motivering av valen.
- [x] Dokumentation av arbetsprocess, planering och research.

### Deploy

- [x] Projektet ska vara hostat och tillgängligt för att kunna visas i en webbläsare eller simulator.

## Väl godkänd (VG)

För att få Väl Godkänt (VG) krävs en djupare förståelse, professionell kvalitet och avancerade tekniska lösningar.

- [x] **Allt för Godkänt (G)**

### Design och Prototyping

- [x] Implementera interaktivitet i prototypen för att demonstrera hur användaren interagerar med produkten.
- [x] Prototypen ska vara mycket lik den färdiga produkten.
- [ ] Designen följer, utan undantag, WCAG 2.1-standarder för nivå A och AA.

### Applikationsutveckling

- [ ] Använd en state management-lösning, t.ex. Redux eller Pinia, för att hantera global state.
- [x] Koden följer, utan undantag, WCAG 2.1-standarder för nivå A och AA.
- [x] **Optimering**: Produkten ska vara optimerad genom återanvändning av kod och komponenter samt användning av optimeringstekniker där det behövs.
- [x] **CRUD-operationer**: Implementera Create, Read, Update, Delete med säker hantering av användardata.
- [x] **Säker autentisering**: Implementera OAuth, JWT eller Firebase Authentication för att säkerställa att endast behöriga användare kan hantera data.
- [x] **För webbapp**: Produkten ska vara fullt responsiv och dynamiskt anpassa sig till olika skärmstorlekar och enheter.

### Versionshantering

- [x] Arbeta med feature branches och gör pull requests innan merge för att säkerställa ordning och spårbarhet.
- [x] Dokumentera varje steg i commit-historiken med tydliga commit-meddelanden.
- [x] Skriv en tydlig README som beskriver projektet, hur det körs och de tekniska valen.

### Deploy

- [x] Implementera ett automatiserat flöde för bygge och deploy där publicering sker automatiskt till en produktionsmiljö.

### Slutrapport

En 3–6 sidor lång rapport med:

- [x] En genomgång av varje steg i arbetsprocessen samt reflektioner över utmaningar och lösningar.
- [x] En detaljerad beskrivning av verktyg och tekniker som använts, med motivering av valen.
- [x] Förklaringar och motiveringar av UX/UI-designbeslut och tillgänglighetsanpassningar.
