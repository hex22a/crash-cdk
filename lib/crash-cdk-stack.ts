import { readFileSync } from 'fs';
import { Base64 } from 'js-base64';

import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { Construct } from 'constructs';

export class CrashCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const Ubuntu20 = 'ami-04505e74c0741db8d';

    const vpc = new ec2.Vpc(this, 'TheVPC', {
      maxAzs: 1,
      natGateways: 0,
      subnetConfiguration: [{
        cidrMask: 24,
        name: "asterisk",
        subnetType: ec2.SubnetType.PUBLIC
      }]
    })

    const securityGroup = new ec2.SecurityGroup(this, 'vpn_sg', {
      vpc: vpc,
      securityGroupName: 'vpn_sg',
      description: 'Allows TCP traffic for VPN connection'
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(943));
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(1199));
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.udp(1194));

    const startupScript = readFileSync('./lib/startup.sh').toString();

    const userData = ec2.UserData.forLinux();

    userData.addCommands(startupScript);

    const image = new ec2.GenericLinuxImage({
      'us-east-1': Ubuntu20,
    });

    const instance = new ec2.Instance(this, 'UbuntuVPN', {
      vpc: vpc,
      machineImage: image,
      instanceType: new ec2.InstanceType('t2.micro'),
      userData: userData,
      securityGroup: securityGroup,
      instanceName: 'VPN',
    });

    new cdk.CfnOutput(this, 'IP Address', { value: instance.instancePublicIp });
    // new cdk.CfnOutput(this, 'Key Name', { value: key.keyPairName })
    new cdk.CfnOutput(this, 'Download Key Command', { value: 'aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem' })
    new cdk.CfnOutput(this, 'ssh command', { value: 'ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@' + instance.instancePublicIp })
  }
}
