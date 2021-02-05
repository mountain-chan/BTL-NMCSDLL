pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}