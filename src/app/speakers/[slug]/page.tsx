import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sessions } from "@/data/schedule";
import { getSpeaker, speakers } from "@/data/speakers";
import { Container } from "@/components/shared/Container";
import { DemoNotice } from "@/components/shared/DemoNotice";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo/structured-data";

export function generateStaticParams() {
  return speakers.map((speaker) => ({ slug: speaker.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const speaker = getSpeaker(slug);
  if (!speaker) return {};
  return pageMetadata({
    title: speaker.name,
    description: `${speaker.title} at ${speaker.organization}. Demonstration profile for ${speaker.sessionTitle}.`,
    path: `/speakers/${speaker.slug}`,
  });
}

export default async function SpeakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const speaker = getSpeaker(slug);
  if (!speaker) notFound();
  const appearances = sessions.filter((session) => session.speakerIds.includes(speaker.slug));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Speakers", path: "/speakers" },
          { name: speaker.name, path: `/speakers/${speaker.slug}` },
        ])}
      />
      <article className="bg-ivory">
        <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="relative aspect-[3/4] overflow-hidden bg-forest lg:col-span-5">
            <Image
              src={speaker.image}
              alt={speaker.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: speaker.imagePosition }}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">{speaker.category}</p>
            <h1 className="mt-3 font-display text-5xl leading-none text-midnight sm:text-6xl">{speaker.name}</h1>
            <p className="mt-4 text-lg text-charcoal/80">
              {speaker.title}
              <span className="text-stone"> · </span>
              {speaker.organization}
            </p>
            <div className="mt-6">
              <DemoNotice>Demonstration profile. This is not a confirmed speaker, and the portrait is illustrative stock photography.</DemoNotice>
            </div>
            <p className="mt-6 text-base leading-7 text-charcoal/85">{speaker.biography}</p>
            <p className="mt-6 text-sm text-midnight">
              <span className="text-stone">Session. </span>
              {speaker.sessionTitle}
            </p>
            <p className="mt-2 text-sm text-charcoal/75">{speaker.expertise}</p>
            {speaker.profileUrl ? (
              <p className="mt-4">
                <a href={speaker.profileUrl} className="text-sm font-semibold underline" rel="noreferrer">
                  Professional profile
                </a>
              </p>
            ) : (
              <p className="mt-4 text-sm text-stone">No external profile is linked, because none has been confirmed.</p>
            )}
            <div className="mt-8">
              <h2 className="font-display text-3xl text-midnight">On the programme</h2>
              <ul className="mt-4 space-y-3">
                {appearances.map((session) => (
                  <li key={session.id}>
                    <Link href={`/schedule#${session.id}`} className="text-sm underline decoration-gold underline-offset-4">
                      {session.title}
                    </Link>
                    <span className="text-sm text-stone"> · {session.start}–{session.end}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8">
              <Link href="/speakers" className="text-sm font-semibold text-forest underline decoration-gold underline-offset-4">
                Back to speakers
              </Link>
            </p>
          </div>
        </Container>
      </article>
    </>
  );
}
