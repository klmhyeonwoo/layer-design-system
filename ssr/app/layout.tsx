import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Layer-ui | SSR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: "2em 3em" }}>
        <h1>Layer-ui | SSR</h1>
        <div style={{ display: "flex", columnGap: "5em" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
            <Link style={{ border: "1px solid black", borderRadius: "0.5em", padding: "0.2em 1em", backgroundColor: "#cccccc" }} href="/button">
              Button
            </Link>
            <Link style={{ border: "1px solid black", borderRadius: "0.5em", padding: "0.2em 1em", backgroundColor: "#cccccc" }} href="/modal">
              Modal
            </Link>
          </div>
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
