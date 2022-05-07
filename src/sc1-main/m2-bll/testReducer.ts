type InitStateType = typeof initState;

const initState = {};

type TestActionType = ReturnType<typeof testAC>;

export const testAC = () => ({type: "TEST-ACTION"} as const);

export const testReducer = (state: InitStateType = initState, action: TestActionType): InitStateType => {
  switch (action.type) {
    case "TEST-ACTION":
      return {...state};
    default:
      return state;
  }
};
