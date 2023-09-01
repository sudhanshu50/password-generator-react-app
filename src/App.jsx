import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/use-password-generator";
import StrengthChecker from "./components/StrengthChecker/StrengthChecker";
import Button from "./components/Button/Button";
import Checkbox from "./components/Checkbox/Checkbox";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const changeHandler = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMsg, generatePassword } = usePasswordGenerator();

  return (
    <>
    <h1>Password Generator</h1>
      <div className="container">
        {/* password text and cop} */}
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <Button
              text={copied ? "Copied" : "Copy"}
              onClick={handleCopy}
              customClass="copyBtn"
            />
          </div>
        )}
        {/* character length */}
        <div className="charLength">
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            min="4"
            max="20"
            type="range"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>
        {/* checkboxes */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => changeHandler(index)}
                state={checkbox.state}
              />
            );
          })}
        </div>
        {/* strength */}
        <StrengthChecker password={password} />
        {/* error handling */}
        {errorMsg && <div className="errorMsg">{errorMsg}</div>}

        {/* generate button */}
        <Button
          text="Generate Password"
          onClick={() => {
            generatePassword(checkboxData, length);
          }}
          customClass="generateBtn"
        />
      </div>
    </>
  );
}

export default App;
