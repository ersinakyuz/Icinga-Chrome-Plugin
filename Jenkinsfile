pipeline {
  agent any
  stages {
    stage('qa') {
      steps {
        mail(subject: 'QA Deploy starting', body: 'for branch ... ', from: 'admin@jenkins', to: 'ersin.akyuez@eqs.com')
      }
    }
  }
}