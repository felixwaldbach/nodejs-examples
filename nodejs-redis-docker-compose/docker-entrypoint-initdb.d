CQL="CREATE KEYSPACE IF NOT EXISTS edgewood WITH replication = {'class':'SimpleStrategy','replication_factor':'1'};"
echo "Executing: $CQL"

until cqlsh -e "$CQL"; do
    echo "Unavailable: sleeping"
    sleep 10
done &