pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'logmoon'
        BACK_IMAGE  = "${DOCKERHUB_USER}/benaissaamenallah-5ds8-gestiondesprojets-backend"
        FRONT_IMAGE = "${DOCKERHUB_USER}/benaissaamenallah-5ds8-gestiondesprojets-frontend"
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t $BACK_IMAGE:$BUILD_NUMBER -t $BACK_IMAGE:latest ./backend'
                sh 'docker build -t $FRONT_IMAGE:$BUILD_NUMBER -t $FRONT_IMAGE:latest ./frontend'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                        usernameVariable: 'U', passwordVariable: 'P')]) {
                    sh 'echo $P | docker login -u $U --password-stdin'
                    sh 'docker push $BACK_IMAGE --all-tags'
                    sh 'docker push $FRONT_IMAGE --all-tags'
                }
            }
        }
    }
}
