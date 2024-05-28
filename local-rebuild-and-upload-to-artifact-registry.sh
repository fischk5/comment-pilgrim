# Rebuilds the Docker image and deploys to Artifact Registry  
# Runs locally for now until a runner is installed
docker image prune -fa
docker-compose build
docker tag pilgrim:latest us-central1-docker.pkg.dev/comment-pilgrim/pilgrim/pilgrim:latest
docker push us-central1-docker.pkg.dev/comment-pilgrim/pilgrim/pilgrim:latest