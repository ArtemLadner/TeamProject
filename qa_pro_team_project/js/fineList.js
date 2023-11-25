"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey) {
    const key = searchKey.toLowerCase();
    const result = [];

    for (let i = 0; i < DB.length; i++) {
        if (
            DB[i].номер.toLowerCase().includes(key) ||
            DB[i].тип.toLowerCase().includes(key)
        ) {
            result[result.length] = DB[i];
        }
    }

    return result;
}