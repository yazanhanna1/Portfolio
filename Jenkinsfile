pipeline {
    agent any
    stages {
      stage('Checkout') {
        steps {
          checkout scm
        }
      }
      stage('Install Dependencies') {
        steps {
          sh "npm install"
        }
      }
      stage('Build') {
        steps {
          sh "npm run build"
        }
      }
      stage('Test') {
        steps {
          sh "npm run test"
        }
      }
      stage('Deploy') {
        steps {
          sh "echo Test"
        }
      }
    }
    post {
      success {
        echo "Build Success"
      }
      failure {
        echo "Build Failed"
      }
    }
}