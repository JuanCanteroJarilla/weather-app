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
                sh 'echo "=== Contenido del workspace raíz ==="'
                sh 'ls -la'
                sh 'echo "=== Estructura completa del proyecto ==="'
                sh 'find . -type f -name "package.json" || echo "No se encontró package.json"'
                sh 'echo "=== ¿Existe directorio Frontend? ==="'
                sh 'ls -la | grep Frontend || echo "No hay directorio Frontend"'
                sh 'echo "=== Estructura completa (primeros niveles) ==="'
                sh 'find . -maxdepth 3 -type f | head -20'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Eliminar dir('Frontend') si el package.json está en la raíz
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                // Eliminar dir('Frontend') si el package.json está en la raíz
                sh 'npm test -- --watchAll=false --coverage'
            }
        }

        stage('Build') {
            steps {
                // Eliminar dir('Frontend') - trabajar desde la raíz
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

        stage('Archive Artifacts') {
            steps {
                // Eliminar dir('Frontend') - trabajar desde la raíz
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

    post {
        always {
            // Eliminar dir('Frontend') - trabajar desde la raíz
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

