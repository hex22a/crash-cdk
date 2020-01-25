import core = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class CrashCdkStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const Ubuntu18 = 'ami-07d0cf3af28718ef8';
    const everyone = "0.0.0.0/0";
    const everyoneV6 = "::/0";

    const httpsTraffic = {
      cidrIp: everyone,
      fromPort: 443,
      ipProtocol: "TCP",
      toPort: 443
    };

    const customHttpsTraffic = {
      cidrIp: everyone,
      fromPort: 943,
      ipProtocol: "TCP",
      toPort: 943
    };

    const sshTraffic = {
      cidrIp: everyone,
      fromPort: 22,
      ipProtocol: "TCP",
      toPort: 22
    };

    const vpnTcpTraffic = {
      cidrIp: everyone,
      fromPort: 1199,
      ipProtocol: "TCP",
      toPort: 1199
    };

    const vpnUdpTraffic = {
      cidrIp: everyone,
      fromPort: 1194,
      ipProtocol: "udp",
      toPort: 1194
    };

    const securityGroup = new ec2.CfnSecurityGroup(this, 'vpn_sg', {
      groupName: 'vpn_sg',
      groupDescription: 'Allows TCP traffic for VPN connection',
      securityGroupIngress: [
        httpsTraffic,
        customHttpsTraffic,
        sshTraffic,
        vpnTcpTraffic,
        vpnUdpTraffic
      ]
    });

    new ec2.CfnInstance(this, 'UbuntuVPN', {
      imageId: Ubuntu18,
      instanceType: 't2.micro',
      monitoring: false,
      keyName: process.env.SSH_KEY_NAME || 'crash',
      securityGroupIds: [securityGroup.attrGroupId],
      tags: [
          {
            key: 'Name',
            value: 'VPN',
          },
      ]
    });
  }
}
