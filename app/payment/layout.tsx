
export default function PaymentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full md:h-[100dvh] bg-white md:max-w-7xl mx-auto py-8">
            {children}
        </section>
    );
}