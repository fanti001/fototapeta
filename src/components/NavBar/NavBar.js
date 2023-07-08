import Link from "next/link";
import styles from '../../styles/NavBar.module.css';
import SigninButton from '../SigninButton';

export default function NavBar() {
	return (
		<>
			<div className={`${styles.navBar}`}>
				<Link href="/" className={`${styles.link}`}>Fototapety</Link>
				{/*<Link href="/shop" className={`${styles.link}`}>All Products</Link>*/}
				{/*<Link href="/cart" className={`${styles.link}`}>Cart</Link>*/}
				<Link href="/roarr" className={`${styles.link}`}>Roarr</Link>
				<Link href="/kitchen" className={`${styles.link}`}>Kuchnia</Link>
				<Link href="/sticker" className={`${styles.link}`}>Naklejki</Link>
				{/*<Link href="/creator" className={`${styles.link}`}>Kreator</Link>*/}
				<SigninButton />
			</div>
		</>
	)
}
