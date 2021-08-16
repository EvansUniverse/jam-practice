#!/bin/bash

docker exec -t api-tester bash -c '/wait-for-it.sh --timeout=0 backend-server:8080 -- newman run /postman-collections/myern-app-tests.postman_collection.json -e /postman-collections/myern-app-pipeline.postman_environment.json; exit $?'