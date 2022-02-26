// import '@aws-cdk/assert/jest';
// import { Stack } from "@aws-cdk/core";

// import Motherbase from './vpc';

// describe('VPC', () => {
//     describe('Motherbase', () => {
//         test('constructor', () => {
//             // Arrange
//             const stack = new Stack();
//             const expectedId = 'Motherbase';
//             // Act
//             new Motherbase(stack);
//             // Assert
//             const CLOUDFORMATION_VPC = 'AWS::EC2::VPC';
//             const CLOUDFORMATION_SUBNET = 'AWS::EC2::Subnet';
//             expect(stack).toHaveResource(CLOUDFORMATION_VPC, {
//                 EnableDnsHostnames : true,
//                 EnableDnsSupport : true
//             })
//             expect(stack).toHaveResource(CLOUDFORMATION_SUBNET, {
//                 EnableDnsHostnames : true,
//                 EnableDnsSupport : true
//             })
//         })
//     })
// })
