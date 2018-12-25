import firebase from 'firebase';
import df from 'dateformat';

export function createDelivery(data){
    return dispatch=>{
        const rootRef=firebase.database().ref();
        const ordersRef=rootRef.child('orders');
        const today=df(new Date(),'yyyy-mm-dd HH:MM:ss');
        const {order,userId,email}=data;
        let dateMessy=order.scheduled? order.date: today;
        console.log('type: ',order.type);
        let date=df(dateMessy,'yyyy-mm-dd HH:MM:ss');
        const orderCreation=ordersRef.push({
            created_date: today,
            customer: email,
            _status: 0,
            ...order,
            date
        });
        const orderKey=orderCreation.key;
        // Astro assignation logic
            // we will manually assign for now
        // const astros=rootRef.child('astros');
        // const astroAssign=astros.once('value',snap=>{
        //     const astroId=snap.val();
        // })
        // .then(r=>{
        //     const ordersReqsRef=rootRef.child(`orderesRequests/${orderKey}_${r.id}`);
        //     // const orderReqsCreate=ordersReqsRef.set({
        //     //     customer: userId[0]
        //     // });
        //     return ordersReqsRef;
        // });
        // const ordersReqsRef=rootRef.child(`ordersRequests/${orderKey}`);
        // const orderReqsCreate=ordersReqsRef.set({
        //     customer: email,
        //     taken: 0,
        //     date,
        //     _status: 0
        // });
        const ordersSchRef=rootRef.child(`ordersScheduled/${orderKey}`);
        const ordersSchCreate=ordersSchRef.set({
            customer: email,
            type: order.type,
            date,
            _status:0
        })
        return orderKey;


    }
};
