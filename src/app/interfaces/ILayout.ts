export interface ILayout<T> {

    toggleItem(item: T): any;
    getSelectedItems(): T[];
}