const initialState = {
  arr: [
    
  ],
};

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "1":

      return ;

    case "2":

      return ;

    case "3":

      return ;
    case "4":
      
      return ;

    default:
      return state; //сохраняет состояние в память к-ра
  }
};
