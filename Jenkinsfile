pipeline {
    agent any
    triggers{
      githubPush()
    }
    environment {
        DEPLOY_PATH = "/var/www/my-site"  // change this to your local server path
    }

    stages {
        stage('Test') {
            steps {
                checkout scm
                echo 'Installing dependencies...'
                sh 'npm ci'
                echo 'Running tests...'
                script {
                    try {
                        sh 'npm run test'
                    } catch (Exception e) {
                        archiveArtifacts artifacts: 'test.json', allowEmptyArchive: true
                        error "Tests failed"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                checkout scm
                echo 'Installing dependencies...'
                sh 'npm ci'
                echo 'Building website...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying site to ${DEPLOY_PATH}..."
                sh """
                    # Ensure the directory exists
                    mkdir -p ${DEPLOY_PATH}
                    # Copy build files to the deploy path
                    cp -r ./dist/* ${DEPLOY_PATH}/
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
