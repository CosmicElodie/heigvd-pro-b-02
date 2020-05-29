# heigvd-pro-b-02

# Collaborative annotation of historical images

An application for collaboratively tagging and annotating historical
images from the canton of Vaud.

This software was developed as semester project (PRO) at HEIG-VD,
academic year 2019/20.

Development team:

| Name                                    | Email                        |    Github     |
|-----------------------------------------|------------------------------|---------------|
| Elodie Lagier                           | elodie.lagier@heig-vd.ch     | CosmicElodie  |
| Guillaume Valvona (project lead)       | guillaume.valvona@heig-vd.ch | Linois        |
| Michael Triponez                        | michael.triponez@heig-vd.ch  | mikeDTr |
| Christophe Junod                        | christophe.junod@heig-vd.ch  | JunodChristophe |
| Dalia Maillefer (deputy project lead)   | dalia.maillefer@heig-vd.ch   | AliceThunderWind |
| Stefan Teofanovic 					  | stefan.teofanovic@heig-vd.ch | Ovich |

## Dependencies

	Running the react website requires you to have these programs installed beforehand

	- Maven (if you want ressource refreshing)
	- NodeJS
	- Java jdk

	IntelliJ Ultimate can be used instead of maven to run the API but won't support ressource refreshing


## Build and install

### Standard installation
	1. Clone the repository.
	2. Open a terminal window in the "/api" folder.
	3. Run the api with Maven using the following command (preferably in backgroud):
		mvn clean spring-boot:run
	4. Open an other terminal (if you didn't run the previous command in background) and browse to "/web/src" then run the following commands:
		npm install
		npm start

### IntelliJ Ultimate installation

	1. Clone the repository.
	2. From IntelliJ Ultimate, open the pom.xml found in the "/api" folder.
	3. Once the project is imported, create a new run configuration.
	4. Select spring-boot and use "entry.DevApplication" as main class.
	5. Build and run the program.
	6. Open a terminal and browse to "/web/src" then run the following commands:
		npm install
		npm start

### Without maven installation

	1. Clone the repository.
	2. From IntelliJ Ultimate, open the pom.xml found in the "/api" folder.
	3. Once the project is imported, create a new run configuration.
	4. Select spring-boot and use "entry.DevApplication" as main class.
	5. Build and run the program.
	6. Open a terminal and browse to "/web/src" then run the following commands:
		npm install
		npm start
	
## Run

	If everything's done right, 
	the website should run on http://localhost:3000,
	and the API on http://localhost:8080,
	by default.
	An online version is available on http://heigforum.wanarie.com/

## Documentation

Documents Available https://drive.google.com/drive/u/0/folders/1S5gchS3lko_X4oZgnsGqHrhlc9-seslg
Online website Available on http://heigforum.wanarie.com/
