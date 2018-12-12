import firebase from 'firebase';

export function createDelivery(data){
    return dispatch=>{
        const rootRef=firebase.database().ref();
        const ordersRef=rootRef.child('orders');
        const today=new Date();
        const {point_a,point_b,contact_name,contact_phone,required_time,scheduled,deliver_ts,comments,email,userId}=data;
        const orderCreation=ordersRef.push({
            type: 'pd',
            created_ts: today,
            point_a,
            point_b,
            contact_name,
            contact_phone,
            required_time,
            scheduled,
            deliver_ts,
            comments,
            [userId]: email
        });
        const orderKey=orderCreation.key;
        const ordersMappingRef=rootRef.child(`ordersMapping/${orderKey}`);
        const orderMappingCreate=ordersMappingRef.set({
            customer: userId[0]
        });
        return orderMappingCreate;
    }
};
