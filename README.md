# test-app1
## to run app simply run
```
docker build -t vuejs-test-app/test-app .
docker run -it -p 8080:8080 --rm --name dockerized-vuejs-app vuejs-test-app/test-app
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
