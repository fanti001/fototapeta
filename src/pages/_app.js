import '@/styles/globals.css'
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

export default function App({
								Component, pageProps: {session, ...pageProps},
							}) {
	return (
		<>
			<NavBar/>
			<Component {...pageProps} />
			<Footer/>
		</>
	)
}
