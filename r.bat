docker pull krocon/files-and-folders

docker run -p 3333:3333 -p 3334:3334 -v c:/:/fnf/c -v e:/:/fnf/e -v f:/:/fnf/f --env=FNF_START_PATH='/fnf/c' --env=FNF_DOCKER=true --env=FNF_CONTAINER_PATHS='/fnf/c,/fnf/e,/fnf/f'  -d krocon/files-and-folders

