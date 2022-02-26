#!/usr/bin/env bash
apt update \
    && apt install -y ec2-instance-connect ca-certificates wget net-tools gnupg;

wget -qO - https://as-repository.openvpn.net/as-repo-public.gpg | apt-key add -
echo "deb http://as-repository.openvpn.net/as/debian focal main" > /etc/apt/sources.list.d/openvpn-as-repo.list;

apt update && apt -y install openvpn-as;
