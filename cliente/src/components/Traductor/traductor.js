import React, { Component } from "react";
import cookie from "react-cookies";
import { googleTranslate } from "./googleTranslator.js";

class Traductor extends Component {
  state = {
    languageCodes: [],
    language: cookie.load("language") ? cookie.load("language") : "es",
    question: cookie.load("question")
      ? cookie.load("question")
      : "Hola hijos de puta"
  };

  componentDidMount() {
    // carga todas las opciones de lenguajes desde Google Translator

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      setLanguageCodes(languageCodes); 
    });

    const setLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
    console.log(this.state.languageCodes)
  }

  render() {
    const { languageCodes, language, question } = this.state;

    return (
      <div className="traductor">

        {/* select box */}
        <p>
        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
        </p>

        <p>{question}</p>
      </div>
    );
  }

  changeHandler = language => {
    let { question } = this.state;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = transQuestion => {
      if (question !== transQuestion) {
        this.setState({ question: transQuestion });
        cookie.save("question", transQuestion, { path: "/" });
      }
    };



    // traducir la pregunta cuando seleccionas un lenguaje diferente
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };
}


export default Traductor;