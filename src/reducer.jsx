export default function reducer(state, action) {
  switch (action.type) {
    case "add": {
      let newS = [action.payload, ...state];

      return newS;
    }
    case "remove": {
      const { id } = action.payload;
      let newState = state.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
      return newState;
    }
    case "edit": {
      const { id, invoice: newInvoice } = action.payload;
      let newState = state.map((item) => {
        if (item.id == id) {
          return newInvoice;
        } else {
          return item;
        }
      });
      return newState;
    }
    case "mkap": {
      const { id } = action.payload;
      let newState = state.map((item) => {
        if (item.id == id) {
          let newInvoice = { ...item, status: "paid" };
          return newInvoice;
        } else {
          return item;
        }
      });
      return newState;
    }
  }
}
