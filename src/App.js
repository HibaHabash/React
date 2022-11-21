/* eslint-disable no-unused-vars */
import './App.css';
import DropDown from "./DropDown";

function App() {

  const options = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Belgium", label: "Belgium" },
    { value: "Côted'Ivoire", label: "Côte d'Ivoire" },
    { value: "CaboVerde", label: "Cabo Verde" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Colombia", label: "Colombia" },
    { value: "China", label: "China" },
    { value: "Denmark", label: "Denmark" },
    { value: "Dominica", label: "Dominica" },
    { value: "Egypt", label: "Egypt" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Greece", label: "Greece" },
    { value: "Haiti", label: "Haiti" },
    { value: "HolySee", label: "Holy See" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Italy", label: "Italy" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Maldives", label: "Maldives" },
    { value: "Malta", label: "Malta" },
    { value: "Mexico", label: "Mexico" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Namibia", label: "Namibia" },
    { value: "NewZealand", label: "New Zealand" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palestine", label: "Palestine" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Qatar", label: "Qatar" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "SaudiArabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Spain", label: "Spain" },
    { value: "Sudan", label: "Sudan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Thailand", label: "Thailand" },
    { value: "Togo", label: "Togo" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "UnitedArabEmirates", label: "United Arab Emirates" },
    { value: "UnitedStatesofAmerica", label: "United States of America" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" }
  ];

  return (
    <div className="App">
      <DropDown
        options={options}
      />
    </div>
  );
}

export default App;
