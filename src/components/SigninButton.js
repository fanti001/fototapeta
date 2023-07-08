import React from "react";
import {useSession, signIn, signOut} from "next-auth/react";

const SigninButton = () => {
	const {data: session} = useSession()

	if (session && session.user) {
		return (
			<>
				<p>Signed in as {session.user.name} </p>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			<button onClick={() => signIn()}>Sign in</button>
		</>)
}
export default SigninButton;
