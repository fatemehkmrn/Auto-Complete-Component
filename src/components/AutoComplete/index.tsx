import React from "react";
import "./style.css";

interface IProps {
  options: any[];
  onchange?: () => {};
}
interface IState {
  filteredOptions: string[];
  inputValue: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAction extends Partial<IState> {}
function reducer(state: IState, action: IAction): IState {
  return { ...state, ...action };
}
const initialState = () => ({ inputValue: "", filteredOptions: [] } as IState);

const AutoComplete: React.FC<IProps> = props => {
  const [store, dispatch] = React.useReducer(reducer, initialState());

  function inputHandler(e: any) {
    const value = e.target.value;
    let filteredOptions = [];
    if (value.length !== 0) {
      const regex = new RegExp(`^${value}`, "i");
      filteredOptions = props.options.sort().filter(el => regex.test(el));
    }
    dispatch({ filteredOptions: filteredOptions, inputValue: value });
  }
  function setSelectedOption(value: any) {
    dispatch({ inputValue: value, filteredOptions: [] });
  }

  function useOutsideAlerter(ref: any) {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch({ inputValue: "", filteredOptions: [] });
      }
    }

    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  const inputRef = React.useRef(null);
  useOutsideAlerter(inputRef);

  return (
    <div className="autocomplete">
      <h3>Please click below and enter your favorite color:</h3>

      <input onChange={inputHandler} value={store.inputValue} ref={inputRef} />

      {store.filteredOptions.length > 0 ? (
        <ul ref={inputRef}>
          {store.filteredOptions.map(item => (
            <li onClick={() => setSelectedOption(item)}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default AutoComplete;
