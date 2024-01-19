# SportsCentre Frontend
Dit is de frontend van SportsCentre, de sporttracking- en deelapplicatie ontwikkeld als onderdeel van het individuele project tijdens semester 6 (2022-2023) van de studie Software Engineering aan Fontys Hogescholen Eindhoven. Het frontend-gedeelte van dit project is niet uitgebreid ontwikkeld, omdat de primaire focus lag op het bouwen van de backend-architectuur. De backend repository is [hier](https://github.com/freekvlier/sportscentre-backend) te vinden.

## Technologieën
#### Frontend Framework: Svelte
Voor de frontend van het project is gekozen voor Svelte. Het heeft een lage leercurve, hoge prestaties, goede compatibiliteit, een snelgroeiende community en is snel in ontwikkeling. Dit maakte Svelte een ideale keuze voor het frontend-framework van dit project.

#### Authenticatie
Binnen de authenticatie is opgezet dat gebruikers kunnen inloggen via Microsoft. Na het inloggen wordt een auth-token verkregen en wordt deze meegezonden met API-verzoeken naar de backend. Dit zorgt voor een veilige en geauthenticeerde communicatie tussen de frontend en de backend.

## Installatie
Om de frontend lokaal te draaien, volg je deze stappen:

#### 1. Zorg ervoor dat Node.js is geïnstalleerd.

#### 2. Clone de repository en navigeer naar de frontend-directory
```bash
git clone https://github.com/freekvlier/sportscentre-frontend.git
cd sportscentre-frontend
```

#### 3. Installeer de packages:
```bash
npm install
```

#### 4. Start de ontwikkelingsserver:
```bash
npm run dev
```
Open je browser en ga naar http://localhost:5000 om de SportsCentre frontend te bekijken.


