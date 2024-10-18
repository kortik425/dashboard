// import { Dispatch, ReducerAction, useMemo } from "react";

// // Helper function to combine multiple reducers
// export function useReducerCombiner(reducersMap) {
//   // Combine all states into one object
//   const combinedState = useMemo(() => {
//     return Object.fromEntries(
//       Object.entries(reducersMap).map(([key, [state]]) => [key, state])
//     )
//   }, [reducersMap]);

//   // Combine all dispatchers into one function
//   const combinedDispatch = useMemo(() => {
//     return (action) => {
//       Object.values(reducersMap).forEach(([, dispatch]) => {
//         dispatch(action); // Dispatch the same action to all reducers
//       });
//     };
//   }, [reducersMap]);

//   return [combinedState, combinedDispatch];
// }
