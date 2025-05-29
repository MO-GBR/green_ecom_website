import { AuthSession } from '@/types';
import { Session } from "next-auth";

export function ProtectSession(session: Session | null): asserts session is Session & AuthSession {
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized: Missing user email in session");
    }
};