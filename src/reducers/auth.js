let initalState={
    userId: null,
    fname:null,
    lname:null,
    company:null,
    email: null,
    phoneNumber: null,
    isLogged: 0
};

let auth=(state=initalState,action={})=>{
    switch (action.type) {
        case 'SET_AUTH':
            const {fname,lname,company,email,phone_number,userId}=action.data;
            // localStorage.setItem('AUTH',JSON.stringify(action.data));
            return {
                fname,
                lname,
                company,
                email,
                phoneNumber: phone_number,
                isLogged: 1,
                userId
            };
        case 'SET_NOT_LOGGED':
            return null;
        default: return state;

    }
}

export default auth;
