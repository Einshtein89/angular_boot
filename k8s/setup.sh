#!/bin/bash

#brew install kubectl
#brew install helm

#docker hub credentials and repo details
USERNAME=$1
PASSWORD=$2
ORGANIZATION=$1
BACKEND_IMAGE=books_backend_mongo
BACKEND_TAG=$3
FRONTEND_IMAGE=books_frontend_mongo
FRONTEND_TAG=$4
PROJECT_NAME=books-store

#deleting local tags
docker rmi $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG && \
docker rmi $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG && \

#deleting tags from remote repo
docker run --rm -it lumir/remove-dockerhub-tag --user $USERNAME \
 --password $PASSWORD ${ORGANIZATION}/${BACKEND_IMAGE}:${BACKEND_TAG}

docker run --rm -it lumir/remove-dockerhub-tag --user $USERNAME \
 --password $PASSWORD ${ORGANIZATION}/${FRONTEND_IMAGE}:${FRONTEND_TAG}

#compiling and building backend, pushing to remote
cd ../server || exit
docker build -t $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG . && \
docker push $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG && \

#compiling and building frontend, pushing to remote
cd ../client || exit
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

#create namespace if needed
if [[ ! $(kubectl get namespace | grep $PROJECT_NAME) ]]
then
    kubectl create namespace $PROJECT_NAME
fi

#create secret in k8s with cert and key (CN should correspond to host URL)
if [[ ! $(kubectl get secret -n $PROJECT_NAME | grep tls-secret) ]]
then
    openssl genrsa -out tls.key 2048 && \
    openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=books.com && \
    kubectl create secret -n books-store tls tls-secret --cert=tls.cert --key=tls.key
fi

helm upgrade --install --namespace $PROJECT_NAME $PROJECT_NAME $PROJECT_NAME && \
#kubectl delete pods --all --namespace=$PROJECT_NAME && \

#clean up
#deleting local tags
docker rmi $USERNAME/$BACKEND_IMAGE:$BACKEND_TAG && \
docker rmi $USERNAME/$FRONTEND_IMAGE:$FRONTEND_TAG && \

#deleting certificates
if [[ -f tls.cert ]]
then
    rm tls.cert
fi
if [[ -f tls.key ]]
then
    rm tls.key
fi
