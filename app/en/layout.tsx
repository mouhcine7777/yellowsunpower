import SetHtmlLang from "../components/SetHtmlLang";

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SetHtmlLang lang="en" />
      {children}
    </>
  );
}
