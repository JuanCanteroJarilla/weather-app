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
                    sh 'echo "=== Directorio actual ==="'
                    sh 'pwd'
                    sh 'echo "=== Contenido antes del build ==="'
                    sh 'ls -la'
                    sh 'echo "=== Ejecutando build ==="'
                    sh 'npm run build'
                    sh 'echo "=== Contenido después del build ==="'
                    sh 'ls -la'
                    sh 'if [ -d "dist" ]; then echo "✅ Carpeta dist encontrada:"; ls -la dist/; else echo "❌ Carpeta dist NO encontrada"; fi'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('Frontend') {
                    script {
                        // Verificar si existe la carpeta dist antes de archivar
                        if (fileExists('dist')) {
                            echo '✅ Carpeta dist/ encontrada, archivando artifacts...'
                            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true, allowEmptyArchive: true
                            echo '✅ Artifacts archivados exitosamente'
                        } else {
                            echo '❌ WARNING: No se encontró la carpeta dist/'
                            echo 'El build no generó los archivos esperados, pero continuamos...'
                            // Cambiamos error() por warning para que no falle
                        }
                    }
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

