pipeline {
    agent any

    stages {
        stage('Stop and Remove Old Manual Containers') {
            steps {
                echo 'Stopping and removing old manual containers if they exist...'

                // Stop and remove ecommerce-app-a2_frontend_1
                sh 'docker stop ecommerce_ci_frontend || true'
                sh 'docker rm ecommerce_ci_frontend || true'

                // Stop and remove ecommerce-app-a2_backend_1
                sh 'docker stop ecommerce_ci_backend || true'
                sh 'docker rm ecommerce_ci_backend || true'
            }
        }

        stage('Build and Deploy with Docker') {
            steps {
                echo 'Building and deploying Docker containers for ecommerce_ci project...'
                sh 'docker-compose -p ecommerce_ci -f docker-compose.yml up -d --build'
            }
        }
    }
}

