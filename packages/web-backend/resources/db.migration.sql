alter table users
    add role VARCHAR;

alter table "mod-versions"
	add "fileHashes" json;