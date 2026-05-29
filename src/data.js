window.ACCIO_DEMO_DATA = {
  products: [
    {
      id: 'modusip',
      name: 'ModuSip Smart Hydration Bottle',
      category: 'Wellness commute gear',
      market: 'US hybrid workers and fitness commuters',
      promise: 'A modular insulated bottle with UV cap, flavor pod rail, and AI-generated replenishment offers.',
      retailPrice: 49,
      targetUnits: 1800,
      adCac: 8.2,
      fixedLaunchCost: 11800,
      fulfillment: 5.1,
      tariffRate: 0.075,
      packaging: 1.35,
      tags: ['BPA-free', 'UV cap', 'Giftable', 'Accessory upsell'],
      bullets: [
        'Launch-ready storefront copy, bundle pricing, and supplier shortlist generated from one Accio brief.',
        'Accessory rail creates recurring revenue through pods, lids, and corporate gifting kits.',
        'Compliance path includes food-contact material docs, battery transport notes, and sample QA checklist.'
      ],
      bundle: 'Bottle + 3 flavor pods + spare gasket',
      channels: ['TikTok Shop', 'Amazon FBA', 'Shopify DTC']
    },
    {
      id: 'nestcrate',
      name: 'NestCrate Foldable Pet Den',
      category: 'Pet home goods',
      market: 'Urban renters with small dogs',
      promise: 'A washable fold-flat pet den that ships compact and photographs like furniture.',
      retailPrice: 64,
      targetUnits: 1200,
      adCac: 10.5,
      fixedLaunchCost: 9600,
      fulfillment: 7.4,
      tariffRate: 0.045,
      packaging: 1.8,
      tags: ['Fold-flat', 'Washable liner', 'Small-space', 'Low return risk'],
      bullets: [
        'Accio turns material and size constraints into supplier search queries and RFQ fields.',
        'Commerce agent drafts PDP imagery prompts, variant logic, and subscription liner reorder offer.',
        'Risk dashboard tracks textile claims, carton crush tests, and holiday freight timing.'
      ],
      bundle: 'Den + washable liner + travel strap',
      channels: ['Shopify DTC', 'Chewy marketplace', 'Retail pop-up']
    },
    {
      id: 'lumiclip',
      name: 'LumiClip Creator Desk Lamp',
      category: 'Creator workspace',
      market: 'Remote creators and online sellers',
      promise: 'A clamp lamp with softbox diffuser, phone mount, and preset content modes.',
      retailPrice: 58,
      targetUnits: 1500,
      adCac: 9.1,
      fixedLaunchCost: 13200,
      fulfillment: 6.3,
      tariffRate: 0.065,
      packaging: 1.55,
      tags: ['Creator kit', 'USB-C', 'Low MOQ', 'Bundle friendly'],
      bullets: [
        'AI storefront assistant rewrites PDP copy for creators, Etsy sellers, and livestream sellers.',
        'Supplier shortlist compares lumen consistency, hinge fatigue, and packaging drop-test evidence.',
        'ROI panel lets the pitch judge test price, CAC, freight, and MOQ scenarios live.'
      ],
      bundle: 'Lamp + diffuser + phone mount',
      channels: ['TikTok Shop', 'Shopify DTC', 'B2B creator kits']
    }
  ],
  suppliers: [
    {
      id: 'spark',
      name: 'SparkWell Manufacturing',
      country: 'Shenzhen, CN',
      focus: 'Smart drinkware',
      moq: 900,
      unitCost: 12.4,
      sampleCost: 180,
      leadDays: 28,
      onTime: 94,
      defectRate: 1.4,
      accioScore: 91,
      riskScore: 22,
      capacity: '42k units/mo',
      terms: '30/70, trade assurance',
      certs: ['LFGB', 'RoHS', 'MSDS'],
      freight: { air: 3.4, sea: 0.68, rail: 1.18 },
      notes: 'Strong battery documentation; needs final carton artwork lock.'
    },
    {
      id: 'harbor',
      name: 'HarborLine Home Goods',
      country: 'Ningbo, CN',
      focus: 'Soft goods and pet',
      moq: 650,
      unitCost: 18.7,
      sampleCost: 140,
      leadDays: 34,
      onTime: 89,
      defectRate: 2.1,
      accioScore: 86,
      riskScore: 31,
      capacity: '31k units/mo',
      terms: '20/80 after inspection',
      certs: ['OEKO-TEX', 'BSCI'],
      freight: { air: 4.9, sea: 0.92, rail: 1.52 },
      notes: 'Best textile fit; confirm liner colorfastness and label claims.'
    },
    {
      id: 'northstar',
      name: 'Northstar OptoElectronics',
      country: 'Dongguan, CN',
      focus: 'Lighting and creator gear',
      moq: 800,
      unitCost: 14.9,
      sampleCost: 220,
      leadDays: 32,
      onTime: 91,
      defectRate: 1.8,
      accioScore: 88,
      riskScore: 27,
      capacity: '26k units/mo',
      terms: '30/70 with pre-shipment video',
      certs: ['CE', 'FCC', 'RoHS'],
      freight: { air: 3.9, sea: 0.76, rail: 1.31 },
      notes: 'Good hinge testing; ask for US plug labeling evidence.'
    }
  ],
  workflow: [
    { id: 'brief', label: 'Brief', owner: 'Founder', duration: '12 min', status: 'done', output: 'Product thesis, audience, constraints, target margin.', prompt: 'Turn my product idea into a sourcing-ready brief with compliance questions.' },
    { id: 'discover', label: 'Discover', owner: 'Accio', duration: '18 min', status: 'active', output: 'Supplier search strings, comparable products, spec gaps.', prompt: 'Find suppliers that match MOQ, certification, material, and launch speed.' },
    { id: 'rfq', label: 'RFQ', owner: 'Accio Work', duration: '1 day', status: 'queued', output: 'RFQ packet, translated messages, quote comparison grid.', prompt: 'Prepare RFQs and follow-up messages for the top 5 suppliers.' },
    { id: 'sample', label: 'Sample', owner: 'Ops', duration: '9 days', status: 'queued', output: 'Sample checklist, photo evidence, defect scoring.', prompt: 'Create sample inspection criteria and a supplier evidence checklist.' },
    { id: 'launch', label: 'Launch', owner: 'Commerce', duration: '3 days', status: 'queued', output: 'PDP copy, bundle, launch budget, reorder trigger.', prompt: 'Draft the storefront launch plan and reorder forecast.' }
  ],
  accioSteps: [
    { id: 'agent-brief', title: 'Generate commerce brief', result: 'Brief synced to product, supplier, and launch tabs.', confidence: 96 },
    { id: 'agent-rfq', title: 'Draft supplier outreach', result: 'RFQ fields include MOQ, samples, certifications, carton, payment terms.', confidence: 92 },
    { id: 'agent-risk', title: 'Summarize supplier risk', result: 'Highlights compliance gaps, lead-time exposure, and mitigation steps.', confidence: 89 },
    { id: 'agent-store', title: 'Create storefront copy', result: 'PDP title, bullets, bundle offer, and channel-specific hooks.', confidence: 94 }
  ],
  competition: [
    {
      id: 'search',
      label: 'search-only sourcing',
      shortLabel: 'Search-only',
      altScore: 58,
      accioScore: 91,
      timeSaved: '4.5 days',
      problem: 'Keyword search can surface suppliers, but it leaves MOQ fit, certification evidence, freight impact, RFQ follow-up, and launch economics as manual detective work.',
      advantage: 'Accio turns the concept brief into supplier filters, RFQ fields, risk evidence, and a live landed-cost model the judge can stress-test immediately.'
    },
    {
      id: 'spreadsheet',
      label: 'spreadsheet workflows',
      shortLabel: 'Spreadsheet',
      altScore: 62,
      accioScore: 90,
      timeSaved: '6 handoffs',
      problem: 'Spreadsheets compare quotes after someone collects them, so assumptions drift from supplier facts and launch decisions are easy to audit only after the fact.',
      advantage: 'Accio keeps the quote, risk controls, cash need, break-even point, reorder trigger, and storefront plan connected in one operating console.'
    },
    {
      id: 'generic-agent',
      label: 'generic AI agents',
      shortLabel: 'Generic agent',
      altScore: 66,
      accioScore: 92,
      timeSaved: '9 prompts',
      problem: 'Generic agents can draft text, but they do not know the commerce handoffs that matter: RFQs, samples, certifications, freight modes, channel copy, and buyer-ready math.',
      advantage: 'Accio is specialized for commerce work, so every generated step lands as a sourcing artifact, risk memo, financial model, or launch packet.'
    },
    {
      id: 'research',
      label: 'ecommerce research tools',
      shortLabel: 'Research tool',
      altScore: 64,
      accioScore: 89,
      timeSaved: '3 tool hops',
      problem: 'Research tools explain demand and competition, but they stop before supplier execution, quote validation, compliance evidence, and the launch operating plan.',
      advantage: 'Accio bridges market insight to action: supplier shortlist, quote packet, product page, bundle, launch budget, and reorder logic for the chosen concept.'
    }
  ]
};
