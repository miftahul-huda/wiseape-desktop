if [ $1="local" ]
then
    echo "Starting local..."
    echo "cp .env-local .env"
    cp .env-local .env
else
    echo "Starting appdev..."
    echo "cp .env-appdev .env"
    cp .env-appdev .env
fi

node app.js