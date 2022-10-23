import { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
} from "@camberi/firecms";

export default function useAuthenticator() {
    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
        user,
        authController
    }) => {

        // Example on editing response based on the user
        if (user?.email?.includes("flanders")) {
            throw Error("Stupid Flanders!");
        }

        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);

        return true;
    }, []);

    return myAuthenticator
}
