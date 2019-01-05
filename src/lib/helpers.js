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

export function descriptionTranslator(type){
    let description;
    if(type=='delivery') {
        description={
            type:'Pickup & Delivery',
        };
    }  else if (type=='cash'){
        description={
            type:'Cash Pickup',
        };
    }
    return description;
}

export function statusTranslator(data){
    const {_status,astroName}=data;
    switch (_status) {
        case 0:
            return {
                description: 'Tu pedido fue recibido',
                status: 'Recibido'
            }
        case 1:
            return {
                description: `Tu pedido fue asignado a ${astroName}`,
                status: `Asignado a ${astroName}`
            }
        case 2:
            return {
                description: 'Tu pedido esta siendo realizado',
                status: 'En proceso'
            }
        case 3:
            return {
                description: 'Tu pedido fue completado',
                status: 'Completado'
            }
        default: return 0;
    }
}
