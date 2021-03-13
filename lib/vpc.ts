import * as core from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

class Motherbase extends ec2.Vpc {
    constructor(scope: core.Construct) {
        super(scope, 'Motherbase', {
            enableDnsSupport: true,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'ingress',
                    subnetType: ec2.SubnetType.PUBLIC,
                }
            ]
        });
    }
}
export default Motherbase;
