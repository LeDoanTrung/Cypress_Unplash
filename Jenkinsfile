pipeline {
    agent any
    
    tools { nodejs "node" }
    
    stages {
        stage('Build') {
            steps {
                git 'https://github.com/LeDoanTrung/Cypress_Unplash'
                 bat 'npm install --force'
            }
        }
        stage('Test') {
            steps {
                       bat 'if exist results rd /s /q results'
                       bat 'if exist mochawesome.json del mochawesome.json'
                        
                       bat 'npm run test:mocha-reporter'
                       bat 'npm run merge-reports'
                       bat 'npm run build-report'

                       bat 'start mochawesome-report\\mochawesome.html'
            }
        }
    }

    post {
        always {
            script {
                
                archiveArtifacts artifacts: 'mochawesome-report/*.html', allowEmptyArchive: true
                
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'mochawesome-report',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
            }
        }
        success {
            script {
                
                echo 'Build succeeded!'
                
                emailext(
                    subject: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: "Good news! The build ${env.JOB_NAME} #${env.BUILD_NUMBER} was successful. Check the report at ${env.BUILD_URL}mochawesome-report/mochawesome.html",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
        failure {
            script {
                
                echo 'Build failed!'
            
                emailext(
                    subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: "Unfortunately, the build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed. Check the report at ${env.BUILD_URL}mochawesome-report/mochawesome.html",
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
    }
}