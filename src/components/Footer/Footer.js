import styles from '../../styles/Footer.module.css';

export default function  Footer() {
	return (
		<footer className={styles.footer}>
			Copyright <span className={styles.brand}>Fototapety</span>{' '}
			{new Date().getFullYear()}
		</footer>
	)
}
