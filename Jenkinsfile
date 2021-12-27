pipeline {
  agent any
  stages {
    stage('Checkout Scm') {
      steps {
        git(url: 'git@bitbucket.org:krocon/fnf.git', credentialsId: 'unraid-bitbucket-fnf')
      }
    }

    stage('Build') {
      steps {
        sh '''
node --version
npm --version
npm install --force
npm run build-api
npm run build'''
      }
    }

  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '2'))
  }
}
