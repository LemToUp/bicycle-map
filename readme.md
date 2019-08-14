openssl req -newkey rsa:2048 -sha256 -nodes -keyout server.key -x509 -days 365 -out server.pem -subj "/C=BY/ST=Belarus/L=Minsk/O=LemToUp/CN=www.lemtoup.xyz"

sudo apt install -y mongodb
sudo service mongodb start
mongo
use bot
db.createCollection('request');
db.createUser({user: 'bot_user', pwd: 'password', roles: ['readWrite']});

sed -i -e "\$a alias bot='cd \/mnt\/d\/projects\/bot\/;'" ~/.bashrc
sed -i -e "\$a alias bot='cd \/var\/bot\/;'" ~/.bashrc
