# Crash CDK

🏗 CDK App for [Amazon CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)! Lets you create your own VPN server in few simple steps. 

💸 Suits for [AWS Free Tier](https://aws.amazon.com/free/) instances

☀️ Fast, but verbose setup

👯‍ Mostly copy-pasting 

💥 Easy to destroy

## Pre-requirements

🚜 Latest node.js

```bash
nvm use 14
```

🧶 [Yarn](https://yarnpkg.com/)

```bash
npm install -g yarn
```

🧾 [AWS](https://aws.amazon.com/) Account

🚜 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

🔌 [EC2 Instance Connect CLI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-set-up.html#ec2-instance-connect-install-eic-CLI)

🤖 [IAM User](https://console.aws.amazon.com/iam/home#/users) with following policies:

1. [AmazonEC2FullAccess](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AmazonEC2FullAccess$serviceLevelSummary)

2. [AWSCloudFormationFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AWSCloudFormationFullAccess$serviceLevelSummary)

3. [EC2InstanceConnect](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/EC2InstanceConnect$serviceLevelSummary)

💭 *Important*: Create a separate user instead of using default sudo-level access.

💭 *Important 2*: Best practice is to attach permissions to a [group](https://console.aws.amazon.com/iam/home#/groups) and then add users to that group, rather than giving permissions to user directly. In this particular case there's not much difference, so you can do either.  

## Configure AWS CLI

```bash
aws configure
```

The tool will prompt for an IAM credentials. Fill in ones, created before.

## Deploy that bitch!

```bash
## Actually you need to clone this repo first, and install all deps
git clone https://github.com/hex22a/crash-cdk.git && cd ./crash-cdk && yarn install

yarn cdk deploy
```

Go to [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home#Home:) and copy *instance id* and then SSH to the instance 🔑

```bash
mssh ubuntu@INSTANCE_ID
```

```bash
# Set default user password
passwd openvpn
```

Instance configuration is complete 🎉

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

## Notes

```
Unrecognized option or missing or extra parameter(s) in configuration: (line 4): dhcp-pre-release (2.4.4)
``` 

If you're configuring WiFi router with `.ovpn` autologin profile like above, try adding following lines to the `.ovpn` file in your favorite text editor

```
## Add this right after comments block, just for better arrangemnt
pull-filter ignore "dhcp-pre-release"
pull-filter ignore "dhcp-renew"
pull-filter ignore "dhcp-release"
pull-filter ignore "register-dns"
pull-filter ignore "block-ipv6"
```

