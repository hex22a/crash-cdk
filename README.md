# Crash CDK

🏗 CDK App for [Amazon CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

💸 Suits for [AWS Free Tier](https://aws.amazon.com/free/) instances __(testing)__

💥 Easy to destroy

## Pre-requirements

🚜 Latest node.js

```bash
nvm use 13
```

🧾 [AWS](https://aws.amazon.com/) Account

🔑 EC2 Key (SSH) named `crash.pem` (actually you can use any other name but this name is assumed as default)

🤖 IAM User with following policies:

1. [AmazonEC2FullAccess](https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/AmazonEC2FullAccess$serviceLevelSummary)

2. [AWSCloudFormationFullAccess](https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/AWSCloudFormationFullAccess$serviceLevelSummary)

## Configure AWS CLI

```bash
aws configure
```

The tool will prompt for an IAM credentials. Fill in ones, created before.

## Deploy that bitch!

```bash
## Actually you need to clone this repo first, and install all deps
git clone https://github.com/hex22a/crash-cdk.git && cd ./crash-cdk && npm i

npm run cdk deploy
```

Then SSH to the newly created machine using `crash.pem` key 🔑

```bash
ssh -i crash.pem ubuntu@INSTANCE_IP
```

Install [OpenVPN Access Server](https://openvpn.net/download-open-vpn/) for Ubuntu. OpenVPN AS Supports up to 2 VPN users for free.

```bash
## Login as root
sudo su
```

```bash
## Install OpenVPN AS
apt update && apt -y install ca-certificates wget net-tools
wget -qO - https://as-repository.openvpn.net/as-repo-public.gpg | apt-key add -
echo "deb http://as-repository.openvpn.net/as/debian bionic main">/etc/apt/sources.list.d/openvpn-as-repo.list
apt update && apt -y install openvpn-as
```

```bash
# Set default user password
passwd openvpn
```

## Set up VPN

### Server

Log in as  `openvpn` user at `https://INSTANCE_IP:943/admin`. Ignore SSL warning, or add SSL Cert as trusted to the keychain.

Update __Hostname or IP Address__ at __Network Settings__ (e.g. https://INSTANCE_IP:943/admin/network_settings) it should also match INSTANCE_IP

Create 👩‍💻 VPN users, click "More Settings" to set password, enable auto-login

__Don't forget to "Update Running Server"__

### Client

Login a 👩‍💻 VPN user https://INSTANCE_IT:943/?src=connect

Download client app if you haven't yet

Click `Yourself (autologin profile)` to download `client.ovpn` file. Use this file to establish your custom VPN connection.

## 🚨 Destroy

```bash
npm run cdk destroy
```

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run cdk deploy`      deploy this stack to your default AWS account/region
 * `npm run cdk diff`        compare deployed stack with current state
 * `npm run cdk synth`       emits the synthesized CloudFormation template
