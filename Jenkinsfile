pipeline {
	agent { node { label 'onz-explorer' } } 
	environment { 
		ONZ_VERSION = '0.9.14'
		//
		EXPLORER_PORT = "604$EXECUTOR_NUMBER"
		ONZ_HOST = 'localhost'
		REDIS_DB = "$EXECUTOR_NUMBER"
		REDIS_HOST = 'localhost'
  }
	stages {
		stage ('Build dependencies') {
			steps {
				sh 'npm install'
    }
      }
		stage ('Run ESLint') {
			steps {
				sh 'npm run eslint'
    }
      }
		stage ('Build bundles') {
			steps {
				sh 'npm run build'
    }
		}
		stage ('Build candles') {
			steps {
				// marketwatcher needs to be enabled to builds candles
        sh '''
        cp test/config.test ./config.js
				grunt candles:build
        '''
      }
    }
		stage ('Start Onz') {
			steps {
				dir("$WORKSPACE/$BRANCH_NAME/") {
					ansiColor('xterm') {
        sh '''
						rsync -axl --delete ~/onz-docker/examples/development/ ./
						cp ~/blockchain_explorer.db.gz ./blockchain.db.gz
						make coldstart
        '''
						// show some build-related info
						sh '''
						sha1sum ./blockchain.db.gz
						docker-compose config
						docker-compose ps
						'''
						// temp.
        sh '''
						docker-compose exec -T onz sed -i -r -e 's/(\\s*"topAccounts":)\\s*false,/\\1 true,/' config.json
						docker-compose restart onz
        '''
      }
    }
			}
		}
    stage ('Start Explorer') {
			steps {
      sh '''
				cd $WORKSPACE/$BRANCH_NAME
				ONZ_PORT=$( docker-compose port onz 10998 |cut -d ":" -f 2 )
				cd -
				ONZ_PORT=$ONZ_PORT node app.js -c config.docker.js -p $EXPLORER_PORT &>/dev/null &
      sleep 20
      '''
      }
    }
    stage ('Run tests') {
			steps {
        sh '''
				sed -i -r -e "s/6040/$EXPLORER_PORT/" test/node.js
				npm run test
        '''
      }
    }
    }
	post {
		always {
			dir("$WORKSPACE/$BRANCH_NAME/") {
				ansiColor('xterm') {
					sh 'docker-compose logs || true'
					sh 'make mrproper'
    }
      }
			archiveArtifacts artifacts: 'logs/*.log', allowEmptyArchive: true
    }
  }
}
