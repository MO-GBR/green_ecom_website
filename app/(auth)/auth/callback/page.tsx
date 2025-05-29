export const dynamic = "force-dynamic";

import ClientCartSync from "@/components/ClientCartSync";
import { CurrentUser } from "@/Lib/utils/HandleCurrentUser";
import { redirect } from "next/navigation";
import React from 'react'

const AuthCallBackPage = async () => {
    const user = await CurrentUser();
    if (!user || !user.dbUser?.cart) {
        return redirect("/signin");
    }
    return <ClientCartSync cart={user.dbUser?.cart} />
}

export default AuthCallBackPage