import { useState} from 'react';

/* 

5. Tee React-komponentti (<Lista>), jossa rederöit ul-komponentissa 4:n opiskelijan tiedot. Opiskelijat on talletettava Javascript-taulukkoon 
json-muodossa (kullakin opiskelijalla on seuraavat ominaisuudet: etunimi, sukunimi, aloitusvuosi), voit siis käyttää kovakoodattuja arvoja 
(ja taulukko voi olla talletettu state-muuttujaan tai se voi olla paikallinen muuttuja). Toteuta lisäksi komponentti joka renderoi li-elementin 
(<Rivi>): näytä li-elementissä kustakin opiskelijasta tiedot muodossa: "etunimi, sukunimi, aloitusvuosi". Rivi-komponentti saa rivin tiedot props:na, 
joiden nimet ovat "etunimi", "sukunimi", "aloitusvuosi".

6. Tee React-komponentti (<Taulukko>), joka renderöi html taulukon (table-elementin, käytä otsikolle thead-lohkoa ja riveille tbody-lohkoa). 
Taulukossa on sarakkeet nimi, osoite ja aloitusvuosi ja <Taulukko>-komponentti saa otsikot props:na ("otsikot"), joka on JS-objekti, jolla on em. nimiset kentät. 
Jaa sovellus osiin niin, että taulukon otsikot renderöidaan komponentissa <Otsikko> ja varsinainen data renderöidään komponentissa <TauluRivi> (siis 
TauluRivi-komponentti renderoi KAIKKI rivit, komponentti saa props:na "rivit" taulukkollisen rivejä, Otsikko-komponentti saa props:t "nimi", "osoite", "aloitusvuosi"). 
<Taulukko>-komponentti saa props:na myös ("data") JS-listan objekteista, joilla on siis em. rivit, kovakoodaa listaan vähintään 5 objektia. Testaa 
Taulukko-komponenttia niin, että teet komponentin (<Teht6>), jossa käytät komponenttia (<Taulukko>) niin että annat vaaditut props:t. HUOM! Palauta myös <Teht6>-komponentti.
Komponenttien rakenne on siis seuraava <Teht6> sisältää komponentin <Taulukko> (ja <Teht6>-komponentissa annetaan props:t "data" ja "otsikot" komponentille <Taulukko>). 
<Taulukko>-komponentti käyttää komponentteja <Otsikko> ja <Taulurivi>, siten että komponentille <Otsikko> annetaan  props:t, jotka <Taulukko>-komponentti on saanut 
"otsikot"-propsina ja <Taulurivi>-komponentille annetaan props "rivit", jonka <Taulukko>-komponentti on saanut "data" props:na. 

7. Muuta edellistä tehtävää niin, että renderöit kaksi erillistä taulukkoa (samalle html-sivulle) käyttäen hyväksi edellisen tehtävän-komponentteja 
(<Taulukko>, <Otsikko> ja <TauluRivi>). Toisessa taulukossa on suomenkieliset sarakkeen nimet (edellisen tehtävän otsikot)  ja toisessa englannikieliset 
(name, address, start year), muuten taulukoiden rivien sisältö voi olla sama. Tässä voit käyttää samaa logiikkaa kuin tehtävässä 6 eli renderoi <Teht6> 
komponentin avulla 2 eri taulukkoa. Tässä tehtävässä pitää palauttaa myös <Teht6> komponentti.

8. Lisää tehtäviin 5-7 nappi (Piilota), joka piilottaa kaikki taulukot. Nappi toimii toggle-tyyppisesti eli kun sitä painaa kerran, taulukot häviävät, 
painaa toisen kerran niin taulukot tulevat näkyviin, jne. Toteuta nappi <Teht6>-komponenttiin, jolloin jos teit tehtävän 7, piilottaa nappi KAIKKI taulukot.

*/


function Lista() {
    const opiskelijat = [{etunimi: "Jukka", sukunimi: "Jolkkonen", aloitusvuosi: 2019},{etunimi: "Mikko", sukunimi: "Mallikas", aloitusvuosi: 2020},
    {etunimi: "Teemu", sukunimi: "Tanskanen", aloitusvuosi: 2021},{etunimi: "Erkki", sukunimi: "Romppanen", aloitusvuosi: 2022}];

    
    return(
        <div>
            <Rivi opiskelijat={opiskelijat}/>
        </div>
    )
}

const Rivi = (props) => {
    const opiskelijat = props.opiskelijat;
    const opiskelijatTaulu = opiskelijat.map((a, index) => {
        return <li key={index}>{a.etunimi} {a.sukunimi} {a.aloitusvuosi}</li>
    })
    return(
        <div>
            <ul>{opiskelijatTaulu}</ul>
        </div>
    )
}

function Teht6() {
    const data = [{nimi: "Erkki", osoite: "Torikatu 1", aloitusvuosi: 2015}, {nimi: "Heidi", osoite: "Kauppakatu 1", aloitusvuosi: 2016}, 
    {nimi: "Milla", osoite: "Puijonkatu 3", aloitusvuosi: 2017}, {nimi: "Vesa", osoite: "Tulliportinkatu 7", aloitusvuosi: 2018},{nimi: "Kalle", osoite: "Savilahdentie 8", aloitusvuosi: 2019}]
    const otsikotFin = { nimi: "Nimi", osoite: "Osoite", aloitusvuosi: "Aloitusvuosi" };
    const otsikotEng = { nimi: "Name", osoite: "Address", aloitusvuosi: "Year started" };
    const [naytaTaulukot, setNaytaTaulukot] = useState(true)

    return(
        <div>
            {naytaTaulukot ?
            <div> 
                <Taulukko data={data} otsikot={otsikotFin} naytaTaulukot={naytaTaulukot}/>
                <Taulukko data={data} otsikot={otsikotEng} naytaTaulukot={naytaTaulukot}/>
            </div> : null}
            <button onClick={() => naytaTaulukot ? setNaytaTaulukot(false) : setNaytaTaulukot(true)}>Piilota</button>
        </div>
        
    )
}

const Taulukko = (props) => {
    const data = props.data;
    const otsikot = props.otsikot;
    
    return(
        <div>
            <table>
                <thead><Otsikko otsikot={otsikot}/></thead>
                    <tbody><TauluRivi rivit={data}/></tbody>
            </table>
        </div>
    )
}

const Otsikko = (props) => {
    const otsikot = props.otsikot;

    return(
        <tr><th>{otsikot.nimi}</th><th>{otsikot.osoite}</th><th>{otsikot.aloitusvuosi}</th></tr>
    )
}

const TauluRivi = (props) => {
    const rivit = props.rivit;
    const rivitTaulu = rivit.map((a, index) => {
        return(
            <tr key={index}>
            <td>{a.nimi}</td>
            <td>{a.osoite}</td>
            <td>{a.aloitusvuosi}</td>
            </tr>
        )
    })
    return rivitTaulu;
}

export {Lista,Rivi,Teht6,Taulukko,Otsikko,TauluRivi};