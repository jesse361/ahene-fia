import type { Speaker, SpeakerCategory } from "@/types/event";

export const speakerCategories = [
  "All",
  "Technology",
  "Business",
  "Leadership",
  "Entrepreneurship",
  "Creativity",
] as const;

export type SpeakerFilter = (typeof speakerCategories)[number];

export const speakers: Speaker[] = [
  {
    slug: "ama-serwaa-mensah",
    name: "Ama Serwaa Mensah",
    title: "Leadership adviser",
    organization: "Mensah Advisory (sample)",
    category: "Leadership",
    sessionTitle: "The next chapter of African enterprise",
    expertise: "Executive judgment and public decision-making",
    biography:
      "Sample biography. Ama is written as an adviser who helps leadership teams make decisions they can explain to the people affected by them. She is interested in patience, succession, and the difference between a speech and a practice. This profile is demonstration copy.",
    image: "/images/speakers/ama.jpg",
    imageAlt: "Illustrative portrait of a smiling woman with locs and glasses, used for a sample speaker profile.",
    imagePosition: "center 30%",
    featured: true,
    portraitIsIllustrative: true,
  },
  {
    slug: "kwame-boateng",
    name: "Kwame Boateng",
    title: "Company builder",
    organization: "Harbour Works (sample)",
    category: "Business",
    sessionTitle: "Building companies that outlast the launch",
    expertise: "Operating rhythm, customers, and durable growth",
    biography:
      "Sample biography. Kwame is written as an operator who has spent his career on the unglamorous work after a launch: hiring, cash, and customers who return. The session explores what a young company owes its future self. This profile is demonstration copy.",
    image: "/images/speakers/kwame.jpg",
    imageAlt: "Illustrative portrait of a man with glasses resting his chin on his hand, used for a sample speaker profile.",
    imagePosition: "center 20%",
    featured: true,
    portraitIsIllustrative: true,
  },
  {
    slug: "naa-lamiley-okai",
    name: "Naa Lamiley Okai",
    title: "Creative director",
    organization: "Studio Lamiley (sample)",
    category: "Creativity",
    sessionTitle: "Design as a leadership practice",
    expertise: "Identity, hospitality, and visual judgment",
    biography:
      "Sample biography. Naa is written as a creative director who treats design as a way of hosting people, not decorating a message. Her session looks at how a room, a publication, or a product teaches guests what to expect. This profile is demonstration copy.",
    image: "/images/speakers/naa.jpg",
    imageAlt: "Illustrative portrait of a woman in a patterned garment against a rust-coloured wall, used for a sample speaker profile.",
    imagePosition: "center 15%",
    featured: true,
    portraitIsIllustrative: true,
  },
  {
    slug: "idris-owusu",
    name: "Idris Owusu",
    title: "Technology lead",
    organization: "Coastline Systems (sample)",
    category: "Technology",
    sessionTitle: "Choosing technology you can maintain",
    expertise: "Practical systems for institutions and product teams",
    biography:
      "Sample biography. Idris is written as a technology lead who prefers tools a team can still understand in three years. His sessions stay close to maintenance, public usefulness, and the cost of novelty. This profile is demonstration copy.",
    image: "/images/speakers/idris.jpg",
    imageAlt: "Illustrative portrait of a smiling man outdoors, used for a sample speaker profile.",
    imagePosition: "center 20%",
    featured: true,
    portraitIsIllustrative: true,
  },
  {
    slug: "efua-darko",
    name: "Efua Darko",
    title: "Leadership facilitator",
    organization: "Darko Studio (sample)",
    category: "Leadership",
    sessionTitle: "Decisions under pressure",
    expertise: "Facilitation when the stakes are public",
    biography:
      "Sample biography. Efua is written as a facilitator who works with teams in the hour before a hard decision. She is interested in silence, dissent, and how a room recovers its judgment. This profile is demonstration copy.",
    image: "/images/speakers/efua.jpg",
    imageAlt: "Illustrative portrait of a woman in profile on a balcony at dusk, used for a sample speaker profile.",
    imagePosition: "center 40%",
    featured: false,
    portraitIsIllustrative: true,
  },
  {
    slug: "kojo-asante",
    name: "Kojo Asante",
    title: "Narrative strategist",
    organization: "Asante Narrative (sample)",
    category: "Creativity",
    sessionTitle: "Stories that carry a company",
    expertise: "Reputation, film, and institutional memory",
    biography:
      "Sample biography. Kojo is written as a strategist who helps organisations tell the truth about their work without flattening it into a slogan. His session is about memory, images, and the stories a company can actually keep. This profile is demonstration copy.",
    image: "/images/speakers/kojo.jpg",
    imageAlt: "Illustrative portrait of a man in a navy beret holding a camera, used for a sample speaker profile.",
    imagePosition: "center 20%",
    featured: false,
    portraitIsIllustrative: true,
  },
  {
    slug: "abena-nyarko",
    name: "Abena Nyarko",
    title: "Founder",
    organization: "Nyarko & Co. (sample)",
    category: "Entrepreneurship",
    sessionTitle: "From first customer to first system",
    expertise: "Early ventures and the first repeatable offer",
    biography:
      "Sample biography. Abena is written as a founder who is more interested in the second customer than the first announcement. Her clinic is practical: offers, promises, and the systems that keep both. This profile is demonstration copy.",
    image: "/images/speakers/abena.jpg",
    imageAlt: "Illustrative portrait of a smiling woman in a white blouse, used for a sample speaker profile.",
    imagePosition: "center 25%",
    featured: false,
    portraitIsIllustrative: true,
  },
  {
    slug: "adwoa-quaye",
    name: "Adwoa Quaye",
    title: "Venture partner",
    organization: "Quaye Collective (sample)",
    category: "Entrepreneurship",
    sessionTitle: "What we build when we stay",
    expertise: "Long-horizon partnership and founder support",
    biography:
      "Sample biography. Adwoa is written as a partner who backs people willing to remain with a problem. Her conversation looks at capital, craft, and the discipline of staying. This profile is demonstration copy.",
    image: "/images/speakers/adwoa.jpg",
    imageAlt: "Illustrative portrait of a smiling woman wearing a patterned headwrap, used for a sample speaker profile.",
    imagePosition: "center 20%",
    featured: false,
    portraitIsIllustrative: true,
  },
];

export function getSpeaker(slug: string): Speaker | undefined {
  return speakers.find((speaker) => speaker.slug === slug);
}

export function getSpeakersByIds(ids: string[]): Speaker[] {
  return ids.map((id) => speakers.find((speaker) => speaker.slug === id)).filter((speaker): speaker is Speaker => Boolean(speaker));
}

export function featuredSpeakers(): Speaker[] {
  return speakers.filter((speaker) => speaker.featured);
}

export function isSpeakerCategory(value: string): value is SpeakerCategory {
  return speakerCategories.includes(value as SpeakerFilter) && value !== "All";
}
