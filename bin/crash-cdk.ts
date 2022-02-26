#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CrashCdkStack } from '../lib/crash-cdk-stack';
// import { PasswordManagerStack } from '../lib/password-manager-stack';

const app = new cdk.App();
new CrashCdkStack(app, 'CrashCdkStack');
// new PasswordManagerStack(app, 'PasswordManagerStack');
