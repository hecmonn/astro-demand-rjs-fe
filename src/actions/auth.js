import firebase from 'firebase';

export function initAuth(){
    const localAuth=JSON.parse(localStorage.getItem('AUTH'));
    console.log('AUTH r: ',localAuth);
    if(localAuth!==null){
        let email=localAuth.email;
        console.log()
        getUser(email);
    } else {
        console.log('Not logged...');
    }
}

// export function initAuth(){
//     return dispatch=>{
//         firebase.auth.onAuthStateChanged(user=>{
//             console.log('initAuth: ',user);
//             if(user) dispatch({'SET_AUTH',data:})
//         });
//     }
//
// }

export function getUser(email){
    return dispatch=>{
        const user=firebase.database().ref('users').orderByChild('email').equalTo(email);
        return user.once('value',snap=>{
            let userData=snap.val();
            let userId=Object.keys(userData);
            let userInfo=Object.values(userData)[0];
            dispatch({type:'SET_AUTH',data:{...userInfo,userId}})
        })
        .catch(err=>console.error('Err getUser: ',err));
    }

}
