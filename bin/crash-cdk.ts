#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CrashCdkStack } from '../lib/crash-cdk-stack';
import { PasswordManagetStack } from '../lib/password-manager-stack';

const app = new cdk.App();
new CrashCdkStack(app, 'CrashCdkStack');
new PasswordManagetStack(app, 'PasswordManagetStack');
