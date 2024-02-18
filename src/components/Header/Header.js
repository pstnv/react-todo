import style from './Header.module.css';

function Header() {
    return (
        <header className={style.header}>
            <span className={style.grey}>Your</span>
            <span>Notes</span>
        </header>
    )
}

export default Header;