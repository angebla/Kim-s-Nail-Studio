// Treatment data
const TREATMENTS = {
  manicure: {
    label: "Manicure",
    items: [
      {
        id: "luxe-mani",
        photo: "manicure.png?v=2",
        name: "Manicure",
        tag: "Signature",
        lede: "A complete pampering treatment for your natural nails, cared for and shaped.",
        what: [
          "Filing and shaping your nails",
          "Cuticle care with a warm soak",
          "Hand scrub and short hand massage",
        ],
        prices: [
          { name: "Classic manicure", duration: "45 min", amt: "€ 35" },
          { name: "Luxe manicure + hand massage", duration: "60 min", amt: "€ 42" },
          { name: "Luxe + paraffin hand treatment", duration: "75 min", amt: "€ 52" },
        ],
      },
      {
        id: "gellak",
        photo: "polish.png",
        name: "Nail Polish",
        tag: "Classic",
        lede: "Glossy, long-lasting colour on your own nails. Perfect for those who love a polished, natural look.",
        styles: ["Regular polish", "Gel polish", "French tip"],
        what: [
          "Prep & shaping of your natural nails",
          "Base coat, coloured gel polish and top coat",
          "Cured under LED lamp after every layer",
          "Lasts 2 to 3 weeks without chipping",
        ],
        prices: [
          { name: "Gel polish one colour", duration: "60 min", amt: "€ 25" },
          { name: "Gel polish French or Babyboomer", duration: "75 min", amt: "€ 45" },
          { name: "Gel polish removal", duration: "20 min", amt: "€ 12" },
        ],
      },
    ],
  },
  verlenging: {
    label: "Extensions",
    items: [
      {
        id: "biab",
        photo: "BIAB.jpg",
        name: "BIAB (Builder in a Bottle)",
        tag: "Recommended for maintenance",
        lede: "BIAB is a flexible, strong gel that reinforces your natural nails without weakening them. Ideal if your nails are brittle, or if you want to transition away from acrylic.",
        what: [
          "Preparation of the natural nail bed",
          "Application of BIAB gel as a strengthening layer",
          "Light extension is optional and an additional service",
          "Colour finish (gel polish) is optional and an additional service",
          "Refill every 3–4 weeks",
        ],
        prices: [
          { name: "BIAB overlay (own length)", duration: "75 min", amt: "€ 70" },
          { name: "BIAB with light extension", duration: "90 min", amt: "€ 58" },
          { name: "BIAB refill", duration: "75 min", amt: "€ 45" },
          { name: "BIAB + nail art", duration: "from", amt: "€ 65" },
        ],
      },
      {
        id: "acryl",
        photo: "nails-1.png",
        name: "Acrylic Nails",
        tag: "Maximum length & strength",
        lede: "The classic, ultra-strong set for those who love a statement look. With acrylic we create any desired length, shape and design, from subtle almond to long stiletto.",
        styles: ["Regular", "Pink powder", "Color powder", "Babyboom"],
        what: [
          "Nail prep & sculpting",
          "Tip or form application is optional and an additional service",
          "Sculpting liquid + powder into hard acrylic",
          "Filing to desired shape (almond, coffin, square, stiletto)",
          "Colour finish (gel polish, French or nail art) is optional and an additional service",
          "Refill every 3–4 weeks recommended",
        ],
        prices: [
          { name: "New acrylic set one colour", duration: "120 min", amt: "€ 55" },
          { name: "Acrylic French / Babyboomer", duration: "135 min", amt: "€ 72" },
          { name: "Acrylic refill", duration: "90 min", amt: "€ 48" },
          { name: "Acrylic removal", duration: "45 min", amt: "€ 22" },
        ],
      },
      {
        id: "polygel",
        name: "Polygel",
        tag: "Lightweight alternative",
        lede: "A hybrid between acrylic and gel. Lighter than acrylic, stronger than gel polish, perfect if you want a sleek extension without the heavy feel.",
        what: [
          "Strong, flexible material with virtually no odour",
          "Sculpted with dual-form moulds for a precise shape",
          "Feels light, less likely to break than classic acrylic",
          "Refill every 3–4 weeks",
        ],
        prices: [
          { name: "New polygel set", duration: "110 min", amt: "€ 60" },
          { name: "Polygel refill", duration: "90 min", amt: "€ 45" },
        ],
      },
    ],
  },
  pedicure: {
    label: "Pedicure",
    items: [
      {
        id: "pedicure",
        name: "Pedicure",
        tag: "Indulgence for your feet",
        lede: "A full treatment for your feet, from nails to heels. Step out with soft, well-groomed feet and polished nails.",
        photo: "studio.png",
        what: [
          "Foot soak and skin softening",
          "Filing and shaping of the toenails",
          "Removal of calluses and hardened skin",
          "Foot massage and moisturising cream",
        ],
        prices: [
          { name: "Classic pedicure", duration: "60 min", amt: "€ 55" },
          { name: "Luxe pedicure + massage", duration: "75 min", amt: "€ 55" },
        ],
      },
    ],
  },
  art: {
    label: "Nail Art",
    items: [
      {
        id: "nailart",
        photo: "nailart.png?v=2",
        name: "Custom Nail Art",
        tag: "Fully personalised",
        lede: "From subtle gold foil and chrome to flowers, marble and hand-painted designs. Bring your inspiration or let yourself be surprised, we create it together.",
        styles: ["Chrome", "Marble", "Flowers", "Hand-painted", "Ombré", "Line art"],
        what: [
          "Inspiration chat at the start of your appointment",
          "Hand-painted details, foil, chrome, gems or stickers",
          "Can be combined with any gel polish, BIAB or acrylic treatment",
        ],
        prices: [],
      },
      {
        id: "removal",
        name: "Removal & Repair",
        tag: "Service",
        lede: "Safe removal of existing sets, or a quick repair for a broken nail, including sets not made by us.",
        what: [
          "Gentle removal without damaging the natural nail",
          "Short nourishing treatment after removal",
          "Repairs available within 7 days of your last appointment",
        ],
        prices: [
          { name: "Acrylic removal", duration: "45 min", amt: "€ 22" },
          { name: "BIAB / Polygel removal", duration: "30 min", amt: "€ 18" },
          { name: "Nail repair (per nail)", duration: "15 min", amt: "€ 5" },
        ],
      },
    ],
  },
};

const FAQ_GROUPS = [
  {
    id: "behandelingen",
    label: "Behandelingen",
    items: [
      {
        q: "Wat is precies het verschil tussen BIAB en acryl?",
        a: "BIAB (Builder In A Bottle) is een soepele, gel-achtige versterker die we direct op je natuurlijke nagel aanbrengen. Het is licht, flexibel en supervriendelijk voor je eigen nagel — perfect als je nagels brokkelig of dun zijn, of als je een natuurlijke look wilt met extra sterkte. Acryl daarentegen is een hard, steviger materiaal dat we mengen op het moment zelf (vloeistof + poeder). Het is dé keuze voor flinke verlengingen, statement vormen zoals stiletto of coffin, en wie zijn nagels lang écht lang wil. Acryl is sterker maar zwaarder en vraagt iets meer onderhoud. Korte regel: BIAB voor verzorgde, natuurlijke kracht — acryl voor lengte en drama.",
      },
      {
        q: "Hoe lang houdt een set?",
        a: "Gellak op natuurlijke nagels en BIAB houden gemiddeld 2 tot 3 weken mooi. Acryl en polygel verlengingen blijven langer zitten — daar plannen we elke 3 tot 4 weken een bijvulling om de basis fris te houden. Hoe lang het écht meegaat hangt deels van jou af: hoe je je handen gebruikt, of je vaak in water zit, en of je crèmes met olie gebruikt.",
      },
      {
        q: "Welke behandeling past bij mijn nagels?",
        a: "Zit je voor het eerst bij ons? Begin gerust met een Luxe Manicure of gellak — dan zien we samen hoe je nagels reageren. Heb je dunne, splijtende nagels? Dan is BIAB een liefdevolle keuze. Wil je echte lengte of een specifieke vorm? Dan adviseren we acryl of polygel. We kiezen altijd samen wat het beste past bij jouw nagels en je dagelijks leven.",
      },
      {
        q: "Doet een behandeling pijn?",
        a: "Nee, een goede behandeling hoort niet pijn te doen. We werken zonder agressief frezen en behandelen je nagels met zorg. Een lichte tinteling onder de LED-lamp tijdens het uitharden is normaal en gaat binnen seconden weg. Voel je toch iets oncomfortabels? Zeg het meteen — dan passen we aan.",
      },
    ],
  },
  {
    id: "afspraken",
    label: "Afspraken & Annulering",
    items: [
      {
        q: "Hoe maak ik een afspraak?",
        a: "Online via onze boekingspagina (24/7), via WhatsApp, of telefonisch tijdens openingsuren. Voor een nieuwe set adviseren we minstens een week vooraf te boeken — drukke periodes zoals december en zomer zijn snel volgeboekt.",
      },
      {
        q: "Wat als ik te laat ben?",
        a: "Een kleine uitloop tot 10 minuten is meestal geen probleem. Ben je later, dan kunnen we de behandeling moeten inkorten of verzetten zodat de afspraak na jou niet vertraagt. Een seintje vooraf wordt enorm gewaardeerd ✿",
      },
      {
        q: "Kan ik kosteloos annuleren?",
        a: "Annuleren of verzetten kan kosteloos tot 24 uur voor je afspraak. Daarna rekenen we 50% van het behandelingsbedrag, bij een no-show 100%. Zo houden we het eerlijk voor onszelf én voor andere klanten op de wachtlijst.",
      },
      {
        q: "Mag ik mijn eigen design of inspiratie meenemen?",
        a: "Heel graag! Pinterest-borden, screenshots, een foto van een ring of jurk — alles helpt. Aan het begin van je afspraak nemen we tijd om je inspiratie te bekijken en samen het design te finetunen.",
      },
    ],
  },
  {
    id: "onderhoud",
    label: "Onderhoud & Verzorging",
    items: [
      {
        q: "Wat doe ik thuis om mijn set lang mooi te houden?",
        a: "Drie gouden regels: draag handschoenen tijdens schoonmaken en afwassen, gebruik dagelijks een nagelriem-olie (vraag om een staaltje bij je afspraak), en gebruik je nagels niet als gereedschap om dingen open te wrikken — daar hebben we een sleuteltje voor.",
      },
      {
        q: "Wat als er een nagel breekt of loslaat?",
        a: "Dat is geen ramp. Bel of WhatsApp ons — binnen 7 dagen na je afspraak repareren we de nagel gratis. Daarna rekenen we een kleine reparatieprijs.",
      },
      {
        q: "Mag ik zelf een nagel afdoen?",
        a: "Liefst niet — door een gellak of verlenging eraf te trekken neem je vaak een laagje van je natuurlijke nagel mee. Plan een verwijdering bij ons, het duurt 20-45 minuten en je nagels blijven gezond.",
      },
    ],
  },
  {
    id: "studio",
    label: "Over de studio",
    items: [
      {
        q: "Waar zijn jullie gevestigd?",
        a: "In het hart van Antwerpen, op een rustige zijstraat van de Meir. We werken op afspraak in een privé-studio — geen drukte, geen onderbrekingen, gewoon jij en je behandelaarster.",
      },
      {
        q: "Werken jullie met merken die ik herken?",
        a: "We werken met The GelBottle (BIAB), Kiara Sky en OPI. Producten die we zelf vertrouwen en die er na 3 weken nog stralend uitzien.",
      },
      {
        q: "Bieden jullie cadeaubonnen aan?",
        a: "Zeker — fysiek of digitaal, in elk bedrag. Een lieve attentie voor je zus, mama of beste vriendin. Bestel via de site of vraag erom in de studio.",
      },
    ],
  },
];

const TESTIMONIALS = [
  {
    initials: "L",
    name: "Lotte V.",
    when: "2 weeks ago",
    quote: "My BIAB set is already 4 weeks old and still looks brand new. Kim really takes her time, and the studio feels like a warm hug. My new go-to place.",
  },
  {
    initials: "S",
    name: "Sara D.",
    when: "1 month ago",
    quote: "Finally someone who explains what she's doing and why. For the first time I actually understand my own nails. And they look beautiful.",
  },
  {
    initials: "Y",
    name: "Yasmine K.",
    when: "3 weeks ago",
    quote: "The attention to detail is unmatched. The marble, the gold edges on my French — everything is perfect. I look forward to coming here every 3 weeks.",
  },
];

const SIGNATURES = [
  {
    id: "biab",
    name: "BIAB Overlay",
    desc: "Natural strength. Gentle on the nail, beautiful for 3 weeks.",
    duration: "75 min",
    price: "€ 48",
    art: "biab",
  },
  {
    id: "french",
    name: "Soft French",
    desc: "Our classic — modern French with a hint of rosé.",
    duration: "75 min",
    price: "€ 45",
    art: "french",
  },
  {
    id: "almond",
    name: "Almond Acrylic Set",
    desc: "Statement length with the perfect shape. Fully tailored to you.",
    duration: "120 min",
    price: "€ 65",
    art: "almond",
  },
];

window.TREATMENTS = TREATMENTS;
window.FAQ_GROUPS = FAQ_GROUPS;
window.TESTIMONIALS = TESTIMONIALS;
window.SIGNATURES = SIGNATURES;
