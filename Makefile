setup:
	npm install
	docker run --name mongonode -p 27017:27017 -d -t mongo

run:
	npm run start