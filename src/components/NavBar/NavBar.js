import Link from "next/link";
import styles from '../../styles/NavBar.module.css';

export default function NavBar() {
	return (
		<>
			<div className={`${styles.navBar}`}>
				<Link href="/" className={`${styles.link}`}>Fototapety</Link>
				<Link href="/roarr" className={`${styles.link}`}>Roarr</Link>
				<Link href="/kitchen" className={`${styles.link}`}>Kuchnia</Link>
				<Link href="/sticker" className={`${styles.link}`}>Naklejki</Link>
			</div>
		</>
	)
}
