import style from './SortOptionsItem.module.css';

function SortOptionsItem({ isSelected, name, option, onSortTodoList }) {
    const styles = [style.li];
    if (isSelected) {
        styles.push(style.selected);
    }
    return <li className={styles.join(' ')} onClick={() => onSortTodoList(option)}>{name}</li>;
}

export default SortOptionsItem;
