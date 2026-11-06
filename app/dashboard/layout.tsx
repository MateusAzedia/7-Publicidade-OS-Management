import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
