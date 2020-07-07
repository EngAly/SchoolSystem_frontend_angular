export default class Utils {
    /**
     * get array of names only
     * @param data :raw data handled from server
     */
    static getNames(data: Array<any>) {
        let names = [];
        data.forEach(record => names.push(record.name))
        return names;
    }

    /**
   * extract all selected names only without id  
   * and return all names
   * @param records 
   */
    static getSelectedNames(items: Array<any>) {
        let selectedNames = [];
        items.filter(item => item.isDone).forEach(item => {
            selectedNames.push(item.name);
        });
        return selectedNames;
    }
}