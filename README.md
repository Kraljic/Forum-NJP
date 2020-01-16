# Forum NJP
 Napredno JavaScript programiranje - PROJEKT

 - Izrada foruma na kojem registrirani korisnici mogu dijeliti svoje ideje te komunicirati sa ostalim korisnicima preko komentara. 
 - Takodjer postojepostoji vise grupa korisnika (user, moderator i admin).
    - Admin ima potpune ovlasti na forumom, 
    - Moderator moze upravljati kategorijama i brisati komentare i dretve drugih korisnika.
    - User moze stvarati nove dretve i pisati komentare.

## Za pokretanje je potrebno dodati `.env` datoteku.
Datoteka bi trebala sadrzavati sljedece elemente:

#### Application port / linux iptables for port 80/443
PORT=<HTTP_PORT>
SSL_PORT=<HTTPS_PORT>
#### Application static content (index.html, etc...)
PUBLIC_FOLDER = ./public/

#### MongoDB connection string
DB_CONNECT = <MONGODB_URL>

#### JWT Token secret
JWT_TOKEN_SECRET = <JWT_SECRET>

#### SSL
   SSL_CERT = ./ssl/fullchain.pem
   
   SSL_KEY = ./ssl/privkey.pem
 
 ## Pokretanje
 Server se moze pokrenuti u dva nacina rada:
   - `dev` - Development - Koristi nodemon, potrebno prilikom konfiguracije SSL certifikata
   - `deploy` - Deployment - Nakon sto se certifikati dohvate i konfiguriraju, ova naredba pokrece server sa https protokolom
