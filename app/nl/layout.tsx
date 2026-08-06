import SetHtmlLang from "../components/SetHtmlLang";

export default function DutchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetHtmlLang lang="nl" />
      {children}
    </>
  );
}
