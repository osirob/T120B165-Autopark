# T120B165-Autopark

## 1. Sprendžiamo uždavinio aprašymas
### 1.1. Sistemos paskirtis
Projekto tikslas - sukurti interneto svetainę, kurioje naudotojai galėtu lengvai surasti patinkantį automobilį pagal skelbimus.
Greitam automobilių radimui bus pasirinkimas naudoti paiešką suvedus raiktinius žodžius arba naudojant filtrus. Po skelbimais naudotojai galės palikti komentarus apie automobilį (pvz. paklausti kažką apie automobilį). Kad sumažinti tikimybę įsigyti automobilį su defektais, automobiliai kurie buvo neseniai parduoti bus pažymimi kaip potencialiai brokuoti.

Svečias, neturintis paskyros galės peržiūrėti skelbimus, bei užsiregistruoti tinklapyje. Administratorius bus atsakingas už netinkamų skelbimų trynimą, naudotojo teisių moderavimą. Naudotojas galės kurti, redaguoti ir tyrinti automobilių skelbimus, komentuoti, pežiūrėti kitus skelbimus.

Projektą sudarys dvi dalys. Pirma - internetinė aplikacija, kurią naudos svečiai, administratoriai ir paprasti naudotojai. Antra - serverio logika, kuri tarpininkaus tarp internetinės aplikacijos ir duomenų bazės.

### 1.2. Funkciniai reikalavimai
Svečias galės:
- Peržiūrėti automobilių skelbimus
- Prisiregistruoti

Naudotojas galės:
- Prisijungti
- Atsijungti
- Kurti automobilio skelbimą
- Redaguoti automobilio skelbimą
- Ištrinti automobilio skelbimą
- Komentuoti po skelbimais

Administratorius galės:
- Prisijungti
- Atsijungti
- Peržiūrėti automobilių skelbimus
- Ištrinti betkurį skelbimą
- Uždrausti naudotojui kurti naujus skelbimus

## Sistemos architektūra
Sistema sudarys:
- Kliento aplikacija - naudojant Angular
- Serverio pusė - naudojant .Net Core Web Api ir duomenų bazė Microsoft SQL Server

Sistėmos talpinimui bus naudojamas Azure/AWS.
