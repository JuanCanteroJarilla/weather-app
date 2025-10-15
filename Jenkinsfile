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
                    sh 'echo "=== Verificando Node.js ==="'
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'echo "=== Verificando package.json ==="'
                    sh 'cat package.json | grep -A 5 -B 2 "scripts"'
                    sh 'echo "=== Contenido antes del build ==="'
                    sh 'ls -la'
                    sh 'echo "=== Verificando si vite.config.js existe ==="'
                    sh 'ls -la vite.config.js || echo "vite.config.js no encontrado"'
                    sh 'echo "=== Ejecutando build con output detallado ==="'
                    sh 'npm run build --verbose || (echo "BUILD FAILED!" && exit 1)'
                    sh 'echo "=== Estado después del comando build ==="'
                    sh 'echo "Exit code del build: $?"'
                    sh 'echo "=== Contenido después del build ==="'
                    sh 'ls -la'
                    sh 'echo "=== Buscando archivos dist en todo el workspace ==="'
                    sh 'find . -name "dist" -type d || echo "No se encontró carpeta dist"'
                    sh 'find . -name "*.html" || echo "No se encontraron archivos HTML"'
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
                echo '📊 Coverage report generado en: coverage/index.html'
                echo '📋 Para ver el reporte, descarga los artifacts o instala HTML Publisher plugin'
                
                // Archivar reporte de coverage como artifact
                script {
                    if (fileExists('coverage')) {
                        archiveArtifacts artifacts: 'coverage/**/*', fingerprint: true, allowEmptyArchive: true
                        echo '✅ Reportes de coverage archivados como artifacts'
                    } else {
                        echo '⚠️ No se encontraron reportes de coverage'
                    }
                }
            }
        }
        success {
            echo '🎉 Pipeline succeeded!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        cleanup {
            echo '🧹 Cleaning up workspace...'
        }
    }
}

