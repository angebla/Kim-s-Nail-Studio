const { useState: useStateA, useEffect: useEffectA } = React;

const PAGES = {
  home: HomePage,
  treatments: TreatmentsPage,
  about: AboutPage,
  book: BookingPage,
  contact: ContactPage,
};

function App() {
  const [page, setPageRaw] = useStateA("home");

  const setPage = (p) => {
    setPageRaw(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[page] || HomePage;

  return (
    <>
      <Header page={page} setPage={setPage} />
      <main>
        <PageComponent setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
