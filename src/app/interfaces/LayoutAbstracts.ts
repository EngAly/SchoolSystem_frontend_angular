export interface LayoutAbstracts<T> {

    toggleItem(event, item: T): any;
    getSelectedItems(): any;
}