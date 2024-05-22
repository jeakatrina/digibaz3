import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function protectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await validateRequest();

    if (!session.user) {
        redirect("/login");
    }
    return (
        <div>
            {children}
        </div>
    );
}