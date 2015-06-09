compass_watch:
	bundle exec compass watch

compass_build:
	bundle exec compass compile -e production --force

meteor:
	meteor	

dev: compass_watch meteor

