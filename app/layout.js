import "./globals.css";

export const metadata = {
  title: "Tweet Optimizer",
  description: "AI tweet copy optimizer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
