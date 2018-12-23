export function objectConvertor(obj){
    let objTemp=[];
    for (let key in obj) {
        let vals=obj[key];
        let objTransformation={
            key,
            ...vals
        }
        objTemp.push(objTransformation);
    }
    return objTemp;
}
