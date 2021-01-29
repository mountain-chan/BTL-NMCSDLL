pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                sh 'sudo docker-compose build'
                sh 'sudo docker-compose up -d'
            }
        }
    }
}