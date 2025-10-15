/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    tools {
        nodejs 'Node22.14.0'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('Frontend') {
                    sh 'npm test -- --watchAll=false --coverage'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('Frontend') {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
    }

    post {
        always {
            dir('Frontend') {
                // Solo mantener reporte de coverage HTML (opcional)
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'coverage/lcov-report',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ])
            }
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

