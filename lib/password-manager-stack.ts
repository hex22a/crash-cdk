import core = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class PasswordManagetStack extends core.Stack {
    constructor(scope: core.Construct, id: string, props?: core.StackProps) {
        super(scope, id, props);
    
        const Ubuntu20 = 'ami-042e8287309f5df03';
        const everyone = "0.0.0.0/0";
        const everyoneV6 = "::/0";
    
        const httpsTraffic = {
          cidrIp: everyone,
          fromPort: 443,
          ipProtocol: "TCP",
          toPort: 443
        };
    
        const sshTraffic = {
          cidrIp: everyone,
          fromPort: 22,
          ipProtocol: "TCP",
          toPort: 22
        };
    
        const securityGroup = new ec2.CfnSecurityGroup(this, 'pwdmgr_sg', {
          groupName: 'pwdmgr_sg',
          groupDescription: 'Allows TCP traffic for the password manager',
          securityGroupIngress: [
            httpsTraffic,
            sshTraffic,
          ]
        });
    
        // const startupScript = readFileSync('./lib/startup.sh').toString();
    
        new ec2.CfnInstance(this, 'UbuntuBitWarden', {
          imageId: Ubuntu20,
          instanceType: 't3.small',
          monitoring: false,
        //   userData: Base64.encode(startupScript),
          securityGroupIds: [securityGroup.attrGroupId],
          tags: [
              {
                key: 'Name',
                value: 'Password Manager',
              },
          ]
        });
      }
}