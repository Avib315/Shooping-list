import "./InputComponent.css";
import React, { useState, useRef , useImperativeHandle  } from 'react';

const InputComponent = React.forwardRef(({ placeHolder = "",isRequired = false, type = "text", isConvertToHebrew = true, handleInputBlur, setValueFunc }, ref) => {
  const [inputText, setInputText] = useState('');
  if (type !== "text") {
    isConvertToHebrew = false;
  }
  const inputRef = useRef(null);

  const resetInput = () => {
    if (inputRef.current) {
      setInputText("");
      inputRef.current.value = '';
    }
  };

  useImperativeHandle(ref, () => ({
    resetInput: resetInput
  }));
  const EnglishToHebrewMap = {
    ",": "ת",
    ";": "ף",
    ".": "ץ",
    "a": "ש",
    "b": "נ",
    "c": "ב",
    "d": "ג",
    "e": "ק",
    "f": "כ",
    "g": "ע",
    "h": "י",
    "i": "ן",
    "j": "ח",
    "k": "ל",
    "l": "ך",
    "m": "צ",
    "n": "מ",
    "o": "ם",
    "p": "פ",
    "q": "/",
    "r": "ר",
    "s": "ד",
    "t": "א",
    "u": "ו",
    "v": "ה",
    "w": "'",
    "x": "ס",
    "y": "ט",
    "z": "ז",
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (isConvertToHebrew) {
      const translatedText = translateToHebrew(newText.toLowerCase());
      setInputText(translatedText);
      return;
    }
    setInputText(newText);
    setValueFunc(newText);
  };

  const translateToHebrew = (text) => {
    const letter = text
      .split('')
      .map((char) => (EnglishToHebrewMap[char] ? EnglishToHebrewMap[char] : char))
      .join('');
    if (setValueFunc) {
      setValueFunc(letter);
    }
    return letter;
  };

  return (
    <>
      <label className="InputComponent">
        <input
          type={type}
          placeholder={placeHolder}
          onChange={handleInputChange ? handleInputChange : null}
          onBlur={handleInputBlur ? handleInputBlur : null}
          value={inputText}
          ref={inputRef}
          required={isRequired}
          maxLength="40"
        />
        <p className="placeHolder">
          {placeHolder}
        </p>
      </label>
    </>
  );
});

export default InputComponent;