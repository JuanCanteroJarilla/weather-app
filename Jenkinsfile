pipeline {
    agent any

    tools {
        nodejs 'Node22.14.0'
    }

    stage('Install Dependencies') {
        steps {
            sh 'npm install'
        }
    }

    stage('Run Tests') {
        steps {
            sh 'npm test -- --watchAll=false'
        }
    }
}

