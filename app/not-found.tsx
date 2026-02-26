
import css from './page.module.css'
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'Page is not found',
   openGraph: {
      title: 'Not found',
      description: 'Page is not found',
       url: 'https://08-zustand-gray-zeta.vercel.app/',
      siteName: 'NoteHub',
      images: [
        {
          url:  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Note Hub Open Graph Image',
        },
      ],
    }
};
export default function NotFound() {
  return (
      <div className={css.main}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/notes/filter/all">Go to notes</Link>
    </div>
  );
}