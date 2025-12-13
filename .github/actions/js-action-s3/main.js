const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

(function(){
    const bucketName = core.getInput('bucket-name', { required: true });
    const sourceDir = core.getInput('source-dir', { required: true });
    const region = core.getInput("bucket-region", { required: true });
    
    // Upload to S3 using AWS CLI
    exec.exec(`aws s3 sync ${sourceDir} s3://${bucketName} --region ${region}`);
})()