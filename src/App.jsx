import { useEffect, useState } from 'react';
import Header from './components/Header';
import Credentialing from './components/Credentialing';
import LandingPage from './components/LandingPage';

function readCompanyId() {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('empresa');
  if (queryId && /^[a-z0-9-]{2,64}$/i.test(queryId)) return queryId.toLowerCase();

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const route = window.location.pathname.replace(basePath, '').replace(/^\/+|\/+$/g, '');
  const match = route.match(/^empresa\/([a-z0-9-]{2,64})$/i);
  return match ? match[1].toLowerCase() : null;
}

export default function App() {
  const [companyId, setCompanyId] = useState(readCompanyId);

  useEffect(() => {
    const syncCompany = () => setCompanyId(readCompanyId());
    window.addEventListener('popstate', syncCompany);
    return () => window.removeEventListener('popstate', syncCompany);
  }, []);

  const enterCompany = (id) => {
    const url = new URL(window.location.href);
    url.pathname = import.meta.env.BASE_URL;
    url.search = `?empresa=${encodeURIComponent(id)}`;
    url.hash = '';
    window.history.pushState({}, '', url);
    setCompanyId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    const url = new URL(window.location.href);
    url.pathname = import.meta.env.BASE_URL;
    url.search = '';
    url.hash = '';
    window.history.pushState({}, '', url);
    setCompanyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100">
      {companyId ? (
        <>
          <Header companyId={companyId} onHome={goHome} />
          <main className="px-4 py-8 sm:py-12">
            <Credentialing key={companyId} companyId={companyId} />
          </main>
        </>
      ) : (
        <LandingPage onEnterCompany={enterCompany} />
      )}
    </div>
  );
}
