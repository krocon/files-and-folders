# Files-and-Folders (FnF)


## Start Node.js app on your local machine
- npm run build-api
- npm run build
- open browser http://localhost:3333/

## Docker

### Build the image on your machine
```
docker build . -t krocon/files-and-folders
```
### Get the latest image from docker hub
```
docker pull krocon/files-and-folders
```
### Start a container on windows
Drives C: and D: will be mounted: 
```
docker run -p 3333:3333 -p 3334:3334 -v c:/:/fnf/c -v d:/:/fnf/d --name fnf --env=FNF_DOCKER_ROOT='/fnf' --env=FNF_CONTAINER_PATHS='/fnf/root,/fnf/mnt'  -d krocon/files-and-folders
```

### Start a container on unraid
```
docker run -p 3333:3333 -p 3334:3334 -v /mnt:/fnf/mnt -v /:/fnf/root --name fnf --env=FNF_DOCKER_ROOT='/fnf' --env=FNF_CONTAINER_PATHS='/fnf/root,/fnf/mnt'  --env=FNF_INCOMPATIBLE_PATHS='/fnf/root,/fnf/mnt' -d krocon/files-and-folders
```

### Kill a container (linux, MacOS)
```
docker kill -it | grep  ' krocon/files-and-folders ' | awk '{ print $1 }'
```


## Enter the container
```
docker exec -it | grep  ' krocon/files-and-folders ' | awk '{ print $1 }' /bin/bash
```

### Container logs
```
$ docker exec -it <container id> /bin/bash
```


