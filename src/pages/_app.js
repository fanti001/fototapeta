import {SessionProvider} from "next-auth/react";
import '@/styles/globals.css'
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

export default function App({
								Component, pageProps: {session, ...pageProps},
							}) {
	return (

			<SessionProvider session={session}>
				<NavBar/>
				<Component {...pageProps} />
				<Footer/>
			</SessionProvider>

	)
}
