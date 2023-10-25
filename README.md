---
# Veszprém navigation app

The app showcases the capabilities of 
## 🛠️ Built with

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Mapbox JS](https://img.shields.io/badge/mapbox-3cc900?style=for-the-badge&logo=mapbox&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
## 🚀 Installation
To run the Mapbox locally using Docker:
```
docker build -t jozsefkiss90/veszprem-mapbox-app .
```
```
docker run -p 3000:3000 -e NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your access token
```
or pull form dockerhub
```
docker pull jozsefkiss90/veszprem-mapbox-app:latest
```
```
docker pull jozsefkiss90/veszprem-mapbox-app:latest
```
```
docker run -p 3000:3000 -e NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your access token jozsefkiss90/veszprem-mapbox-app:latest
```
To run the Mapbox locally using npm:
in the terminal run command: 
```
npm run build
```
then run
```
npm run start
```

---
