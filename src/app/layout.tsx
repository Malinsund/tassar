export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <header>
          <h1>Min Next.js App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
