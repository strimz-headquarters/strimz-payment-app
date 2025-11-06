
export default function PaymentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full md:h-[100dvh] bg-white md:max-w-7xl mx-auto md:py-8 py-4">
            {children}
        </section>
    );
}