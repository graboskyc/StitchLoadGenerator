#!/bin/bash

uri="mongodb+srv://shared-demo-asd.gcp.mongodb.net/test"
atlasun=""
atlaspw=""
apiuser=""
apisecret=""
org=""
hostname=""
log="mongodb-audit-log.gz"

# cleanup last run 
rm ./*.json
rm ./*.gz
# get latest log 
curl --user "${apiuser}:${apisecret}" --digest \
 --header 'Accept: application/gzip' \
  --request GET "https://cloud.mongodb.com/api/atlas/v1.0/groups/${org}/clusters/${host}/logs/{$log}" \
  --output "logs.json.gz"

gunzip logs.json.gz

for fn in *.json
    do  
    while read line
        do  
        cl=`echo $line|sed "s/\"/'/g"`
        mongo $uri -u ${atlasun} -p ${atlaspw} --authenticationDatabase "admin" --eval "db = db.getSisterDB('metrics');db.auditlog.insertOne(${line});"
    done < ${fn}
done