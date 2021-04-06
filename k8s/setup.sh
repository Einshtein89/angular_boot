#!/bin/bash

#brew install jq

#docker hub credentials and repo details
USERNAME=$1
PASSWORD=$2
ORGANIZATION=$1
BACKEND_IMAGE=books_backend_mongo
BACKEND_TAG=$3
FRONTEND_IMAGE=books_frontend_mongo
FRONTEND_TAG=$4

#deleting local tags
docker rmi $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG
docker rmi $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG

#getting access token and deleting tags from remote repo
login_data() {
cat <<EOF
{
  "username": "$USERNAME",
  "password": "$PASSWORD"
}
EOF
}

TOKEN=`curl -s -H "Content-Type: application/json" -X POST -d "$(login_data)" "https://hub.docker.com/v2/users/login/" | jq -r .token`

curl "https://hub.docker.com/v2/repositories/${ORGANIZATION}/${BACKEND_IMAGE}/tags/${BACKEND_TAG}/" \
-X DELETE \
-H "Authorization: JWT ${TOKEN}"

curl "https://hub.docker.com/v2/repositories/${ORGANIZATION}/${FRONTEND_IMAGE}/tags/${FRONTEND_TAG}/" \
-X DELETE \
-H "Authorization: JWT ${TOKEN}"

#compiling and building backend, pushing to remote
cd ../server || exit
mvn clean package && \
docker build -t $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG . && \
docker push $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG && \

#compiling and building frontend, pushing to remote
cd ../client || exit
if [[ -d dist ]]
then
    rm -r dist
fi
npm run build && \
docker build -t $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG . && \
docker push $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG && \

#preparing k8s cluster
cd ../k8s || exit
if [[ -f tls.cert ]]
then
    rm tls.cert
fi
if [[ -f tls.key ]]
then
    rm tls.key
fi
kubectl delete namespace books-store && \
kubectl create namespace books-store && \

#create secret in k8s with cert and key (CN should correspond to host URL)
openssl genrsa -out tls.key 2048 && \
openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=books.com && \
kubectl create secret -n books-store tls tls-secret --cert=tls.cert --key=tls.key && \
kubectl apply -f angular-boot-full-configuration.yaml

#clean up
#deleting local tags
docker rmi $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG
docker rmi $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG
#deleting certificates
if [[ -f tls.cert ]]
then
    rm tls.cert
fi
if [[ -f tls.key ]]
then
    rm tls.key
fi
