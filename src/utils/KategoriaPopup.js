import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    width: "300",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const KategoriaPopup = (props) => {
  const classes = useStyles();
  const [info, setInfo] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    switch (props.kat) {
      case "I":
        setInfo("Kategoria I – budynki mieszkalne jednorodzinne");
        break;
      case "II":
        setInfo(
          "Kategoria II – budynki służące gospodarce rolnej (produkcyjne, gospodarcze, inwentarsko-składowe)"
        );
        break;
      case "III":
        setInfo(
          "Kategoria III – inne niewielkie budynki, jak: domy letniskowe, budynki gospodarcze, garaże do dwóch stanowisk włącznie"
        );
        break;
      case "IV":
        setInfo(
          "Kategoria IV – elementy dróg publicznych i kolejowych dróg szynowych, jak: skrzyżowania i węzły, wjazdy, zjazdy, przejazdy, perony, rampy"
        );
        break;
      case "V":
        setInfo(
          "Kategoria V – obiekty sportu i rekreacji (stadiony, amfiteatry, skocznie i wyciągi narciarskie, kolejki linowe, odkryte baseny, zjeżdżalnie)"
        );
        break;
      case "VI":
        setInfo("Kategoria VI – cmentarze");
        break;
      case "VII":
        setInfo(
          "Kategoria VII – obiekty służące nawigacji wodnej, jak: dalby, wysepki cumownicze"
        );
        break;
      case "VIII":
        setInfo("Kategoria VIII – inne budowle");
        break;
      case "IX":
        setInfo(
          "Kategoria IX – budynki kultury, nauki i oświaty, jak: teatry, opery, kina, muzea, galerie sztuki, biblioteki, archiwa, domy kultury, budynki szkolne i przedszkolne, żłobki, kluby dziecięce, internaty, bursy i domy studenckie, laboratoria i placówki badawcze, stacje meteorologiczne i hydrologiczne, obserwatoria, budynki ogrodów zoologicznych i botanicznych"
        );
        break;
      case "X":
        setInfo(
          "Kategoria X – budynki kultu religijnego, jak: kościoły, kaplice, klasztory, cerkwie, zbory, synagogi, meczety oraz domy pogrzebowe, krematoria"
        );
        break;
      case "XI":
        setInfo(
          "Kategoria XI – budynki służby zdrowia, opieki społecznej i socjalnej (szpitale, sanatoria, hospicja, przychodnie, poradnie, stacje krwiodawstwa, lecznice weterynaryjne, domy pomocy i opieki społecznej, domy dziecka, domy rencisty, schroniska dla bezdomnych oraz hotele robotnicze"
        );
        break;
      case "XII":
        setInfo(
          "Kategoria XII – budynki administracji publicznej, budynki Sejmu, Senatu, Kancelarii Prezydenta, ministerstw i urzędów centralnych, terenowej administracji rządowej i samorządowej, sądów i trybunałów, więzień i domów poprawczych, zakładów dla nieletnich, zakładów karnych, aresztów śledczych oraz obiekty budowlane Sił Zbrojnych  "
        );
        break;
      case "XIII":
        setInfo("Kategoria XIII – pozostałe budynki mieszkalne ");
        break;
      case "XIV":
        setInfo(
          "Kategoria XIV – budynki zakwaterow.  turystycznego i rekreacyjnego (hotele, motele, pensjonaty, d. wypoczynkowe, schroniska turystyczne)   "
        );
        break;
      case "XV":
        setInfo(
          "Kategoria XV – budynki sportu i rekreacji, jak: hale sportowe|i widowiskowe, kryte baseny   "
        );
        break;
      case "XVI":
        setInfo("Kategoria XVI – budynki biurowe i konferencyjne  ");
        break;
      case "XVII":
        setInfo(
          "Kategoria XVII – budynki handlu, gastronomii i usług (sklepy, centra handl., domy towarowe, hale targowe, restauracje, bary, kasyna, dyskoteki, warsztaty rzemieślnicze, stacje obsługi pojazdów, myjnie samochodowe, garaże powyżej 2  stanowisk, bud. dworcowe)    "
        );
        break;
      case "XVIII":
        setInfo(
          "Kategoria XVIII – budynki przemysłowe (budynki produkcyjne, służące energetyce, montownie, wytwórnie, rzeźnie oraz obiekty magazynowe, jak: budynki składowe, chłodnie, hangary, wiaty, a także budynki kolejowe, jak: nastawnie, podstacje trakcyjne, lokomotywownie, wagonownie, strażnice przejazdowe, myjnie taboru kolejowego)  "
        );
        break;
      case "XIX":
        setInfo(
          "Kategoria XIX – zbiorniki przemysłowe (silosy, elewatory, bunkry do magazynowania paliw i gazów oraz innych produktów chemicznych "
        );
        break;
      case "XX":
        setInfo("Kategoria XX – stacje paliw ");
        break;
      case "XXI":
        setInfo(
          "Kategoria XXI – obiekty związane z transportem wodnym (porty, przystanie, sztuczne wyspy, baseny, doki, falochrony, nabrzeża, mola, pirsy, pomosty, pochylnie)"
        );
        break;
      case "XXII":
        setInfo(
          "Kategoria XXII – place składowe, postojowe, składowiska odpadów, parkingi "
        );
        break;
      case "XXIII":
        setInfo(
          "Kategoria XXIII – obiekty lotniskowe (pasy startowe, drogi kołowania, płyty lotniskowe, place postojowe i manewrowe, lądowiska) "
        );
        break;
      case "XXIV":
        setInfo(
          "Kategoria XXIV – obiekty gospodarki wodnej (zbiorniki wodne i nadpoziomowe, stawy rybne)    "
        );
        break;
      case "XXV":
        setInfo("Kategoria XXV – drogi i kolejowe drogi szynowe ");
        break;
      case "XXVI":
        setInfo(
          "Kategoria XXVI – sieci (elektroenergetyczne, telekomunikacyjne, gazowe, ciepłownicze, wodociągowe, kanalizacyjne oraz rurociągi przesyłowe) "
        );
        break;
      case "XXVII":
        setInfo(
          "Kategoria XXVII – budowle hydrotechniczne piętrzące, upustowe iregulacyjne (zapory, progi i stopnie wodne, jazy, bramy przeciw-powodziowe, śluzy wałowe, syfony, wały przeciwpowodziowe, kanały, śluzy żeglowne, opaski i ostrogi brzegowe, rowy melioracyjne)  "
        );
        break;
      case "XXVIII":
        setInfo(
          "Kategoria XXVIII – drogowe i kolejowe obiekty mostowe (mosty, estakady, kładki, przejścia podziemne, wiadukty, przepusty, tunele)    "
        );
        break;
      case "XXIX":
        setInfo(
          "Kategoria XXIX – wolno stojące kominy i maszty oraz części budowlane elektrowni wiatrowych  "
        );
        break;
      case "XXX":
        setInfo(
          "Kategoria XXX – obiekty służące do korzystania z zasobów wodnych (ujęcia wód morskich i śródlądowych, budowle zrzutów wód i ścieków, pompownie, stacje strefowe, stacje uzdatniania wody, oczyszczalnie ścieków"
        );
    }
  }, [props]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {props.kat + " "}
      <HelpOutlineIcon
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {info}
      </Popover>
    </div>
  );
};

export default KategoriaPopup;
