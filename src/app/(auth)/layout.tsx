import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";


export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await validateRequest();

    if (session.user) {
        redirect("/");
    }
    return (

        <div className="w-full">
            {children}
        </div>

    );
}
