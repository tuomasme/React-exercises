/* 

33. Tee ao. kuvan mukainen React-sovellus (sovellukseen riittää tehdä vain layout siten, että sovelluksessa on 5 komponenttia, yksi jokaiseen "laatikkoon"). 
Komponentit ovat: <Header>, <Footer>, <LeftSide>, <Center> ja <RightSide>, nimistä selviää mihin kukin komponentti sijoitetaan. 
Tee lisäksi komponentti <Teht33>, joka sisältää siis em. komponentit.

*/

const Teht33 = () => {
    <div style={{display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gridTemplateRows: "1fr 3fr 3fr"}}>
        <Header/>
        <LeftSide/>
        <Center/>
        <RightSide/>
        <Footer/>
    </div>
}

const Header = () => {
    return <div style={{width: "auto", textAlign: "center", gridArea: "1 / 1 / 1 / 4"}}>
        <p>Welcome to main page of Savonia AMK</p>
    </div>
}

const LeftSide = () => {
    return <div style={{width: "auto", textAlign: "left"}}>
        <p>Please log in!</p>
    </div>
}

const Center = () => {
    return <div style={{width: "auto", textAlign: "left" }}>
        <p>Introduction of our company</p>
    </div>
}
//g
const RightSide = () => {
    return <div style={{width: "auto", textAlign: "left" }}>
        <p>Lot's of info about our company</p>
    </div>
}

const Footer = () => {
    return <div style={{width: "auto", textAlign: "center",  gridArea: "3 / 1 / 3 / 4" }}>
        <p>Copyright by ktkoiju@Savonia</p>
    </div>
}

export {Teht33, Header, Footer, LeftSide, RightSide, Center}
