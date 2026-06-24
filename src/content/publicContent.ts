export type Section = {
  title: string
  body: string[]
}

export type PublicPage = {
  path: string
  navLabel: string
  title: string
  description: string
  canonicalPath: string
  h1: string
  intro: string
  highlight?: string
  sections: Section[]
}

export const homeSections: Section[] = [
  {
    title: 'Why urgency matters',
    body: [
      'Aflatoxin risk is rarely contained to one place. When grain is harvested wet, dried slowly, stored badly, or moved through mixed-value chains, the consequences can reach feed and milk before anyone has a practical chance to intervene.',
      'MycoGuard Kenya is built for the point where small but timely decisions matter most: the field, the store, the drying floor, the cooperative yard, the extension visit, and the community training session.',
    ],
  },
  {
    title: 'How it works',
    body: [
      'The app guides users through explainable risk screening questions, then turns those answers into clear prevention steps. It does not claim to test grain. It helps people recognize higher-risk conditions early and act before losses deepen.',
      'The guidance is designed to stay readable on a phone in field conditions, with clear next steps instead of abstract scores alone.',
    ],
  },
  {
    title: 'The 10 Places pathway',
    body: [
      'MycoGuard follows the grain to feed and milk pathway that frontline actors actually manage: Field, Harvest, Drying, Shelling or Milling, Home Store, Transport, Trader or Market, Aggregation, Feed Store, and Milk Context.',
      'That framing helps counties, cooperatives, and farmer groups focus on where risk is moving next, not only where it first appeared.',
    ],
  },
  {
    title: 'Why offline-first matters',
    body: [
      'Connectivity cannot be the condition for safer post-harvest decisions. The tool is designed so a first successful load can support repeat use in places with patchy signal, shared phones, or costly data.',
      'This matters for county extension work, cooperative collection sites, and farmer trainings where reliability matters more than novelty.',
    ],
  },
  {
    title: 'One Health and agroecology',
    body: [
      'MycoGuard Kenya connects grain handling, feed quality, milk safety, public health, and local livelihoods. That is why the product is framed as a One Health agroecology tool rather than a single-crop advisory.',
      'The goal is to make prevention usable at decision points where human, animal, and environmental outcomes meet.',
    ],
  },
  {
    title: 'Who it serves',
    body: [
      'The public pages speak to farmer groups, cooperatives, extension teams, aggregators, dryers, and local implementation partners who need a credible field tool they can explain to others.',
      'The app layer is being shaped for practical use in screenings, training sessions, and everyday post-harvest checks.',
    ],
  },
  {
    title: 'Key features',
    body: [
      'Planned features include modular risk screening, offline weather guidance, a verified drying directory, group facilitator mode, and client-side exports for PDFs, CSV summaries, JSON backups, and calendar reminders.',
      'Phase 1 focuses on the discovery layer, route structure, and SEO-ready shell so the public product can be shared clearly before the deeper workflows are added.',
    ],
  },
  {
    title: 'Evidence and credibility',
    body: [
      'The product language is intentionally restrained. It avoids claims about detection, diagnosis, or guaranteed safety. Instead it centers explainable risk screening, prevention guidance, and practical action.',
      'That discipline matters for review by county institutions, researchers, cooperatives, and funders who expect both seriousness and clarity.',
    ],
  },
]

export const faqItems = [
  {
    question: 'What is MycoGuard Kenya?',
    answer:
      'MycoGuard Kenya is an offline-first early warning and action toolkit for aflatoxin risk screening and prevention across the grain, feed, and milk chain.',
  },
  {
    question: 'Does it test or diagnose aflatoxin?',
    answer:
      'No. MycoGuard provides risk screening and prevention guidance. It is not a lab test, toxin detector, or replacement for formal testing.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Yes. The product is being built so that once it has loaded successfully, core pages and app guidance can still be used without a live connection.',
  },
  {
    question: 'Who can use it?',
    answer:
      'Farmers, cooperatives, extension teams, facilitators, aggregators, and other frontline agrifood actors can use the tool.',
  },
  {
    question: 'Can cooperatives and county extension teams use it together?',
    answer:
      'Yes. The workflow is intended to support both direct screenings and group facilitation so shared prevention decisions are easier to coordinate.',
  },
  {
    question: 'Can it help with drying and storage decisions?',
    answer:
      'Yes. The product is meant to support prevention choices around drying, storage, handling, and related practices before risk compounds.',
  },
  {
    question: 'Can it export reports?',
    answer:
      'Yes. The planned app layer includes client-side PDF, CSV, JSON, and calendar exports for individual or facilitator workflows.',
  },
  {
    question: 'Why use a One Health approach?',
    answer:
      'Because risk does not stay in one compartment. Grain quality, feed safety, milk safety, public health, and farm livelihoods are connected, so the guidance is structured that way too.',
  },
]

export const publicPages: PublicPage[] = [
  {
    path: '/about-aflatoxin',
    navLabel: 'About aflatoxin',
    title:
      'Aflatoxin in Kenya | Why Prevention Must Start Before Grain Reaches Feed and Milk',
    description:
      'Learn why aflatoxin prevention in Kenya must start before contaminated grain reaches feed and milk, and why practical field screening matters.',
    canonicalPath: '/about-aflatoxin',
    h1: 'Why aflatoxin prevention matters in Kenya',
    intro:
      'Aflatoxin risk grows quietly when harvest, drying, storage, transport, and feed handling are treated as separate problems. Prevention becomes harder and more expensive once grain has already moved downstream.',
    highlight:
      'MycoGuard Kenya gives counties, farmer groups, cooperatives, and frontline value-chain actors an offline way to stop aflatoxin risk before it moves from grain to feed and milk, making One Health agroecology usable at the point where decisions are actually made.',
    sections: [
      {
        title: 'Why earlier action matters',
        body: [
          'By the time visible spoilage is obvious, options are already narrower. Earlier recognition of moisture, drying delays, unsafe storage, and mixed handling conditions is what creates room for prevention.',
          'That is why the product emphasizes practical field screening instead of retrospective explanation.',
        ],
      },
      {
        title: 'Why grain, feed, and milk must be linked',
        body: [
          'Risk that begins in grain can carry into feed systems and then affect milk contexts, local trust, and household health. Treating those stages separately can hide the real path of exposure.',
          'A linked view helps frontline actors know where to intervene next.',
        ],
      },
      {
        title: 'What MycoGuard does and does not do',
        body: [
          'MycoGuard supports explainable risk screening and prevention guidance. It does not promise diagnosis, guaranteed safety, or a substitute for formal testing and public health protocols.',
          'That restraint is part of its credibility for public-interest use.',
        ],
      },
    ],
  },
  {
    path: '/one-health',
    navLabel: 'One Health',
    title:
      'One Health and Agroecology | How MycoGuard Kenya Protects Grain, Feed, Milk, and People',
    description:
      'See how MycoGuard Kenya connects grain handling, feed safety, milk contexts, and public health through a One Health agroecology lens.',
    canonicalPath: '/one-health',
    h1: 'One Health in the grain-feed-milk chain',
    intro:
      'Aflatoxin prevention is not only a storage issue or only a farming issue. It sits at the intersection of crops, livestock, food safety, livelihoods, and public health.',
    sections: [
      {
        title: 'From field decisions to health outcomes',
        body: [
          'Small decisions about timing, drying surfaces, bagging, storage conditions, and feed handling can affect outcomes far beyond the farm gate.',
          'A One Health approach keeps those links visible instead of letting them disappear between institutions.',
        ],
      },
      {
        title: 'Why agroecology needs usable tools',
        body: [
          'Agroecology is strongest when it is practical at the moment of use. County teams, cooperatives, and farmer groups need a field-ready way to translate principles into safer post-harvest routines.',
          'MycoGuard is designed to make that translation easier on a phone, offline, and in plain language.',
        ],
      },
      {
        title: 'Who benefits from a shared framework',
        body: [
          'Extension teams can use the same language as cooperatives. Facilitators can align farmer training with feed and milk risk awareness. Partners and funders can review a tool that reflects systems thinking rather than isolated advice.',
          'That shared frame is part of the product, not an afterthought.',
        ],
      },
    ],
  },
  {
    path: '/how-it-works',
    navLabel: 'How it works',
    title:
      'How MycoGuard Kenya Works | Offline Aflatoxin Risk Screening and Prevention',
    description:
      'Explore how MycoGuard Kenya supports offline aflatoxin risk screening, prevention guidance, weather prompts, and practical next steps.',
    canonicalPath: '/how-it-works',
    h1: 'How MycoGuard works',
    intro:
      'The product is being built as a practical sequence: understand current risk conditions, surface the strongest drivers, and show the next prevention steps in clear language.',
    sections: [
      {
        title: 'Assessment flow',
        body: [
          'Users move through focused checklist modules rather than one long confusing form. The aim is to keep screening short, explainable, and usable in real field conversations.',
          'Results are framed around risk levels and recommended prevention actions, not around opaque scoring alone.',
        ],
      },
      {
        title: 'Weather and season support',
        body: [
          'Observed conditions like rain, heat, cloud, and humidity can change what should happen next. Seasonal guidance helps users interpret the broader context even when live data is unavailable.',
          'The design stays grounded in offline use rather than depending on constant connectivity.',
        ],
      },
      {
        title: 'Facilitator and export support',
        body: [
          'The app layer is planned to support repeated screenings in group settings, plus offline-friendly exports that can be saved, shared, or reviewed later.',
          'That makes it easier to move from awareness to documented action.',
        ],
      },
    ],
  },
  {
    path: '/for-cooperatives',
    navLabel: 'For cooperatives',
    title:
      'MycoGuard for Cooperatives | Offline Grain Safety and Aflatoxin Prevention Support',
    description:
      'Learn how cooperatives can use MycoGuard Kenya to support grain safety conversations, drying choices, and practical prevention workflows.',
    canonicalPath: '/for-cooperatives',
    h1: 'How cooperatives can use MycoGuard',
    intro:
      'Cooperatives often sit where prevention decisions become shared decisions. They need a tool that can support intake conversations, member guidance, and practical referrals without overstating what the tool can prove.',
    sections: [
      {
        title: 'Operational use cases',
        body: [
          'MycoGuard can support intake screening, handling conversations, drying referrals, and member education around safer post-harvest practices.',
          'Because the guidance is structured around next actions, it can help staff move quickly from risk recognition to prevention advice.',
        ],
      },
      {
        title: 'Why offline use matters for cooperatives',
        body: [
          'Collection and aggregation contexts do not always have reliable connectivity, but decisions still need to be made in the moment. Offline use reduces the risk that the tool becomes unavailable exactly when staff need it most.',
          'That reliability matters as much as the content itself.',
        ],
      },
      {
        title: 'What credibility looks like',
        body: [
          'A cooperative-facing tool must be careful with language. MycoGuard is positioned as a risk screening and prevention support tool, not a certification or testing mechanism.',
          'That makes it easier to explain responsibly to members and partners.',
        ],
      },
    ],
  },
  {
    path: '/for-extension-teams',
    navLabel: 'For extension teams',
    title:
      'MycoGuard for Extension Teams | Offline Advisory Support for Aflatoxin Prevention',
    description:
      'See how MycoGuard Kenya supports county extension teams with offline advisory workflows for aflatoxin prevention and group facilitation.',
    canonicalPath: '/for-extension-teams',
    h1: 'How extension teams can use MycoGuard',
    intro:
      'County and community extension teams need a tool that helps them explain risk clearly, repeat guidance consistently, and keep working in low-connectivity conditions.',
    sections: [
      {
        title: 'Field advisory support',
        body: [
          'Extension officers can use the app as a structured conversation guide during visits, trainings, and farmer group sessions. The aim is to make advice more consistent without making it sound mechanical.',
          'By keeping the guidance explainable, the tool supports trust as well as speed.',
        ],
      },
      {
        title: 'Group facilitation',
        body: [
          'The planned facilitator mode is meant to support repeated screenings across groups, field schools, or community sessions. That helps teams compare patterns and document follow-up needs.',
          'The public layer already prepares that story so partners understand how the workflow will be used.',
        ],
      },
      {
        title: 'Institutional fit',
        body: [
          'For public-interest adoption, the product needs to feel calm, clear, and credible. That means strong disclaimers, plain-language prevention guidance, and no claims that would undermine institutional trust.',
          'Those choices are deliberate, not cosmetic.',
        ],
      },
    ],
  },
  {
    path: '/faq',
    navLabel: 'FAQ',
    title: 'MycoGuard Kenya FAQ | Offline Aflatoxin Prevention Tool',
    description:
      'Find answers to common questions about MycoGuard Kenya, offline use, One Health positioning, exports, and what the tool does not claim to do.',
    canonicalPath: '/faq',
    h1: 'Frequently asked questions',
    intro:
      'These answers explain the product in the same restrained way it is meant to be used in the field: clear, practical, and careful about what it can and cannot do.',
    sections: [
      {
        title: 'What reviewers should understand first',
        body: [
          'The product is a prevention and decision-support tool. It is designed to help people act earlier and more consistently in the grain to feed to milk chain.',
          'It is not presented as a detector, laboratory service, or guaranteed safety mechanism.',
        ],
      },
    ],
  },
  {
    path: '/privacy',
    navLabel: 'Privacy',
    title: 'Privacy | MycoGuard Kenya',
    description:
      'Review the privacy approach for MycoGuard Kenya, including offline-first storage, client-side exports, and placeholder contact details.',
    canonicalPath: '/privacy',
    h1: 'Privacy and data handling',
    intro:
      'MycoGuard Kenya is being built to keep core data handling simple. The default direction is client-side storage, offline-first use, and exports that stay under the user’s control.',
    sections: [
      {
        title: 'Local-first handling',
        body: [
          'Assessment history and exported files are intended to stay on the device unless a user chooses to share them. That reduces dependence on cloud infrastructure and supports lower-connectivity use.',
          'Phase 1 establishes the public privacy language and app shell that will support that approach.',
        ],
      },
      {
        title: 'No invented contact details',
        body: [
          'The product uses configurable placeholders rather than fabricated emails, phone numbers, or office locations. Real deployment details can be added later without rewriting the product narrative.',
          'That keeps the current build honest and deployment-ready.',
        ],
      },
      {
        title: 'Responsible use',
        body: [
          'Users should still follow county public health guidance and formal testing pathways where required. The product provides risk screening and prevention guidance, not formal certification.',
          'That distinction will remain visible in the app footer, results screens, and exports.',
        ],
      },
    ],
  },
]

export const appRouteSummaries = [
  { path: '/app', label: 'App home', summary: 'Overview of the working tool.' },
  {
    path: '/app/new-assessment',
    label: 'New assessment',
    summary: 'Checklist-driven risk screening workflow.',
  },
  {
    path: '/app/results',
    label: 'Results',
    summary: 'Explainable risk summary and recommended actions.',
  },
  {
    path: '/app/weather',
    label: 'Weather mode',
    summary: 'Observed conditions, seasonal guidance, and offline reminders.',
  },
  {
    path: '/app/drying-directory',
    label: 'Drying directory',
    summary: 'Verified commercial drying sites and reference details.',
  },
  {
    path: '/app/history',
    label: 'History',
    summary: 'Local assessment history and exports.',
  },
  {
    path: '/app/group-mode',
    label: 'Group mode',
    summary: 'Facilitator workflow for repeated screenings.',
  },
  {
    path: '/app/settings',
    label: 'Settings',
    summary: 'Language, storage, and export preferences.',
  },
]
