# DevOps-AppGestionDesProjets

Ce dépôt contient un projet **Spring Boot** (backend) et **Angular** (frontend) utilisé dans le cadre du module **DevOps**.  
Il sert de support pratique pour mettre en œuvre un pipeline Jenkins basé sur l'intégration continue (CI) et la livraison continue (CD).

L'objectif principal est de permettre aux étudiants de :
- Configurer un pipeline **SCM** (Source Code Management) avec Jenkins
- Automatiser le **build** du projet (Maven + npm)
- Exécuter des **tests unitaires** (si disponibles)
- Générer un **livrable** déployable

---

## 📁 Structure du projet

```
DevOps-AppGestionDesProjets/
├── backend/          # API REST Spring Boot (Java 17, Maven)
│   ├── src/
│   │   └── main/java/tn/esprit/backend/
│   │       ├── entity/
│   │       ��── repository/
│   │       ├── service/
│   │       └── controller/
│   └── pom.xml
├── frontend/         # Application Angular 22 (Node.js, npm)
│   ├── src/
│   │   └── app/
│   │       ��── models/
│   │       ├── services/
│   │       ├── components/
│   │       └── pages/
│   └── package.json
└── README.md
```

---

## 🧩 Modèle de données

Le projet simule une application de gestion de projets pour une organisation composée d'entreprises, d'équipes et de projets.

| Entité | Description |
|---|---|
| `Entreprise` | Possède un nom et une adresse, regroupe plusieurs équipes |
| `Equipe` | Appartient à une entreprise, a un nom et une spécialité, travaille sur plusieurs projets |
| `Projet` | Sujet de travail partagé entre plusieurs équipes |
| `ProjetDetaille` | Détails techniques d'un projet : technologie, coût provisoire, date de début |

---

## ⚙️ Prérequis

Avant de lancer le projet, vérifier que les outils suivants sont installés :

| Outil | Version minimale | Vérification |
|---|---|---|
| Java JDK | 17 | `java -version` |
| Maven | 3.8+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Angular CLI | 22+ | `ng version` |
| MySQL | 8.0+ | `mysql --version` |

---

## 🗄️ Configuration de la base de données

Le backend se connecte à une base de données **MySQL**.  
Les paramètres de connexion se trouvent dans `backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/test_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

> La base de données `test_db` est créée automatiquement au premier démarrage.  
> Modifier `username` et `password` selon votre configuration MySQL locale.

---

## 🚀 Lancer le projet

### 1. Backend — Spring Boot

```bash
cd backend

# Compiler et lancer
mvn spring-boot:run
```

Le backend démarre sur **http://localhost:8080**

Pour vérifier : ouvrir `http://localhost:8080/entreprise/all` → doit retourner `[]`

### 2. Frontend — Angular

> Ouvrir un **second terminal** sans fermer celui du backend.

```bash
cd frontend

# Installer les dépendances (première fois uniquement)
npm install

# Lancer le serveur de développement
ng serve -o
```

L'application s'ouvre automatiquement sur **http://localhost:4200**

---

## 🔌 Endpoints REST disponibles

### Entreprise — `/entreprise`
| Méthode | URL | Description |
|---|---|---|
| GET | `/entreprise/all` | Lister toutes les entreprises |
| GET | `/entreprise/get/{id}` | Obtenir une entreprise par ID |
| POST | `/entreprise/add` | Ajouter une entreprise |
| PUT | `/entreprise/update` | Modifier une entreprise |
| DELETE | `/entreprise/delete/{id}` | Supprimer une entreprise |

### Equipe — `/equipe`
| Méthode | URL | Description |
|---|---|---|
| GET | `/equipe/all` | Lister toutes les équipes |
| GET | `/equipe/get/{id}` | Obtenir une équipe par ID |
| POST | `/equipe/add` | Ajouter une équipe |
| PUT | `/equipe/update` | Modifier une équipe |
| DELETE | `/equipe/delete/{id}` | Supprimer une équipe |
| PUT | `/equipe/assign-entreprise/{equipeId}/{entrepriseId}` | Affecter une équipe à une entreprise |
| PUT | `/equipe/assign-projet/{equipeId}/{projetId}` | Affecter une équipe à un projet |

### Projet — `/projet`
| Méthode | URL | Description |
|---|---|---|
| GET | `/projet/all` | Lister tous les projets |
| GET | `/projet/get/{id}` | Obtenir un projet par ID |
| POST | `/projet/add` | Ajouter un projet |
| PUT | `/projet/update` | Modifier un projet |
| DELETE | `/projet/delete/{id}` | Supprimer un projet |

### Projet Détaillé — `/projet-detaille`
| Méthode | URL | Description |
|---|---|---|
| GET | `/projet-detaille/all` | Lister tous les projets détaillés |
| GET | `/projet-detaille/get/{id}` | Obtenir un projet d��taillé par ID |
| POST | `/projet-detaille/add` | Ajouter un projet détaillé |
| PUT | `/projet-detaille/update` | Modifier un projet détaillé |
| DELETE | `/projet-detaille/delete/{id}` | Supprimer un projet détaillé |
| PUT | `/projet-detaille/assign-projet/{pdId}/{projetId}` | Affecter à un projet |

---

## 🔧 Intégration Jenkins (CI/CD)

Ce projet est conçu pour être intégré dans un pipeline Jenkins. Un `Jenkinsfile` peut être ajouté à la racine du dépôt pour automatiser les étapes suivantes :

```
Checkout SCM → Build Backend (mvn) → Tests → Build Frontend (npm) → Archive Artifacts
```

Exemple de pipeline :

```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
            }
        }
    }
}
```

---

## 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| Backend | Spring Boot 4.1.0, Spring Data JPA, Spring Web MVC |
| Base de données | MySQL 8.0 |
| ORM | Hibernate |
| Utilitaires | Lombok |
| Frontend | Angular 22 (Standalone Components) |
| HTTP Client | Angular HttpClient |
| Build backend | Apache Maven |
| Build frontend | npm / Angular CLI |
| CI/CD | Jenkins |
| Conteneurisation | Docker *(à venir)* |

---

## 👤 Auteur

**ESPRIT — UP ASI**  