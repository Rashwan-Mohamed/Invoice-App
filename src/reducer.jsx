export default function reducer(state, action) {
  switch (action.type) {
    case "add": {
      let newS = [...state, action.payload];

      return newS;
    }
    case "remove": {
      return state;
    }
    case "edit": {
      return state;
    }
  }
}
