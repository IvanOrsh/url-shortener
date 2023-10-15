## For testing purposes: db

```bash
DB_HOST="postgres"
DB_PORT="5432"
DB_NAME="mydatabase"
DB_USER="myuser"
DB_PASSWORD="mypassword"

psql -h $DB_HOST -p $DB_PORT -d $DB_NAME -U $DB_USER -W
```
