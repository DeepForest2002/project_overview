// Aws Commands to install docker git and docker-compose step by step

sudo dnf install docker -y

sudo usermod -ag docker ec2-user

sudo systemctl enable docker
sudo systemctl start docker

then run - docker run hello-world to check if docker is successfully installed or not

sudo dnf install curl -y

# Install docker compose

sudo mkdir -p /usr/local/lib/docker/cli-plugins

sudo curl -SL install docker compose

sudo chmod +x /usr/...../docker-compose

# Installing buildx

ARCH=$(uname -m)

case "$ARCH" in
x86_64) BUILDX_ARCH="amd64" ;;
aarch64) BUILDX_ARCH="arm64" ;;
*)
echo "Unsupported architecture: $ARCH"
exit 1
;;
esac

VERSION=$(curl -fsSL https://api.github.com/repos/docker/buildx/releases/latest | jq -r '.tag_name')

sudo curl -fSL \
"https://github.com/docker/buildx/releases/download/${VERSION}/buildx-${VERSION}.linux-${BUILDX_ARCH}" \
-o /usr/local/lib/docker/cli-plugins/docker-buildx

sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-buildx

//Deploying the app
git pull "origin"

cd repo
nano .env and copy the env file

then docker compose up -d --build

copy i/p

// if i change anything in the code then
first push the code in github
then run git pull origin master on ec2 on root repo
