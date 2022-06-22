-- usa il database creato in precedenza
USE pcto2022;

-- crea la tabella e le colonne che la compongono
CREATE TABLE utenti ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL
);

-- modifica la tabella e aggiunge una colonna
ALTER TABLE utenti ADD email VARCHAR(128) NULL;

-- modifica la tabella e elimina una colonna
ALTER TABLE utenti DROP COLUMN email; 

--  inserisce un valore all interno della tabella
INSERT INTO utenti (
	username, 
	password
) VALUES (
	"utente", 
    "5f4dcc3b5aa765d61d8327deb882cf99"
);

-- modifica
UPDATE utenti SET password="password" WHERE username="utente";

-- elimina
DELETE FROM utenti WHERE username="utente";

-- seleziona tutto il contenuto (*) di una tabella
SELECT * FROM utenti;

-- elimina la tabella
DROP TABLE utenti;