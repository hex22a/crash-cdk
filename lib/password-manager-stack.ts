import * as route53 from '@aws-cdk/aws-route53';

import core = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class PasswordManagerStack extends core.Stack {
    constructor(scope: core.Construct, id: string, props?: core.StackProps) {
        super(scope, id, props);
        const vpc_private_net = '10.0.0.0/16';
    
        const Ubuntu20 = 'ami-042e8287309f5df03';
        const everyone = "0.0.0.0/0";
        const everyoneV6 = "::/0";

        const vpc = new ec2.Vpc(this, 'TheVPC', {
          cidr: vpc_private_net,
        });
    
        const httpsTraffic = new ec2.Port({
          protocol: ec2.Protocol.TCP,
          stringRepresentation: 'https',
          fromPort: 443,
          toPort: 443,
        });
    
        const sshTraffic = new ec2.Port({
          protocol: ec2.Protocol.TCP,
          stringRepresentation: 'ssh',
          fromPort: 22,
          toPort: 22,
        });

        const security_group = new ec2.SecurityGroup(this, 'pwdmgr_sg', {
          vpc: vpc,
          securityGroupName: 'pwdmgr_sg',
          description: 'Allows TCP traffic for the password manager',
        });

        security_group.addIngressRule(ec2.Peer.anyIpv4(), httpsTraffic, 'Allow all https traffic', false);
        security_group.addIngressRule(ec2.Peer.anyIpv4(), sshTraffic, 'Allow all ssh traffic', false);
    
        const instance = new ec2.Instance(this, 'UbuntuBitWarden', {
          vpc: vpc,
          machineImage: new ec2.GenericLinuxImage({ 'us-east-1': Ubuntu20 }),
          instanceType: new ec2.InstanceType('t3.small'),
          securityGroup: security_group,
          instanceName: 'Password manager'
        });

        const elastic_ip = new ec2.CfnEIP(this, 'EIP', {
          domain: 'vpc',
          instanceId: instance.instanceId
        });

        const hosted_zone = new route53.PublicHostedZone(this, 'HostedZone', {
          zoneName: 'cr4f73d-3ny6ma.com'
        });

        new route53.ARecord(this, 'ARecord', {
          zone: hosted_zone,
          target: route53.RecordTarget.fromIpAddresses(elastic_ip.ref)
        });
      }
}