pipeline {
    agent any

    environment {
        TEST_REPO = "https://github.com/Faizan12th/selenium-python-tests.git"
        TEST_DIR = "selenium-python-tests"
        REPORT_FILE = "test_report.txt"
    }

    stages {
        stage('Stop and Remove Old Manual Containers') {
            steps {
                echo 'Stopping and removing old containers...'
                sh 'docker stop ecommerce_ci_frontend_a3 || true'
                sh 'docker rm ecommerce_ci_frontend_a3 || true'
                sh 'docker stop ecommerce_ci_backend_a3 || true'
                sh 'docker rm ecommerce_ci_backend_a3 || true'
            }
        }

        stage('Build and Deploy with Docker') {
            steps {
                echo 'Building and deploying Docker containers...'
                sh 'docker-compose -p ecommerce_ci_a3 -f docker-compose.yml up -d --build'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo 'Cloning Selenium test repo...'
                sh 'rm -rf $TEST_DIR'
                sh 'git clone $TEST_REPO'

                echo 'Running tests in Docker container...'
                dir("$TEST_DIR") {
                    sh 'docker build -t selenium-tests .'
                    // Run the tests and save output
                    sh 'docker run --rm selenium-tests > $REPORT_FILE || true'
                    sh 'cat $REPORT_FILE'
                }
            } 
        }

        stage('Send Test Results Email') {
            steps {
                echo 'Sending email with test report...'
                // You must configure Jenkins mailer plugin + SMTP settings
                emailext(
                    subject: 'Selenium Test Report - Assignment 3',
                    body: '''Hello,

Here are the results of the Selenium tests for your latest commit:

${FILE,path="selenium-python-tests/test_report.txt"}

Regards,
Jenkins Pipeline
''',
                    recipientProviders: [[$class: 'CulpritsRecipientProvider']],
                    to: 'faizankhurshid83@gmail.com' // 🔁 Replace with user email or use env var
                )
            }
        }
    }
}
