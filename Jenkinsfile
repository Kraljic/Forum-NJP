pipeline {
  agent {
    node {
      label 'Node'
    }

  }
  stages {
    stage('Npm Install') {
      steps {
        powershell 'npm install'
      }
    }

    stage('Npm Start') {
      steps {
        powershell 'npm start'
      }
    }

  }
}