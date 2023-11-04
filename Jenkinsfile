pipeline {
    agent any
    environment {
      NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    }
    stages {
      stage('Checkout') {
        steps {
          checkout scm
        }
      }
      stage('Install Dependencies') {
        steps {
          sh "curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -"
          sh "sudo apt-get install -y nodejs"
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
          sh "cp -r dist/* /var/www/portfolio/"
          sh "sudo service nginx reload"
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