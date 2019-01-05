
let orders=(state={},action={})=>{
   switch (action.type) {
      case 'SET_SIGNATURE':
         console.log('SET_SIGNATURE: ',action.data);
         return action.data;
      default: return 0;

   }
}

export default orders;
