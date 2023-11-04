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
          sh "curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -"
          sh "apt-get install -y nodejs"
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