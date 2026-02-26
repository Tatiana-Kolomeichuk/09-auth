import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { FetchTagNote } from "@/types/note";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `${tag}`,
    description: `Page for ${tag} tag`,
    openGraph: {
      title: `${tag}`,
      description: `Page for ${tag} tag`,
      url: 'https://08-zustand-gray-zeta.vercel.app/',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'logo',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = (slug?.[0] ?? "all") as FetchTagNote;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: async () => {
      return fetchNotes({ page: 1, search: tag });
    },
  });
  return (
    <main className={css.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient  tag={tag}/>
      </HydrationBoundary>
    </main>
  );
}
