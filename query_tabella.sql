# crea la tabella e le colonne che la compongono
CREATE TABLE pcto2022.utenti ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL
);

# modifica la tabella e aggiunge una colonna
ALTER TABLE pcto2022.utenti ADD email VARCHAR(128) NULL;

# modifica la tabella e elimina una colonna
ALTER TABLE pcto2022.utenti DROP COLUMN email; 

# inserisce un valore all'interno della tabella
INSERT INTO pcto2022.utenti (
	username, 
	password
) VALUES (
	"utente", 
    "5f4dcc3b5aa765d61d8327deb882cf99"
);

UPDATE pcto2022.utenti SET password="password" WHERE username="utente";

DELETE FROM pcto2022.utenti WHERE username="utente";

# seleziona tutto il contenuto (*) di una tabella
SELECT * FROM pcto2022.utenti;

# elimina la tabella
# DROP TABLE pcto2022.utenti;