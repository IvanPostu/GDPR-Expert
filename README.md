# GDPR Expert

## Application screens:

<img src="./screens/Screenshot_2021-03-11_17-54-12.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-54-35.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-55-19.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-56-06.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-56-48.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-57-16.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-57-40.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-58-38.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-58-54.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_17-59-34.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-00-07.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-01-37.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-02-20.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-03-29.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-03-47.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-04-18.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-05-56.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-06-16.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-08-22.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-09-08.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-09-40.png" alt="drawing"  height="400" />
<img src="./screens/Screenshot_2021-03-11_18-09-59.png" alt="drawing"  height="400" />
<img src="./screens/db.png" alt="drawing"  height="400" />

## Desktop:

### Requirements

1. node
2. npm
   
#### Edit file: gdpr-expert-desktop/src/app/constants/webServerUrl.ts

### Build desktop application

```bash
$ cd gdpr-expert-desktop/
$ npm install
$ nm run test
$ npm run package:linux
$ npm run package:win32
$ cd ..
```

## Web:

### Requirements

1. JDK-8
2. Tomcat Server
3. Postgres
   
### Build web application

```bash
$ cd gdpr-expert-web/
$ ./gradlew war
```

### Database migration

#### Edit file: flyway.properties


```bash
$ cd gdpr-expert-web/
$ ./gradlew flywayMigrate -PmigrationType=default # for application database
$ ./gradlew flywayMigrate -PmigrationType=test # for tests database
```

### Run web application
```bash
$ cp ./build/libs/gdpr-expert-web.war <path-to-tomcat>/webapps
$ bash <path-to-tomcat>/bin/startup.sh
```



